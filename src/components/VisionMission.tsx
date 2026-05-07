import { Eye, Target } from 'lucide-react';

export default function VisionMission() {
  return (
    <section className="py-24 bg-[#f0f4f9]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#1a6fd4] text-sm font-semibold tracking-widest uppercase">
            Our Direction
          </span>
          <h2 className="font-montserrat text-3xl sm:text-4xl font-bold text-[#0a1628] mt-2">
            Vision &amp; Mission
          </h2>
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-[#1a6fd4] to-[#1db954] mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Vision */}
          <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="h-2 bg-gradient-to-r from-[#1a6fd4] to-[#4da6ff]" />
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-[#1a6fd4]/10 rounded-xl flex items-center justify-center">
                  <Eye className="w-7 h-7 text-[#1a6fd4]" />
                </div>
                <h3 className="font-montserrat text-2xl font-bold text-[#0a1628]">Vision</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-base">
                To be a <strong className="text-[#0a1628]">reliable and accountable provider</strong> of
                quality goods and services by maintaining a strong team of professionals working
                collaboratively under one roof, with a commitment to efficiency, integrity, and customer
                satisfaction. We strive to deliver timely, cost-effective, and professional solutions
                tailored to our clients' needs while building long-term partnerships based on trust,
                excellence, and mutual success.
              </p>
            </div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#1a6fd4]/5 rounded-full -mb-16 -mr-16" />
          </div>

          {/* Mission */}
          <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="h-2 bg-gradient-to-r from-[#1db954] to-[#16a34a]" />
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-[#1db954]/10 rounded-xl flex items-center justify-center">
                  <Target className="w-7 h-7 text-[#1db954]" />
                </div>
                <h3 className="font-montserrat text-2xl font-bold text-[#0a1628]">Mission</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-base">
                To be a <strong className="text-[#0a1628]">leading and trusted provider</strong> of
                quality goods and services, creating sustainable employment opportunities for youth and
                contributing to improved livelihoods and positive socio-economic transformation in the
                communities we serve.
              </p>
            </div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#1db954]/5 rounded-full -mb-16 -mr-16" />
          </div>
        </div>
      </div>
    </section>
  );
}
