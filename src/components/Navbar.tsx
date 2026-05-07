import { useState, useEffect } from 'react';
import { Menu, X, TrendingUp, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Car Hire', href: '#car-hire' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0a1628] shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-4">
          {/* Logo */}
          <button
            onClick={() => handleNav('#home')}
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-[#1a6fd4] to-[#0d4fa8] rounded-lg flex items-center justify-center shadow-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <div className="text-white font-bold text-sm leading-tight font-montserrat tracking-wider">
                ICR
              </div>
              <div className="text-[#4da6ff] text-[10px] font-semibold tracking-widest uppercase leading-tight">
                Investment Traders
              </div>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-md transition-all duration-200"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNav('#contact')}
              className="ml-4 px-5 py-2 bg-[#1a6fd4] hover:bg-[#1560c0] text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-md"
            >
              Get a Quote
            </button>
            <button
              onClick={() => navigate('/admin/login')}
              className="ml-2 p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              title="Admin"
              aria-label="Admin panel"
            >
              <Settings className="w-5 h-5" />
            </button>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0a1628] border-t border-white/10 px-4 pb-4">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="block w-full text-left py-3 text-gray-300 hover:text-white border-b border-white/5 text-sm font-medium"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNav('#contact')}
            className="mt-3 w-full py-3 bg-[#1a6fd4] text-white text-sm font-semibold rounded-lg mb-3"
          >
            Get a Quote
          </button>
          <button
            onClick={() => {
              setOpen(false);
              navigate('/admin/login');
            }}
            className="w-full flex items-center justify-center gap-2 py-2 text-gray-400 hover:text-white text-sm transition-colors border-t border-white/5 pt-3"
          >
            <Settings className="w-4 h-4" />
            Admin Panel
          </button>
        </div>
      )}
    </header>
  );
}
