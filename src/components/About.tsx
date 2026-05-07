import { Users, Award, Globe, Zap } from 'lucide-react';

const pillars = [
  {
    icon: Users,
    title: 'Well-Trained Staff',
    desc: 'Our team of professionals is dedicated to delivering superior service across all operations.',
  },
  {
    icon: Award,
    title: 'High Standards',
    desc: 'We maintain rigorous quality standards, earning trust from private companies and state enterprises.',
  },
  {
    icon: Globe,
    title: 'Wide Reach',
    desc: 'Serving individuals, corporations and government bodies throughout Tanzania and beyond.',
  },
  {
    icon: Zap,
    title: 'Value for Money',
    desc: 'Competitive pricing without compromise on quality — delivering maximum value to every client.',
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-white" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-[#1a6fd4] text-sm font-semibold tracking-widest uppercase">
            Who We Are
          </span>
          <h2 className="font-montserrat text-3xl sm:text-4xl font-bold text-[#0a1628] mt-2">
            About ICR Investment Traders
          </h2>
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-[#1a6fd4] to-[#1db954] mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg"
                alt="Business team"
                className="w-full h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/60 to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-[#1a6fd4] text-white rounded-2xl p-5 shadow-xl">
              <div className="text-4xl font-bold font-montserrat">9+</div>
              <div className="text-xs font-medium text-blue-100 mt-1">Years of Excellence</div>
            </div>
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#1db954]/10 rounded-full border-2 border-[#1db954]/30" />
          </div>

          {/* Content */}
          <div>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              For over <strong className="text-[#0a1628]">nine years</strong>, ICR Investment Traders
              has been serving valued customers in Tanzania with the best supply services in automotive,
              agribusiness, and industrial sectors.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              With our high standards and superior services, we have become widely accepted by
              individuals, private companies, and state enterprises. ICR is a young and progressive
              company eager to expand its operations through a committed approach to customer service
              and value for money. To fulfill all requirements of our customers, we emphasize the best
              quality of our services with well-trained staff.
            </p>

            {/* Pillars */}
            <div className="grid sm:grid-cols-2 gap-4">
              {pillars.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex gap-3 p-4 rounded-xl bg-gray-50 hover:bg-blue-50 border border-gray-100 hover:border-[#1a6fd4]/30 transition-all duration-200"
                >
                  <div className="w-10 h-10 bg-[#1a6fd4]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-[#1a6fd4]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#0a1628] text-sm mb-1">{title}</div>
                    <div className="text-gray-500 text-xs leading-relaxed">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
