import { Shield, Lightbulb, Star, Leaf, Heart } from 'lucide-react';

const values = [
  {
    icon: Shield,
    title: 'Integrity',
    desc: 'We uphold the highest ethical standards in all our business practices.',
    color: 'text-[#1a6fd4]',
    bg: 'bg-[#1a6fd4]/10',
    border: 'border-[#1a6fd4]/20',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    desc: 'We embrace new technologies and methodologies to deliver superior results.',
    color: 'text-[#f59e0b]',
    bg: 'bg-[#f59e0b]/10',
    border: 'border-[#f59e0b]/20',
  },
  {
    icon: Star,
    title: 'Quality',
    desc: 'We strive for excellence in every project we undertake.',
    color: 'text-[#0891b2]',
    bg: 'bg-[#0891b2]/10',
    border: 'border-[#0891b2]/20',
  },
  {
    icon: Leaf,
    title: 'Sustainability',
    desc: 'We are committed to environmentally responsible practices in all our operations.',
    color: 'text-[#1db954]',
    bg: 'bg-[#1db954]/10',
    border: 'border-[#1db954]/20',
  },
  {
    icon: Heart,
    title: 'Customer Focus',
    desc: 'We prioritize our clients\' needs and work collaboratively to achieve their goals.',
    color: 'text-[#ef4444]',
    bg: 'bg-[#ef4444]/10',
    border: 'border-[#ef4444]/20',
  },
];

export default function CoreValues() {
  return (
    <section className="py-24 bg-[#0a1628]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#4da6ff] text-sm font-semibold tracking-widest uppercase">
            What We Stand For
          </span>
          <h2 className="font-montserrat text-3xl sm:text-4xl font-bold text-white mt-2">
            Our Core Values
          </h2>
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-[#1a6fd4] to-[#1db954] mx-auto rounded-full" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {values.map(({ icon: Icon, title, desc, color, bg, border }) => (
            <div
              key={title}
              className={`bg-white/5 hover:bg-white/10 border ${border} rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/20`}
            >
              <div className={`w-14 h-14 ${bg} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                <Icon className={`w-7 h-7 ${color}`} />
              </div>
              <h3 className={`font-montserrat font-bold text-base mb-3 ${color}`}>{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
