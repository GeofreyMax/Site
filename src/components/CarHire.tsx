import { CheckCircle, Clock, MapPin, Phone, Shield } from 'lucide-react';

const features = [
  'Wide selection of high-quality, well-maintained vehicles with modern accessories',
  'Professional, customer-focused service at fair and competitive prices',
  'Flexible mileage options to meet client travel needs',
  'Free vehicle delivery to your preferred and convenient location',
  '24-hour roadside assistance for reliable support during your journey',
  'Dedicated 24/7 customer support and call center services',
  'Rental vehicles with or without professional drivers',
  'Open 7 days a week, operating throughout the year without interruption',
];

const stats = [
  { icon: Clock, value: '24/7', label: 'Support' },
  { icon: Shield, value: '100%', label: 'Insured Fleet' },
  { icon: MapPin, value: 'TZ-wide', label: 'Coverage' },
  { icon: Phone, value: 'Always', label: 'Reachable' },
];

export default function CarHire() {
  return (
    <section id="car-hire" className="py-24 bg-[#f0f4f9]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#1a6fd4] text-sm font-semibold tracking-widest uppercase">
            Transport Solutions
          </span>
          <h2 className="font-montserrat text-3xl sm:text-4xl font-bold text-[#0a1628] mt-2">
            Car Hire Services
          </h2>
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-[#1a6fd4] to-[#1db954] mx-auto rounded-full" />
          <p className="text-gray-500 mt-4 max-w-xl mx-auto font-semibold text-base">
            Something You Can Rely On
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image side */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg"
                alt="Car hire fleet"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="grid grid-cols-4 gap-3">
                  {stats.map(({ icon: Icon, value, label }) => (
                    <div key={label} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center border border-white/20">
                      <Icon className="w-4 h-4 text-[#4da6ff] mx-auto mb-1" />
                      <div className="text-white font-bold text-sm font-montserrat">{value}</div>
                      <div className="text-gray-300 text-[10px]">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Secondary image */}
            <div className="absolute -bottom-8 -right-8 w-48 h-36 rounded-xl overflow-hidden shadow-xl border-4 border-white hidden lg:block">
              <img
                src="https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg"
                alt="Transport services"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="lg:pl-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="font-montserrat font-bold text-[#0a1628] text-xl mb-6">
                Why Choose Our Fleet?
              </h3>
              <ul className="space-y-3">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#1db954] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 text-sm leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 p-4 bg-[#1a6fd4]/5 rounded-xl border border-[#1a6fd4]/20">
                <p className="text-[#1a6fd4] text-sm font-semibold text-center">
                  Corporate car hire &bull; Project transport &bull; Staff buses &bull; Long-term rentals
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
