import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Menu, X, ArrowRight, Star, Users, Zap, Shield, CheckCircle, Play, MousePointer2, Sparkles, Globe, Rocket, Brain, Eye } from 'lucide-react';

const AdvancedBusinessWebsite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [particles, setParticles] = useState([]);
  const canvasRef = useRef(null);
  const heroRef = useRef(null);

  // Initialize particles
  useEffect(() => {
    const particleCount = 50;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.2,
    }));
    setParticles(newParticles);
    setIsLoaded(true);
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll tracking with smooth updates
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window === 'undefined') return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          // Update position
          particle.x += particle.vx;
          particle.y += particle.vy;

          // Bounce off edges
          if (particle.x <= 0 || particle.x >= canvas.width) particle.vx *= -1;
          if (particle.y <= 0 || particle.y >= canvas.height) particle.vy *= -1;

          // Mouse interaction
          const dx = mousePosition.x - particle.x;
          const dy = mousePosition.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            particle.x -= dx * 0.01;
            particle.y -= dy * 0.01;
          }

          // Draw particle
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`;
          ctx.fill();

          // Connect nearby particles
          prevParticles.forEach(otherParticle => {
            if (otherParticle.id !== particle.id) {
              const dx2 = particle.x - otherParticle.x;
              const dy2 = particle.y - otherParticle.y;
              const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
              
              if (distance2 < 100) {
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(otherParticle.x, otherParticle.y);
                ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance2 / 100)})`;
                ctx.stroke();
              }
            }
          });

          return particle;
        })
      );

      requestAnimationFrame(animateParticles);
    };

    animateParticles();
  }, [mousePosition]);

  // Parallax calculation
  const parallaxOffset = scrollY * 0.5;
  const parallaxOffset2 = scrollY * 0.3;

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Analytics",
      description: "Advanced machine learning algorithms that predict trends and optimize performance in real-time.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Quantum Performance",
      description: "Lightning-fast processing with quantum-inspired algorithms that scale infinitely.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Predictive Vision",
      description: "See the future of your business with advanced forecasting and trend analysis.",
      gradient: "from-green-500 to-teal-500"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Integration",
      description: "Connect with any system, anywhere in the world, with our universal API platform.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Quantum Encryption",
      description: "Military-grade security with quantum-resistant encryption protocols.",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Magic Automation",
      description: "Automate complex workflows with AI that learns and adapts to your business.",
      gradient: "from-pink-500 to-rose-500"
    }
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief Innovation Officer at QuantumTech",
      content: "This platform didn't just transform our business—it revolutionized our entire industry. The AI insights are otherworldly.",
      rating: 5,
      avatar: "🧬"
    },
    {
      name: "Marcus Rodriguez",
      role: "CEO of FutureScale Dynamics",
      content: "I've never seen anything like this. It's like having a crystal ball for business intelligence. Absolutely mind-blowing.",
      rating: 5,
      avatar: "🚀"
    },
    {
      name: "Dr. Emma Nakamura",
      role: "Head of Digital Transformation",
      content: "The quantum performance capabilities are beyond anything we imagined possible. This is the future, today.",
      rating: 5,
      avatar: "⚡"
    }
  ];

  const stats = [
    { number: "∞", label: "Scalability", suffix: "" },
    { number: "99.999%", label: "Uptime", suffix: "" },
    { number: "1000+", label: "Integrations", suffix: "" },
    { number: "<1ms", label: "Response Time", suffix: "" }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: isLoaded ? 1 : 0 }}
      />

      {/* Floating Cursor Effect */}
      <div
        className="fixed w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-100"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${mousePosition.x > 0 ? 1 : 0})`,
        }}
      />

      {/* Advanced Navigation */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-500 ${
        scrollY > 50 
          ? 'bg-black/20 backdrop-blur-2xl border-b border-white/10 shadow-2xl' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              Ωalgorithmic
            </div>
            <div className="hidden md:flex space-x-1">
              <a href="/" className="relative px-6 py-3 rounded-xl font-medium transition-all duration-300 group text-gray-300 hover:text-white">Home</a>
              <a href="/features" className="relative px-6 py-3 rounded-xl font-medium transition-all duration-300 group text-gray-300 hover:text-white">Features</a>
              <a href="/about" className="relative px-6 py-3 rounded-xl font-medium transition-all duration-300 group text-white">About</a>
              <a href="/contact" className="relative px-6 py-3 rounded-xl font-medium transition-all duration-300 group text-gray-300 hover:text-white">Contact</a>
            </div>
            {/* Mobile navbar toggle */}
            <button className="md:hidden flex items-center px-3 py-2 border-2 border-white rounded text-white bg-transparent" onClick={() => setIsMenuOpen(v => !v)} aria-label="Toggle navigation">
              <svg className="h-6 w-6" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" stroke="white" strokeWidth="2" /></svg>
            </button>
          </div>
          {/* Mobile nav menu */}
          {isMenuOpen && (
            <div className="md:hidden flex flex-col space-y-2 mt-2 bg-black/90 rounded-xl p-4 border border-white/10">
              <a href="/" className="px-4 py-2 rounded-xl font-medium text-gray-300 hover:text-white">Home</a>
              <a href="/features" className="px-4 py-2 rounded-xl font-medium text-gray-300 hover:text-white">Features</a>
              <a href="/about" className="px-4 py-2 rounded-xl font-medium text-white">About</a>
              <a href="/contact" className="px-4 py-2 rounded-xl font-medium text-gray-300 hover:text-white">Contact</a>
            </div>
          )}
        </div>
      </nav>

      {/* Revolutionary Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Dynamic Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-black" />
          
          {/* Animated Orbs */}
          <div 
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full filter blur-3xl opacity-70 animate-pulse"
            style={{
              background: 'linear-gradient(45deg, #3B82F6, #8B5CF6)',
              transform: `translate(${parallaxOffset}px, ${parallaxOffset * 0.3}px) scale(${1 + scrollY * 0.001})`
            }}
          />
          <div 
            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full filter blur-3xl opacity-70 animate-pulse"
            style={{
              background: 'linear-gradient(45deg, #EC4899, #F59E0B)',
              transform: `translate(${-parallaxOffset * 0.7}px, ${-parallaxOffset * 0.5}px) scale(${1 + scrollY * 0.001})`,
              animationDelay: '2s'
            }}
          />

          {/* Floating Geometric Shapes */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-spin"
              style={{
                left: `${20 + i * 15}%`,
                top: `${20 + i * 10}%`,
                animationDuration: `${10 + i * 2}s`,
                animationDelay: `${i * 0.5}s`,
                transform: `translate(${parallaxOffset * (0.1 * i)}px, ${parallaxOffset * (0.05 * i)}px)`
              }}
            >
              <div className={`w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 ${
                i % 2 === 0 ? 'rotate-45' : 'rounded-full'
              } opacity-20`} />
            </div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className={`transform transition-all duration-1000 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}>
            {/* Animated Badge */}
            <div className="inline-flex items-center px-4 py-2 mb-8 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium animate-bounce">
              <Sparkles className="w-4 h-4 mr-2" />
              Revolutionary Technology • Just Launched
            </div>

            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
              <span className="block animate-slide-in-left">Transcend</span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-slide-in-right">
                Reality
              </span>
              <span className="block text-4xl md:text-6xl font-light text-gray-300 animate-fade-in-up">
                with Quantum Business
              </span>
            </h1>
            
            <p className="text-xl md:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-up opacity-0"
               style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
              Experience the next evolution of business intelligence. 
              Where artificial intelligence meets quantum computing to create
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold"> impossible possibilities</span>.
            </p>

            {/* Advanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-fade-in-up opacity-0"
                 style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
              <button className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold text-xl overflow-hidden transform hover:scale-105 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <div className="relative flex items-center">
                  Enter the Future
                  <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
              </button>
              
              <button className="group relative px-10 py-5 border-2 border-gray-600 rounded-2xl font-bold text-xl hover:border-white transition-all duration-300 backdrop-blur-sm overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <div className="relative flex items-center">
                  <Play className="mr-3 w-6 h-6" />
                  Experience Demo
                </div>
              </button>
            </div>

            {/* Animated Stats with Hover Effects */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto animate-fade-in-up opacity-0"
                 style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="group text-center p-6 rounded-2xl backdrop-blur-sm border border-white/10 hover:border-white/30 hover:bg-gradient-to-br hover:from-blue-600/10 hover:to-purple-600/10 transform hover:scale-110 hover:-translate-y-2 transition-all duration-500 cursor-pointer"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="text-4xl md:text-6xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-3 group-hover:animate-pulse">
                    {stat.number}{stat.suffix}
                  </div>
                  <div className="text-gray-400 text-lg group-hover:text-white transition-colors">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Features Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20 animate-fade-in-up">
            <h2 className="text-5xl md:text-7xl font-black mb-8">
              Superhuman
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Capabilities
              </span>
            </h2>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Unlock powers that transcend conventional business limitations. 
              These aren't just features—they're evolutionary leaps.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative p-8 bg-gradient-to-br from-gray-900/50 to-black/50 rounded-3xl border border-gray-800/50 hover:border-white/20 transition-all duration-700 transform hover:scale-105 hover:-translate-y-4 backdrop-blur-sm overflow-hidden"
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  animation: `fadeInUp 0.8s ease-out ${index * 0.1}s both`
                }}
              >
                {/* Animated Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-700`} />
                
                {/* Floating Icon */}
                <div className="relative mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <div className={`inline-flex p-4 bg-gradient-to-br ${feature.gradient} rounded-2xl shadow-2xl`}>
                    {feature.icon}
                  </div>
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500`} />
                </div>

                <h3 className="text-2xl font-bold mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-500">
                  {feature.title}
                </h3>
                
                <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-500">
                  {feature.description}
                </p>

                {/* Hover Effect Particles */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" />
                <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" style={{ animationDelay: '0.5s' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Revolutionary Testimonials */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-purple-900/5 to-black" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="text-center mb-20 animate-fade-in-up">
            <h2 className="text-5xl md:text-7xl font-black mb-8">
              Voices from
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Tomorrow
              </span>
            </h2>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
              Leaders who've transcended the impossible
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group relative p-8 bg-gradient-to-br from-gray-900/80 to-black/80 rounded-3xl border border-gray-800/50 hover:border-white/20 transition-all duration-700 transform hover:scale-105 hover:-translate-y-6 backdrop-blur-xl overflow-hidden"
                style={{ 
                  transitionDelay: `${index * 200}ms`,
                  animation: `fadeInUp 0.8s ease-out ${index * 0.2}s both`
                }}
              >
                {/* Animated Border */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ padding: '2px' }}>
                  <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black rounded-3xl" />
                </div>

                <div className="relative z-10">
                  {/* Avatar and Rating */}
                  <div className="flex items-center mb-6">
                    <div className="text-4xl mr-4 transform group-hover:scale-110 transition-transform duration-500">
                      {testimonial.avatar}
                    </div>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="w-6 h-6 text-yellow-400 fill-current transform group-hover:scale-110 transition-transform duration-300" 
                          style={{ transitionDelay: `${i * 100}ms` }}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-200 mb-8 text-lg italic leading-relaxed group-hover:text-white transition-colors duration-500">
                    "{testimonial.content}"
                  </p>
                  
                  <div>
                    <div className="font-bold text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-500">
                      {testimonial.name}
                    </div>
                    <div className="text-gray-400 group-hover:text-gray-300 transition-colors duration-500">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ultimate CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20" />
          <div className="absolute top-0 left-0 w-full h-full opacity-50" style={{
            backgroundImage: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "30px 30px"
          }} />
        </div>

        <div className="relative max-w-5xl mx-auto text-center px-6 lg:px-8">
          <div className="animate-fade-in-up">
            <h2 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
              Ready to
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Evolve?
              </span>
            </h2>
            
            <p className="text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join the quantum revolution. Transform impossibility into inevitability.
              <span className="block mt-2 text-blue-400">The future doesn't wait.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <button className="group relative px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold text-2xl overflow-hidden transform hover:scale-105 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                <div className="relative flex items-center justify-center">
                  Begin Evolution
                  <Rocket className="ml-3 w-7 h-7 group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform duration-300" />
                </div>
                <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              </button>
              
              <button className="group relative px-12 py-6 border-2 border-gray-600 rounded-2xl font-bold text-2xl hover:border-white transition-all duration-500 backdrop-blur-sm overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                <div className="relative flex items-center justify-center">
                  <MousePointer2 className="mr-3 w-7 h-7 group-hover:rotate-12 transition-transform duration-300" />
                  Interactive Tour
                </div>
              </button>
            </div>

            <div className="flex items-center justify-center text-gray-400 space-x-8">
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 mr-3 text-green-400 animate-pulse" />
                Quantum-secured • Zero commitment
              </div>
              <div className="hidden sm:flex items-center">
                <Sparkles className="w-6 h-6 mr-3 text-purple-400 animate-spin" />
                AI-powered onboarding
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ultra-Modern Footer */}
      <footer className="relative border-t border-gray-800/50 py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="grid md:grid-cols-5 gap-12 mb-16">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 animate-pulse">
                ΩNexus
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-md">
                Transcending the boundaries of possibility through quantum business intelligence and AI-powered innovation.
              </p>
              
              {/* Social Links with Hover Effects */}
              <div className="flex space-x-4">
                {['Twitter', 'LinkedIn', 'GitHub', 'Discord'].map((social, index) => (
                  <button 
                    key={social}
                    className="group w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 hover:border-white/30 transition-all duration-300 hover:scale-110 hover:-translate-y-1 flex items-center justify-center"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300" />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Navigation Columns */}
            {[
              {
                title: 'Quantum Solutions',
                links: ['AI Analytics', 'Quantum Computing', 'Neural Networks', 'Predictive Intelligence', 'Autonomous Systems']
              },
              {
                title: 'Enterprise',
                links: ['Enterprise AI', 'Global Integration', 'Security Protocols', 'Scalability Matrix', 'Custom Solutions']
              },
              {
                title: 'Resources',
                links: ['Quantum Docs', 'API Universe', 'Developer Portal', 'Community Hub', 'Learning Center']
              }
            ].map((column, columnIndex) => (
              <div key={column.title}>
                <h4 className="font-bold mb-6 text-lg bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {column.title}
                </h4>
                <div className="space-y-3">
                  {column.links.map((link, linkIndex) => (
                    <button
                      key={link}
                      className="block text-gray-400 transition-all duration-300 hover:translate-x-2 hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 hover:bg-clip-text hover:text-transparent"
                      style={{ transitionDelay: `${linkIndex * 50}ms` }}
                    >
                      {link}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Enhanced Footer Bottom */}
          <div className="border-t border-gray-800/50 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-center md:text-left">
                <p>&copy; 2025 ΩNexus Corporation. Transcending Reality.</p>
                <p className="text-sm mt-1">Quantum-powered • AI-driven • Future-ready</p>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <button className="transition-colors duration-300 hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 hover:bg-clip-text hover:text-transparent">
                  Privacy Matrix
                </button>
                <button className="transition-colors duration-300 hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 hover:bg-clip-text hover:text-transparent">
                  Quantum Terms
                </button>
                <button className="transition-colors duration-300 hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 hover:bg-clip-text hover:text-transparent">
                  Neural Cookies
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Advanced CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(147, 51, 234, 0.5);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out;
        }
        
        .animate-slide-in-left {
          animation: slideInLeft 1s ease-out;
        }
        
        .animate-slide-in-right {
          animation: slideInRight 1s ease-out 0.3s both;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #3B82F6, #8B5CF6);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #8B5CF6, #EC4899);
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Glass morphism effect */
        .glass {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        /* Enhanced gradient text animation */
        .gradient-text-animated {
          background: linear-gradient(-45deg, #3B82F6, #8B5CF6, #EC4899, #F59E0B);
          background-size: 400% 400%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientShift 4s ease infinite;
        }
        
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        /* Particle trail effect */
        .particle-trail {
          position: absolute;
          width: 4px;
          height: 4px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.8), transparent);
          border-radius: 50%;
          pointer-events: none;
          animation: particleFloat 3s linear infinite;
        }
        
        @keyframes particleFloat {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) scale(0);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default AdvancedBusinessWebsite;