import * as React from 'react';
import { useNavigate } from 'react-router';
import { X, MessageSquare, User, Mail, Phone, Lock, Eye, EyeOff, Loader2, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import { Button } from './ui/button';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'signup' | 'login';
}

export function AuthModal({ isOpen, onClose, defaultTab = 'signup' }: AuthModalProps) {
  const navigate = useNavigate();
  const { signup, login } = useAuth();
  const [tab, setTab] = React.useState<'signup' | 'login'>(defaultTab);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [confirmed, setConfirmed] = React.useState(false);

  const [signupData, setSignupData] = React.useState({ name: '', email: '', phone: '', password: '' });
  const [loginData, setLoginData] = React.useState({ email: '', password: '' });

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { needsConfirmation } = await signup(
        signupData.name, signupData.email, signupData.phone, signupData.password
      );
      if (needsConfirmation) {
        setConfirmed(true);
      } else {
        toast.success('Welcome to StatusPro AI! 🎉');
        onClose();
        navigate('/dashboard');
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(loginData.email, loginData.password);
      toast.success('Welcome back! 👋');
      onClose();
      navigate('/dashboard');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes modalSlideIn {
          from { opacity: 0; transform: translateY(16px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={handleBackdropClick}
      >
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden" style={{ animation: 'modalSlideIn 0.25s ease-out' }}>
          {/* Header */}
          <div className="relative bg-gradient-to-br from-green-600 to-green-700 px-8 pt-8 pb-6 text-white">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold">StatusPro AI</span>
            </div>
            <h2 className="text-2xl font-bold">
              {confirmed
                ? 'Check your email'
                : tab === 'signup'
                ? 'Create free account'
                : 'Welcome back'}
            </h2>
            <p className="text-green-100 mt-1 text-sm">
              {confirmed
                ? 'A confirmation link was sent to your inbox.'
                : tab === 'signup'
                ? 'Start generating WhatsApp statuses for free'
                : 'Sign in to continue generating statuses'}
            </p>

            {/* Tab switcher */}
            {!confirmed && (
              <div className="flex mt-5 bg-white/20 rounded-lg p-1">
                <button
                  className={`flex-1 py-1.5 rounded-md text-sm font-medium transition-all ${
                    tab === 'signup' ? 'bg-white text-green-700 shadow-sm' : 'text-white hover:bg-white/10'
                  }`}
                  onClick={() => { setTab('signup'); setShowPassword(false); }}
                >
                  Sign Up
                </button>
                <button
                  className={`flex-1 py-1.5 rounded-md text-sm font-medium transition-all ${
                    tab === 'login' ? 'bg-white text-green-700 shadow-sm' : 'text-white hover:bg-white/10'
                  }`}
                  onClick={() => { setTab('login'); setShowPassword(false); }}
                >
                  Log In
                </button>
              </div>
            )}
          </div>

          {/* Body */}
          <div className="px-8 py-6">
            {/* Email confirmation screen */}
            {confirmed ? (
              <div className="text-center py-4">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <p className="text-gray-600 mb-6">
                  We sent a confirmation link to <strong>{signupData.email}</strong>.<br />
                  Click the link to activate your account, then log in.
                </p>
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => { setConfirmed(false); setTab('login'); }}
                >
                  Go to Login
                </Button>
              </div>
            ) : tab === 'signup' ? (
              <form onSubmit={handleSignup} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={signupData.name}
                      onChange={e => setSignupData({ ...signupData, name: e.target.value })}
                      placeholder="Your full name"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      required
                      value={signupData.email}
                      onChange={e => setSignupData({ ...signupData, email: e.target.value })}
                      placeholder="example@email.com"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      required
                      value={signupData.phone}
                      onChange={e => setSignupData({ ...signupData, phone: e.target.value })}
                      placeholder="+234 800 000 0000"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      minLength={6}
                      value={signupData.password}
                      onChange={e => setSignupData({ ...signupData, password: e.target.value })}
                      placeholder="Min. 6 characters"
                      className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPassword
                        ? <EyeOff className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                        : <Eye className="w-4 h-4 text-gray-400 hover:text-gray-600" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-green-600 hover:bg-green-700 py-2.5 font-semibold"
                >
                  {isLoading ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Creating Account...</>
                  ) : (
                    'Create Free Account'
                  )}
                </Button>

                <p className="text-center text-xs text-gray-500">
                  By signing up, you agree to our Terms of Service & Privacy Policy
                </p>
              </form>
            ) : (
              <form onSubmit={handleLogin} className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      required
                      value={loginData.email}
                      onChange={e => setLoginData({ ...loginData, email: e.target.value })}
                      placeholder="example@email.com"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={loginData.password}
                      onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                      placeholder="Your password"
                      className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPassword
                        ? <EyeOff className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                        : <Eye className="w-4 h-4 text-gray-400 hover:text-gray-600" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-green-600 hover:bg-green-700 py-2.5 font-semibold"
                >
                  {isLoading ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Signing In...</>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>
            )}
          </div>

          {/* Benefits strip (signup only) */}
          {tab === 'signup' && !confirmed && (
            <div className="px-8 pb-6">
              <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
                {['100% Free', 'English & Pidgin', 'Unlimited'].map((item) => (
                  <div key={item} className="flex items-center gap-1.5 text-xs text-gray-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}