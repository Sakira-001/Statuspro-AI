import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/health", (c) => {
  return c.json({ status: "ok" });
});

// Signup endpoint
app.post("/signup", async (c) => {
  try {
    const { name, email, phone, password } = await c.req.json();
    
    if (!name || !email || !phone || !password) {
      return c.json({ error: "All fields are required" }, 400);
    }

    const adminClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    // Create user via admin API so we can auto-confirm the email
    const { data, error } = await adminClient.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, phone },
      email_confirm: true,
    });

    if (error) {
      console.error('Signup error during user creation:', error);
      return c.json({ error: error.message }, 400);
    }

    // Store additional user data in KV store
    await kv.set(`user:${data.user.id}`, {
      id: data.user.id,
      name,
      email,
      phone,
      createdAt: new Date().toISOString()
    });

    // Sign the user in immediately using the anon client so we can
    // return a live session — no separate login call needed on the frontend.
    const anonClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    const { data: signInData, error: signInError } = await anonClient.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError || !signInData.session) {
      // User was created but we couldn't sign in yet — return success without a session
      // so the frontend can show a "login now" prompt instead of crashing.
      console.warn('Post-signup sign-in failed:', signInError?.message);
      return c.json({
        message: "User created successfully",
        session: null,
        user: { id: data.user.id, email: data.user.email, name, phone },
      }, 201);
    }

    return c.json({
      message: "User created successfully",
      session: {
        access_token: signInData.session.access_token,
        refresh_token: signInData.session.refresh_token,
        expires_at: signInData.session.expires_at,
      },
      user: { id: data.user.id, email: data.user.email, name, phone },
    }, 201);
  } catch (error) {
    console.error('Unexpected signup error:', error);
    return c.json({ error: "Failed to create user" }, 500);
  }
});

// Login endpoint (session retrieval)
app.post("/login", async (c) => {
  try {
    const { email, password } = await c.req.json();
    
    if (!email || !password) {
      return c.json({ error: "Email and password are required" }, 400);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Login error during authentication:', error);
      return c.json({ error: error.message }, 401);
    }

    // Get user metadata from KV store
    const userData = await kv.get(`user:${data.user.id}`);

    return c.json({
      access_token: data.session.access_token,
      user: {
        id: data.user.id,
        email: data.user.email,
        name: userData?.name || '',
        phone: userData?.phone || ''
      }
    });
  } catch (error) {
    console.error('Unexpected login error:', error);
    return c.json({ error: "Failed to login" }, 500);
  }
});

// Get current user endpoint
app.get("/user", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      console.error('Get user error:', error);
      return c.json({ error: "Unauthorized" }, 401);
    }

    // Get user metadata from KV store
    const userData = await kv.get(`user:${user.id}`);

    return c.json({
      id: user.id,
      email: user.email,
      name: userData?.name || '',
      phone: userData?.phone || ''
    });
  } catch (error) {
    console.error('Unexpected get user error:', error);
    return c.json({ error: "Failed to get user" }, 500);
  }
});

Deno.serve(app.fetch);