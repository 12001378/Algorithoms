
import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';

const QuantumContactPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [showNav, setShowNav] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Form state
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  // Real-time validation
  const validate = (field, value) => {
    switch (field) {
      case 'name':
        return value.length < 2 ? 'Name must be at least 2 characters.' : '';
      case 'email':
        return !/^\S+@\S+\.\S+$/.test(value) ? 'Invalid email address.' : '';
      case 'message':
        return value.length < 10 ? 'Message must be at least 10 characters.' : '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
  };

  // EmailJS integration
  const sendEmail = (e) => {
    e.preventDefault();
    // Validate all fields before sending
    const newErrors = {
      name: validate('name', form.name),
      email: validate('email', form.email),
      message: validate('message', form.message)
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some((err) => err)) return;
    setSending(true);
    setSuccess(false);
    emailjs.send(
  'service_7oayogc', // Your EmailJS service ID
  'template_csqnhs4', // Replace with your EmailJS template ID
   form,
  'GAIeFnLSGbIg_wvEE' // Your EmailJS public key
    )
      .then(() => {
        setSending(false);
        setSuccess(true);
        setForm({ name: '', email: '', message: '' });
        setShowSnackbar(true);
        setTimeout(() => setShowSnackbar(false), 3500);
      })
      .catch(() => {
        setSending(false);
        setSuccess(false);
      });
  };

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
              <a href="/features" className="relative px-6 py-3 rounded-xl font-medium transition-all duration-300 group text-gray-300 hover:text-white">Features</a>
              <a href="/about" className="relative px-6 py-3 rounded-xl font-medium transition-all duration-300 group text-gray-300 hover:text-white">About</a>
              <a href="/contact" className="relative px-6 py-3 rounded-xl font-medium transition-all duration-300 group text-white">Contact</a>
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
              <a href="/features" className="px-4 py-2 rounded-xl font-medium text-gray-300 hover:text-white">Features</a>
              <a href="/about" className="px-4 py-2 rounded-xl font-medium text-gray-300 hover:text-white">About</a>
              <a href="/contact" className="px-4 py-2 rounded-xl font-medium text-white">Contact</a>
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
      {/* Contact Content */}
      <main className="pt-32 pb-32 px-6 max-w-5xl mx-auto text-center">
        <h1 className="text-6xl font-black mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Contact</h1>
        <p className="text-2xl text-gray-300 mb-12">Get in touch with the quantum team for collaboration, support, or inquiries.</p>
        <div className="flex justify-center">
          <form 
            className="w-full max-w-lg mx-auto bg-white/5 rounded-2xl p-8 shadow-lg border border-gray-800 animate__animated animate__fadeIn flex flex-col gap-6 backdrop-blur-md"
            onSubmit={sendEmail}
            autoComplete="off"
          >
            {/* Floating label input for Name */}
            <div className="mb-4 text-left">
              <label htmlFor="name" className="block mb-2 text-base font-medium text-gray-200">Name</label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className={`w-full pl-4 pr-4 py-3 rounded-lg bg-gray-900/80 text-white text-base focus:outline-none focus:ring-2 focus:ring-blue-400 border border-gray-700 transition-all duration-300 ${errors.name ? 'border-red-500 ring-red-400' : ''}`}
                  autoComplete="off"
                />
              </div>
              {errors.name && <span className="text-red-400 text-xs animate-pulse ml-2 mt-1 block">{errors.name}</span>}
            </div>

            {/* Floating label input for Email */}
            <div className="mb-4 text-left">
              <label htmlFor="email" className="block mb-2 text-base font-medium text-gray-200">Email</label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className={`w-full pl-4 pr-4 py-3 rounded-lg bg-gray-900/80 text-white text-base focus:outline-none focus:ring-2 focus:ring-purple-400 border border-gray-700 transition-all duration-300 ${errors.email ? 'border-red-500 ring-red-400' : ''}`}
                  autoComplete="off"
                />
              </div>
              {errors.email && <span className="text-red-400 text-xs animate-pulse ml-2 mt-1 block">{errors.email}</span>}
            </div>

            {/* Floating label textarea for Message */}
            <div className="mb-4 text-left">
              <label htmlFor="message" className="block mb-2 text-base font-medium text-gray-200">Message</label>
              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={form.message}
                  onChange={handleChange}
                  required
                  className={`w-full pl-4 pr-4 py-3 rounded-lg bg-gray-900/80 text-white text-base focus:outline-none focus:ring-2 focus:ring-pink-400 border border-gray-700 transition-all duration-300 resize-none ${errors.message ? 'border-red-500 ring-red-400' : ''}`}
                  autoComplete="off"
                ></textarea>
              </div>
              {errors.message && <span className="text-red-400 text-xs animate-pulse ml-2 mt-1 block">{errors.message}</span>}
            </div>

            {/* Animated submit button */}
            <button type="submit" className="mt-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-base font-semibold rounded-lg py-3 shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-60 disabled:cursor-not-allowed" disabled={sending}>
              {sending ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin" width="20" height="20" fill="none" stroke="currentColor"><circle cx="10" cy="10" r="8" strokeWidth="4"/></svg>
                  Sending...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <svg width="20" height="20" fill="none" stroke="currentColor"><path d="M2 12l8-8 8 8"/></svg>
                  Send Message
                </span>
              )}
            </button>
            {sending && <div className="text-blue-400 mt-4 animate__animated animate__pulse">Sending...</div>}
          </form>
        </div>
      </main>
      {/* Snackbar for success message (outside form and main) */}
      {showSnackbar && (
        <div
          className="fixed right-8 flex items-center gap-4 px-6 py-4 rounded-xl shadow-2xl z-50 animate__animated animate__fadeInDown backdrop-blur-lg border border-white/10"
          style={{ top: '88px', background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 60%, #EC4899 100%)', minWidth: '320px', boxShadow: '0 8px 32px rgba(139,92,246,0.18)' }}
          role="status"
          aria-live="polite"
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-blue-200">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#fff"/><path d="M7 13l3 3 7-7" stroke="#fff" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </span>
          <span className="font-semibold text-base text-white drop-shadow">Message sent successfully!</span>
          <button
            className="ml-auto text-white/80 hover:text-white text-lg px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
            onClick={() => setShowSnackbar(false)}
            aria-label="Close notification"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 20 20"><line x1="4" y1="4" x2="16" y2="16" stroke="#fff"/><line x1="16" y1="4" x2="4" y2="16" stroke="#fff"/></svg>
          </button>
        </div>
      )}
      {/* Footer */}
      <footer className="w-full bg-black/80 border-t border-white/10 py-8 text-center text-gray-400 mt-auto">
        <div className="max-w-7xl mx-auto px-6">
          <span className="font-bold text-white">Ωalgorithmic</span> &copy; {new Date().getFullYear()} &mdash; All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default QuantumContactPage;
