import React, { useState, useEffect, useRef } from 'react';
import { 
  Brain, 
  Zap, 
  Globe, 
  Users, 
  Award, 
  Target, 
  Rocket, 
  Eye, 
  Heart, 
  Sparkles,
  ArrowRight,
  PlayCircle,
  TrendingUp,
  Shield,
  Atom,
  Cpu,
  Network
} from 'lucide-react';

const QuantumAboutPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState('mission');
  const [isVisible, setIsVisible] = useState({});
  const [particles, setParticles] = useState([]);
  const canvasRef = useRef(null);

  // Initialize floating particles
  useEffect(() => {
    const particleCount = 30;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.3 + 0.1,
      color: ['59, 130, 246', '147, 51, 234', '236, 72, 153'][Math.floor(Math.random() * 3)]
    }));
    setParticles(newParticles);
  }, []);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smooth scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animated particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window === 'undefined') return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      setParticles(prev => prev.map(particle => {
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
        
        if (distance < 80) {
          particle.x -= dx * 0.005;
          particle.y -= dy * 0.005;
        }

        // Draw particle with glow effect
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particle.color}, ${particle.opacity})`;
        ctx.fill();

        // Add glow
        ctx.shadowColor = `rgba(${particle.color}, 0.8)`;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        return particle;
      }));

      requestAnimationFrame(animateParticles);
    };

    animateParticles();
  }, [mousePosition]);

  const stats = [
    { number: "2019", label: "Founded", icon: <Rocket className="w-8 h-8" /> },
    { number: "10M+", label: "Users Impacted", icon: <Users className="w-8 h-8" /> },
    { number: "99.9%", label: "Uptime", icon: <Shield className="w-8 h-8" /> },
    { number: "150+", label: "Team Members", icon: <Heart className="w-8 h-8" /> }
  ];

  const team = [
    {
      name: "Dr. Aria Quantum",
      role: "Chief Executive Officer",
      specialty: "Quantum Computing Pioneer",
      avatar: "👩‍💼",
      gradient: "from-blue-500 to-cyan-500",
      description: "15+ years revolutionizing quantum algorithms and business intelligence."
    },
    {
      name: "Marcus Neural",
      role: "Chief Technology Officer", 
      specialty: "AI Architecture Visionary",
      avatar: "👨‍💻",
      gradient: "from-purple-500 to-pink-500",
      description: "Former NASA engineer specializing in neural network optimization."
    },
    {
      name: "Dr. Elena Fusion",
      role: "Chief Innovation Officer",
      specialty: "Data Science Luminary",
      avatar: "👩‍🔬",
      gradient: "from-green-500 to-teal-500",
      description: "PhD in Advanced Mathematics, 20+ AI research publications."
    },
    {
      name: "Alex Velocity",
      role: "Chief Product Officer",
      specialty: "UX/UI Evolutionary",
      avatar: "👨‍🎨",
      gradient: "from-orange-500 to-red-500",
      description: "Design thinking expert with 12+ years in human-computer interaction."
    }
  ];

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

  const timeline = [
    {
      year: "2019",
      title: "Genesis",
      description: "Founded with a vision to merge quantum computing with business intelligence",
      icon: <Atom className="w-8 h-8" />
    },
    {
      year: "2020",
      title: "Quantum Breakthrough", 
      description: "Developed our first quantum-inspired algorithm for predictive analytics",
      icon: <Brain className="w-8 h-8" />
    },
    {
      year: "2021",
      title: "Global Expansion",
      description: "Scaled to serve enterprises across 50+ countries",
      icon: <Globe className="w-8 h-8" />
    },
    {
      year: "2022",
      title: "AI Evolution",
      description: "Launched neural network integration for autonomous business optimization",
      icon: <Cpu className="w-8 h-8" />
    },
    {
      year: "2023",
      title: "Network Effect",
      description: "Created the world's largest quantum business intelligence network",
      icon: <Network className="w-8 h-8" />
    },
    {
      year: "2024",
      title: "Transcendence",
      description: "Achieved true AI-human symbiosis in business decision making",
      icon: <Eye className="w-8 h-8" />
    }
  ];

  const tabContent = {
    mission: {
      title: "Our Quantum Mission",
      content: "To transcend the limitations of traditional business intelligence by harnessing the infinite possibilities of quantum computing and artificial intelligence, creating a future where every decision is optimized, every insight is actionable, and every business operates at the speed of thought."
    },
    vision: {
      title: "Vision Beyond Reality", 
      content: "We envision a world where the boundary between human intuition and artificial intelligence dissolves, where quantum computing enables businesses to explore infinite possibilities simultaneously, and where every organization can access the power of predictive omniscience."
    },
    impact: {
      title: "Global Impact Matrix",
      content: "Our technology has transformed over 10 million business processes, saved companies $50+ billion in operational costs, and enabled breakthrough innovations that seemed impossible. We're not just changing business—we're evolving the very nature of human potential."
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Navbar */}
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
            <button className="md:hidden flex items-center px-3 py-2 border-2 border-white rounded text-white bg-transparent" onClick={() => setIsVisible(v => ({ ...v, nav: !v.nav }))} aria-label="Toggle navigation">
              <svg className="h-6 w-6" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" stroke="white" strokeWidth="2" /></svg>
            </button>
          </div>
          {/* Mobile nav menu */}
          {isVisible.nav && (
            <div className="md:hidden flex flex-col space-y-2 mt-2 bg-black/90 rounded-xl p-4 border border-white/10">
              <a href="/" className="px-4 py-2 rounded-xl font-medium text-gray-300 hover:text-white">Home</a>
              <a href="/features" className="px-4 py-2 rounded-xl font-medium text-gray-300 hover:text-white">Features</a>
              <a href="/about" className="px-4 py-2 rounded-xl font-medium text-white">About</a>
              <a href="/contact" className="px-4 py-2 rounded-xl font-medium text-gray-300 hover:text-white">Contact</a>
            </div>
          )}
        </div>
      </nav>

      {/* Animated Background Canvas */}
      <canvas
        ref={canvasRef}
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

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            {/* Floating Badge */}
            <div className="inline-flex items-center px-6 py-3 mb-8 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/20 rounded-full text-lg font-medium animate-float">
              <Sparkles className="w-5 h-5 mr-3 animate-spin" />
              Transcending Business Reality Since 2019
            </div>

            <h1 className="text-7xl md:text-9xl font-black mb-8 leading-tight">
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-shift">
                Beyond
              </span>
              <span className="block text-white animate-slide-in-right">
                Imagination
              </span>
            </h1>

            <p className="text-2xl md:text-4xl text-gray-300 mb-12 max-w-5xl mx-auto leading-relaxed">
              We are the architects of
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-bold"> impossible possibilities</span>,
              the engineers of quantum business evolution, and the visionaries reshaping reality itself.
            </p>
          </div>
        </div>
      </section>

      {/* Mission/Vision/Impact Tabs */}
      <section className="py-24 relative z-10">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-16">
            <div className="flex bg-gray-900/50 backdrop-blur-xl rounded-2xl p-2 border border-gray-700/50">
              {Object.keys(tabContent).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-500 relative ${
                    activeTab === tab 
                      ? 'text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {activeTab === tab && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-100" />
                  )}
                  <span className="relative z-10 capitalize">{tab}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="text-center">
            <h2 className="text-5xl md:text-6xl font-black mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {tabContent[activeTab].title}
            </h2>
            <p className="text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
              {tabContent[activeTab].content}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group text-center p-8 bg-gradient-to-br from-gray-900/80 to-black/80 rounded-3xl border border-gray-800/50 hover:border-white/20 backdrop-blur-xl transform hover:scale-110 hover:-translate-y-6 transition-all duration-700 cursor-pointer"
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="text-blue-400 mb-6 flex justify-center group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                  {stat.icon}
                </div>
                <div className="text-5xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 group-hover:animate-pulse">
                  {stat.number}
                </div>
                <div className="text-xl text-gray-400 group-hover:text-white transition-colors duration-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
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

      {/* Team Section */}
      <section className="py-32 relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/5 via-purple-900/5 to-black" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <h2 className="text-6xl md:text-7xl font-black mb-8">
              Quantum
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Visionaries
              </span>
            </h2>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto">
              The brilliant minds pushing the boundaries of what's possible in business intelligence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="group relative p-8 bg-gradient-to-br from-gray-900/80 to-black/80 rounded-3xl border border-gray-800/50 hover:border-white/20 backdrop-blur-xl transition-all duration-700 transform hover:scale-105 hover:-translate-y-6 overflow-hidden"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Animated gradient border on hover */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${member.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-700 blur-xl`} />
                
                <div className="relative z-10 text-center">
                  <div className="text-6xl mb-6 transform group-hover:scale-125 transition-transform duration-500">
                    {member.avatar}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2 group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
                    {member.name}
                  </h3>
                  
                  <div className={`text-lg font-semibold bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent mb-2`}>
                    {member.role}
                  </div>
                  
                  <div className="text-gray-400 mb-4 text-sm font-medium">
                    {member.specialty}
                  </div>
                  
                  <p className="text-gray-300 text-sm leading-relaxed group-hover:text-white transition-colors duration-500">
                    {member.description}
                  </p>
                </div>

                {/* Floating elements */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" />
                <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" style={{ animationDelay: '0.3s' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-32 relative z-10">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-6xl md:text-7xl font-black mb-8">
              Evolution
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Timeline
              </span>
            </h2>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto">
              Our journey from quantum theory to business reality.
            </p>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500" />
            
            {timeline.map((item, index) => (
              <div
                key={index}
                className={`relative flex items-center mb-16 ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
              >
                {/* Timeline node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-black z-10 animate-pulse" />
                
                {/* Content */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                  <div className="group p-8 bg-gradient-to-br from-gray-900/80 to-black/80 rounded-3xl border border-gray-800/50 hover:border-white/20 backdrop-blur-xl transition-all duration-500 transform hover:scale-105">
                    <div className={`flex items-center mb-4 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                      <div className="text-purple-400 mr-3 group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </div>
                      <div className="text-2xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        {item.year}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors duration-300">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-300 group-hover:text-white transition-colors duration-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 relative z-10">
        <div className="max-w-5xl mx-auto text-center px-6 lg:px-8">
          <h2 className="text-6xl md:text-8xl font-black mb-8">
            Join Our
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Quantum Journey
            </span>
          </h2>
          
          <p className="text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Ready to transcend the boundaries of conventional business? 
            <span className="block mt-2 text-blue-400">The quantum leap awaits.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="group relative px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold text-2xl overflow-hidden transform hover:scale-105 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
              <div className="relative flex items-center justify-center">
                Start Your Evolution
                <ArrowRight className="ml-3 w-7 h-7 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
            
            <button className="group relative px-12 py-6 border-2 border-gray-600 rounded-2xl font-bold text-2xl hover:border-white transition-all duration-500 backdrop-blur-sm overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
              <div className="relative flex items-center justify-center">
                <Users className="mr-3 w-7 h-7" />
                Meet the Team
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-black/80 border-t border-white/10 py-8 text-center text-gray-400 mt-auto">
        <div className="max-w-7xl mx-auto px-6">
          <span className="font-bold text-white">Ωalgorithmic</span> &copy; {new Date().getFullYear()} &mdash; All rights reserved.
        </div>
      </footer>

      {/* Advanced Animations */}
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
            transform: translateY(-10px);
            }
        }
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
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
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.8;
          }
        }
        @keyframes animateGradientShift {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }
        @keyframes animateSlideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes animateSlideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes animateFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes animatePulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.8;
          }
        }

        @keyframes animateGradientShift {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }

    `}</style>
    </div>
  );
};

export default QuantumAboutPage;