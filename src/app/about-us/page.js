import Link from "next/link";

export const metadata = {
  title: "About Us",
  description: "Learn about Global Excellence, Nigeria's premier information, education, and entertainment magazine. Meet our Publisher/Editor-in-Chief Mayor Akinpelu.",
};

export default function AboutUsPage() {
  return (
    <div className="w-full bg-white pb-24">
      {/* Hero Header */}
      <section className="bg-gray-50 border-b border-gray-100 py-20 mb-16">
        <div className="w-[95%] xl:w-[85%] mx-auto px-4 max-w-5xl text-center">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">About Us</h1>
          <p className="text-xl font-serif italic text-gray-500 max-w-2xl mx-auto leading-relaxed">
            The magazine of first choice for quality information, education and entertainment.
          </p>
        </div>
      </section>

      <div className="w-[95%] xl:w-[85%] mx-auto px-4 max-w-5xl">
        {/* Publisher Profile */}
        <div className="mb-16">
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-gray-400 mb-12 border-l-4 border-brand-primary pl-4">Publisher Profile</h2>
          
          <div className="bg-gray-50 p-10 rounded-[2px] border border-gray-100">
            <h3 className="text-2xl font-black uppercase mb-2">Mayor Akinpelu</h3>
            <p className="text-sm font-bold uppercase tracking-widest text-brand-primary mb-6">Publisher/Editor-in-Chief, Global Excellence Magazine</p>
            
            <div className="font-serif text-[17px] leading-[1.9] text-gray-800 space-y-5">
              <p>
                Mayor Akinpelu is a veteran Nigerian journalist and the publisher of Global Excellence Magazine. He has over three decades of experience in the media industry and is widely recognized for his contributions to celebrity journalism and lifestyle reporting in Nigeria.
              </p>
              <p>
                Global Excellence Online is the digital extension of the renowned print publication, continuing the tradition of delivering high-quality news, entertainment, and investigative stories to a global audience.
              </p>
              <p>
                [Note to Editor: Please update this section with a more detailed profile of Mayor Akinpelu and the history of Global Excellence.]
              </p>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-4">Contact Information</h4>
              <div className="flex flex-col md:flex-row gap-6 text-sm">
                <div className="flex flex-col gap-2">
                  <span className="text-gray-500">Website:</span>
                  <a href="https://globalexcellenceonline.com" className="font-bold text-brand-primary hover:underline">globalexcellenceonline.com</a>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-gray-500">Email:</span>
                  <div className="flex flex-col">
                    <a href="mailto:info@globalexcellenceonline.com" className="font-bold text-brand-primary hover:underline">info@globalexcellenceonline.com</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}