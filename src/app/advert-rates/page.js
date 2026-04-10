export const metadata = {
  title: "Advert Rates",
  description: "Official advertising rates for Global Excellence. Reach Nigeria's premium online audience.",
};

const advertRates = [
  { description: "Full banner", location: "Right hand side of the logo", size: "468 x 60", rate: "N500,000.00" },
  { description: "Half banner", location: "Right hand side of the logo", size: "234 x 60", rate: "N250,000.00" },
  { description: "Box banner", location: "Right hand side, under Editorial items", size: "300 x 300", rate: "N300,000.00" },
  { description: "Full rectangular board", location: "Centre, under Editorial items", size: "620 x 100", rate: "N300,000.00" },
  { description: "Half rectangular board", location: "Centre, under Editorial items", size: "310 x 100", rate: "N200,000.00" },
];

const specialRates = [
  "Special sizes and locations are negotiable on request",
  "Newsletter sponsorship – Negotiable",
  "Wrap around – Negotiable",
];

const notes = [
  "All artworks should be submitted one week before publication",
  "All advert materials should be saved in JPEG, GIF or PNG format",
  "Advert rates are subject to periodic review",
  "All Advert rates are inclusive of 5% VAT",
];

export default function AdvertRatesPage() {
  return (
    <div className="w-full bg-white pb-24">
      {/* Header */}
      <section className="bg-gray-50 border-b border-gray-100 py-20 mb-16 text-center">
        <div className="w-[95%] xl:w-[85%] mx-auto px-4 max-w-5xl">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">Advert Rates</h1>
          <p className="text-sm font-black uppercase tracking-[0.4em] text-gray-500 italic">
            Effective from 2026
          </p>
        </div>
      </section>

      <div className="w-[95%] xl:w-[85%] mx-auto px-4 max-w-5xl">
        {/* Intro */}
        <div className="mb-16 text-center">
          <p className="text-lg font-serif italic text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Connect with Global Excellence Magazine's premier audience. 
            Choose from our range of advertising options to reach your target market.
          </p>
        </div>

        {/* Rates Table */}
        <div className="mb-16 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-brand-primary text-white">
                <th className="text-left p-5 text-[10px] font-black uppercase tracking-widest">Description</th>
                <th className="text-left p-5 text-[10px] font-black uppercase tracking-widest">Location</th>
                <th className="text-left p-5 text-[10px] font-black uppercase tracking-widest">Size in Pixels</th>
                <th className="text-right p-5 text-[10px] font-black uppercase tracking-widest">Rates per Month</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {advertRates.map((item, idx) => (
                <tr key={idx} className="group hover:bg-gray-50 transition-colors">
                  <td className="p-5 text-[14px] font-black uppercase">{item.description}</td>
                  <td className="p-5 text-[13px] text-gray-600">{item.location}</td>
                  <td className="p-5 text-[13px] font-mono text-gray-500">{item.size}</td>
                  <td className="p-5 text-right text-[14px] font-black text-brand-primary">{item.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Special Rates */}
        <div className="mb-16">
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-gray-400 mb-6 border-l-4 border-brand-primary pl-4">Special Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {specialRates.map((item, idx) => (
              <div key={idx} className="bg-gray-50 p-6 rounded-[2px] border border-gray-100 text-center">
                <span className="text-[13px] font-bold text-gray-700 italic">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="mb-16 bg-gray-50 p-8 rounded-[2px] border border-gray-100">
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-gray-500 mb-6">Important Notes</h2>
          <ul className="space-y-3">
            {notes.map((note, idx) => (
              <li key={idx} className="flex items-start gap-3 text-[14px] text-gray-600">
                <span className="w-1.5 h-1.5 bg-brand-primary rounded-full mt-2 shrink-0" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="bg-black text-white p-12 rounded-[2px] shadow-2xl">
          <h2 className="text-xs font-black uppercase tracking-[0.4em] mb-8 border-l-4 border-brand-primary pl-4">For More Information, Contact Global Excellence</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Email</h3>
              <div className="flex flex-col gap-2">
                <a href="mailto:info@globalexcellenceonline.com" className="text-[14px] font-bold text-white hover:text-red-600 transition-colors">info@globalexcellenceonline.com</a>
              </div>
            </div>
            
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Mobile Numbers</h3>
              <div className="flex flex-col gap-2">
                <a href="tel:+2348033010474" className="text-[14px] font-bold text-white hover:text-red-600 transition-colors">+2348033010474</a>
                <a href="tel:+2348023023067" className="text-[14px] font-bold text-white hover:text-red-600 transition-colors">+2348023023067</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}