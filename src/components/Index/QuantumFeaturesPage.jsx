import { Brain, Heart, Globe, Zap } from 'lucide-react';
  const values = [
    {
      icon: <Brain className="w-12 h-12" />,
      title: "Infinite Innovation",
      description: "We push beyond the boundaries of what's possible, constantly evolving and reimagining the future of business intelligence.",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: "Human-Centric Design",
      description: "Technology serves humanity. Every quantum leap we make is designed to enhance human potential and create meaningful impact.",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      icon: <Globe className="w-12 h-12" />,
      title: "Global Consciousness",
      description: "Our solutions transcend borders, cultures, and limitations. We think globally while acting with precision and purpose.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: "Quantum Excellence",
      description: "Excellence isn't a destination—it's our quantum state. We exist in a superposition of continuous improvement and breakthrough innovation.",
      gradient: "from-yellow-500 to-orange-500"
    }
  ];
import React, { useState, useEffect } from 'react';

const QuantumFeaturesPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [showNav, setShowNav] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-500 ${scrollY > 50 ? 'bg-black/20 backdrop-blur-2xl border-b border-white/10 shadow-2xl' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              Ωalgorithmic
            </div>
            <div className="hidden md:flex space-x-1">
              <a href="/" className="relative px-6 py-3 rounded-xl font-medium transition-all duration-300 group text-gray-300 hover:text-white">Home</a>
              <a href="/features" className="relative px-6 py-3 rounded-xl font-medium transition-all duration-300 group text-white">Features</a>
              <a href="/about" className="relative px-6 py-3 rounded-xl font-medium transition-all duration-300 group text-gray-300 hover:text-white">About</a>
              <a href="/contact" className="relative px-6 py-3 rounded-xl font-medium transition-all duration-300 group text-gray-300 hover:text-white">Contact</a>
            </div>
            {/* Mobile navbar toggle */}
            <button className="md:hidden flex items-center px-3 py-2 border-2 border-white rounded text-white bg-transparent" onClick={() => setShowNav(v => !v)} aria-label="Toggle navigation">
              <svg className="h-6 w-6" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" stroke="white" strokeWidth="2" /></svg>
            </button>
          </div>
          {/* Mobile nav menu */}
          {showNav && (
            <div className="md:hidden flex flex-col space-y-2 mt-2 bg-black/90 rounded-xl p-4 border border-white/10">
              <a href="/" className="px-4 py-2 rounded-xl font-medium text-gray-300 hover:text-white">Home</a>
              <a href="/features" className="px-4 py-2 rounded-xl font-medium text-white">Features</a>
              <a href="/about" className="px-4 py-2 rounded-xl font-medium text-gray-300 hover:text-white">About</a>
              <a href="/contact" className="px-4 py-2 rounded-xl font-medium text-gray-300 hover:text-white">Contact</a>
            </div>
          )}
        </div>
      </nav>
      {/* Animated Background Canvas */}
      <canvas
        className="fixed inset-0 pointer-events-none z-0 opacity-40"
      />
      {/* Dynamic Background Gradient */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-black" />
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full filter blur-3xl opacity-30 animate-pulse"
          style={{
            background: 'linear-gradient(45deg, #3B82F6, #8B5CF6)',
            transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.05}px)`
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full filter blur-3xl opacity-30 animate-pulse"
          style={{
            background: 'linear-gradient(45deg, #EC4899, #F59E0B)',
            transform: `translate(${-scrollY * 0.08}px, ${-scrollY * 0.06}px)`,
            animationDelay: '2s'
          }}
        />
      </div>
      {/* Features Content */}
      <main className="pt-32 pb-32 px-6 max-w-5xl mx-auto text-center">
        <h1 className="text-6xl font-black mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Features</h1>
        <p className="text-2xl text-gray-300 mb-12">Explore the quantum-powered features that set us apart.</p>

        {/* Our Quantum Values Section */}
        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-6xl md:text-7xl font-black mb-8">
                Our Quantum
                <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Values
                </span>
              </h2>
              <p className="text-2xl text-gray-300 max-w-4xl mx-auto">
                These principles guide every decision, fuel every innovation, and define our quantum existence.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="group relative p-10 bg-gradient-to-br from-gray-900/60 to-black/60 rounded-3xl border border-gray-800/50 hover:border-white/20 backdrop-blur-xl transition-all duration-700 transform hover:scale-105 hover:-translate-y-4 overflow-hidden"
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Animated Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-700`} />
                  <div className="relative z-10">
                    <div className={`inline-flex p-4 bg-gradient-to-br ${value.gradient} rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                      {value.icon}
                    </div>
                    <h3 className="text-3xl font-bold mb-6 group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
                      {value.title}
                    </h3>
                    <p className="text-xl text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-500">
                      {value.description}
                    </p>
                  </div>
                  {/* Hover particles */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" />
                  <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" style={{ animationDelay: '0.5s' }} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="w-full bg-black/80 border-t border-white/10 py-8 text-center text-gray-400 mt-auto">
        <div className="max-w-7xl mx-auto px-6">
          <span className="font-bold text-white">Ωalgorithmic</span> &copy; {new Date().getFullYear()} &mdash; All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default QuantumFeaturesPage;
