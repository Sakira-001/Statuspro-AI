import { useState } from 'react';
import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Sparkles, MessageSquare, TrendingUp, Zap, Check } from 'lucide-react';
import { AuthModal } from '../components/AuthModal';
import { useAuth } from '../context/AuthContext';
import HeroImage from '../../assets/Screenshot 2026-03-05 165904.png';

export default function Home() {
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<'signup' | 'login'>('signup');

  const openSignup = () => { setModalTab('signup'); setModalOpen(true); };
  const openLogin = () => { setModalTab('login'); setModalOpen(true); };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-8 h-8 text-green-600" />
              <span className="text-xl font-bold text-gray-900">StatusPro AI</span>
            </div>
            <div className="flex gap-4">
              {user ? (
                <Link to="/dashboard">
                  <Button className="bg-green-600 hover:bg-green-700">Go to Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Button variant="outline" onClick={openLogin}>Login</Button>
                  <Button className="bg-green-600 hover:bg-green-700" onClick={openSignup}>Get Started</Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">AI-Powered WhatsApp Status Generator</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
              Turn Your WhatsApp<br />Into a <span className="text-green-600">24/7 Sales Machine</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              Stop posting boring "Available" messages. Generate high-converting WhatsApp statuses 
              that sell while you sleep. Built for Nigerian sellers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-6" onClick={openSignup}>
                Start Generating Now
                <Zap className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6" onClick={openLogin}>
                Sign In
              </Button>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" />
                <span>Completely free to use</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" />
                <span>English + Pidgin support</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" />
                <span>Unlimited generations</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-green-200 rounded-full blur-3xl opacity-20"></div>
              <img
                src={HeroImage}
                alt="WhatsApp seller using StatusPro AI"
                className="relative rounded-2xl shadow-2xl w-full max-w-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Built for Nigerian WhatsApp Sellers</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">10+ Status Types</h3>
            <p className="text-gray-600">
              Attraction posts, testimonials, scarcity messages, objection crushers, and more.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <MessageSquare className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Nigerian Tone</h3>
            <p className="text-gray-600">
              Switch between English and Pidgin. Sound natural, not like a robot.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Proven Psychology</h3>
            <p className="text-gray-600">
              Every status uses storytelling and persuasion triggers that actually convert.
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-green-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Join 1,000+ Nigerian Sellers</h2>
          <p className="text-xl opacity-90 mb-8">
            Generate statuses that sound like you, sell like magic. Completely free!
          </p>
          <Button
            size="lg"
            variant="outline"
            className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-6"
            onClick={openSignup}
          >
            Start Generating Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-green-600" />
              <span className="font-bold text-gray-900">StatusPro AI</span>
            </div>
            <p className="text-sm text-gray-600">© 2026 StatusPro AI. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal isOpen={modalOpen} onClose={() => setModalOpen(false)} defaultTab={modalTab} />
    </div>
  );
}