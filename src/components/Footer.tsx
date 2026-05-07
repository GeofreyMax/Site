import { TrendingUp, MapPin, Phone, Mail } from 'lucide-react';

const services = [
  'Supply of Sulphur & Industrial Products',
  'Supply of Duty Bags & Packaging',
  'General Supply of Goods',
  'Car Hire & Transport Services',
  'Procurement & Logistics Support',
];

const quickLinks = ['Home', 'About Us', 'Services', 'Car Hire', 'Contact'];

export default function Footer() {
  const scroll = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const anchors: Record<string, string> = {
    'Home': '#home',
    'About Us': '#about',
    'Services': '#services',
    'Car Hire': '#car-hire',
    'Contact': '#contact',
  };

  return (
    <footer className="bg-[#060f1e] text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1a6fd4] to-[#0d4fa8] rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-white font-bold text-sm font-montserrat tracking-wider">ICR</div>
                <div className="text-[#4da6ff] text-[10px] font-semibold tracking-widest uppercase">Investment Traders</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-500 mb-5">
              A trusted Tanzanian provider of automotive, agribusiness supply, logistics, and procurement services.
              Committed to excellence, integrity, and sustainable growth.
            </p>
            <div className="text-xs text-gray-600">
              Dar es Salaam, Tanzania
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 font-montserrat tracking-wide uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => scroll(anchors[link])}
                    className="text-sm hover:text-white transition-colors duration-200 text-left"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 font-montserrat tracking-wide uppercase">
              Our Services
            </h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s}>
                  <button
                    onClick={() => scroll('#services')}
                    className="text-sm hover:text-white transition-colors duration-200 text-left"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 font-montserrat tracking-wide uppercase">
              Contact Info
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#1a6fd4] flex-shrink-0 mt-0.5" />
                <span className="text-sm leading-relaxed">
                  Mezzanine Floor, ALFA PLAZA,<br />
                  Ada Estate Street, Chabruma Road,<br />
                  P.O. Box 373, Dar es Salaam
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#1db954] flex-shrink-0" />
                <a href="tel:+255767071788" className="text-sm hover:text-white transition-colors">
                  +255 767 071 788
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#f59e0b] flex-shrink-0" />
                <a href="mailto:infinitycarrentals77@gmail.com" className="text-sm hover:text-white transition-colors break-all">
                  infinitycarrentals77@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} ICR Investment Traders. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Dar es Salaam, Tanzania &bull; Registered Business
          </p>
        </div>
      </div>
    </footer>
  );
}
