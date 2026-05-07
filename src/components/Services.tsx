import { FlaskConical, Package, ShoppingBag, Car, Truck, ChevronRight } from 'lucide-react';

const services = [
  {
    icon: FlaskConical,
    title: 'Supply of Sulphur & Industrial Products',
    image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg',
    items: [
      'Industrial Sulphur supply',
      'Agricultural Sulphur products',
      'Bulk and customized supply orders',
      'Safe handling and delivery logistics',
    ],
    accent: '#1a6fd4',
  },
  {
    icon: Package,
    title: 'Supply of Duty Bags & Packaging Materials',
    image: 'https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg',
    items: [
      'Duty bags and heavy-duty sacks',
      'Packaging bags for agricultural and industrial products',
      'Customized packaging solutions',
      'Bulk supply for wholesalers and distributors',
    ],
    accent: '#1db954',
  },
  {
    icon: ShoppingBag,
    title: 'General Supply of Goods',
    image: 'https://images.pexels.com/photos/1797428/pexels-photo-1797428.jpeg',
    items: [
      'Office supplies and consumables',
      'Industrial and construction materials',
      'Safety equipment and accessories',
      'General merchandise and specialized procurement',
    ],
    accent: '#0891b2',
  },
  {
    icon: Car,
    title: 'Car Hire & Transport Services',
    image: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg',
    items: [
      'Corporate car hire services',
      'Project and field transport support',
      'Staff transportation services',
      'Long-term and short-term vehicle rental',
    ],
    accent: '#f59e0b',
  },
  {
    icon: Truck,
    title: 'Procurement & Logistics Support',
    image: 'https://images.pexels.com/photos/1427541/pexels-photo-1427541.jpeg',
    items: [
      'Product sourcing and procurement',
      'Delivery and distribution management',
      'Supply chain coordination',
      'Inventory support services',
    ],
    accent: '#ef4444',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-white" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#1a6fd4] text-sm font-semibold tracking-widest uppercase">
            What We Offer
          </span>
          <h2 className="font-montserrat text-3xl sm:text-4xl font-bold text-[#0a1628] mt-2">
            Our Services
          </h2>
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-[#1a6fd4] to-[#1db954] mx-auto rounded-full" />
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            From industrial supplies to logistics, we deliver comprehensive solutions tailored to your business needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(({ icon: Icon, title, image, items, accent }) => (
            <div
              key={title}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/80 to-transparent" />
                <div
                  className="absolute top-4 right-4 w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: accent + '20', border: `1px solid ${accent}40` }}
                >
                  <Icon className="w-5 h-5" style={{ color: accent }} />
                </div>
              </div>

              <div className="p-6">
                <div
                  className="h-1 w-10 rounded-full mb-4"
                  style={{ backgroundColor: accent }}
                />
                <h3 className="font-montserrat font-bold text-[#0a1628] text-base mb-4 leading-snug">
                  {title}
                </h3>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-gray-500 text-sm">
                      <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: accent }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          {/* Agriculture highlight card */}
          <div className="group md:col-span-2 lg:col-span-3 bg-gradient-to-r from-[#0a1628] to-[#163254] rounded-2xl overflow-hidden shadow-xl">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-8 flex flex-col justify-center">
                <span className="text-[#4da6ff] text-xs font-semibold tracking-widest uppercase mb-3">
                  Agricultural Inputs
                </span>
                <h3 className="font-montserrat font-bold text-white text-2xl mb-4 leading-snug">
                  Agricultural &amp; Industrial Supplies
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  We supply premium-grade agricultural inputs including Urea (46-0-0), NPK (19-19-19),
                  DAP (18-46-0), pesticides, sulphur, and packaging materials — empowering farmers and
                  exporters with quality, reliable supply chains.
                </p>
                <ul className="space-y-2">
                  {['Supply of Urea & NPK fertilizers', 'Pesticides for crop protection', 'Sisal lops & sesame bags', 'Reliable supply chain'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-gray-300 text-sm">
                      <ChevronRight className="w-4 h-4 text-[#1db954]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative min-h-64 md:min-h-0">
                <img
                  src="https://images.pexels.com/photos/1084540/pexels-photo-1084540.jpeg"
                  alt="Agricultural supplies"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/60 to-transparent md:bg-gradient-to-l" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
