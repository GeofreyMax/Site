import { ArrowRight, CheckCircle } from 'lucide-react';
import { useWebsiteContent } from '../hooks/useWebsiteContent';

const highlights = [
  '9+ Years of Industry Experience',
  'Trusted by Private & State Enterprises',
  'Pan-Tanzania Operations',
];

export default function Hero() {
  const { get } = useWebsiteContent();
  const scroll = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/1427541/pexels-photo-1427541.jpeg"
          alt="Logistics and transport background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/95 via-[#0a1628]/80 to-[#0a1628]/40" />
      </div>

      {/* Animated accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1a6fd4] via-[#1db954] to-[#1a6fd4]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 pt-36">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#1a6fd4]/20 border border-[#1a6fd4]/40 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#1db954] animate-pulse" />
            <span className="text-[#4da6ff] text-xs font-semibold tracking-wider uppercase">
              Dar es Salaam, Tanzania
            </span>
          </div>

          <h1 className="font-montserrat text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            {get('hero', 'headline', 'Your Trusted Partner in Supply, Transport & Trade')}
          </h1>

          <p className="text-gray-300 text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl">
            {get('hero', 'subheadline', 'ICR Investment Traders delivers high-quality automotive, agribusiness, logistics, and procurement services across Tanzania — with reliability, integrity, and a commitment to excellence.')}
          </p>

          {/* Highlights */}
          <ul className="space-y-2 mb-10">
            {highlights.map((h) => (
              <li key={h} className="flex items-center gap-3 text-gray-200 text-sm">
                <CheckCircle className="w-5 h-5 text-[#1db954] flex-shrink-0" />
                {h}
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => scroll('#services')}
              className="flex items-center gap-2 px-7 py-3.5 bg-[#1a6fd4] hover:bg-[#1560c0] text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-blue-900/40 hover:scale-105"
            >
              Our Services
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('#contact')}
              className="flex items-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold rounded-xl transition-all duration-200 backdrop-blur-sm"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-[#0a1628]/90 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '9+', label: 'Years Experience' },
            { value: '5', label: 'Service Lines' },
            { value: '100%', label: 'Client Focus' },
            { value: '24/7', label: 'Support Available' },
          ].map(({ value, label }) => (
            <div key={label}>
              <div className="text-2xl font-bold text-[#4da6ff] font-montserrat">{value}</div>
              <div className="text-gray-400 text-xs mt-0.5 tracking-wide">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
