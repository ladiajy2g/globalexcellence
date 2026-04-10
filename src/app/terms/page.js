import Link from "next/link";

export const metadata = {
  title: "Terms of Service",
  description: "Official Terms of Service for Global Excellence. Guidelines for copyright, content usage, and user conduct.",
};

export default function TermsOfServicePage() {
  return (
    <div className="w-full bg-white pb-24">
      {/* Header */}
      <section className="bg-black text-white py-16 mb-16">
        <div className="w-[95%] xl:w-[85%] mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-brand-primary">Terms of Service</h1>
          <p className="text-[11px] font-black uppercase tracking-[0.4em] text-white/50 italic font-roboto">
            Effective Date: April 10, 2026
          </p>
        </div>
      </section>

      <div className="w-[95%] xl:w-[85%] mx-auto px-4 max-w-4xl">
        <div className="prose prose-xl max-w-none font-serif text-[18px] leading-[1.8] text-gray-800 space-y-12">
          
          <section>
            <h2 className="text-2xl font-black uppercase tracking-tight text-black border-b-2 border-brand-primary pb-4 mb-6">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using <strong>Global Excellence Online</strong> (globalexcellenceonline.com), you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-tight text-black border-b-2 border-brand-primary pb-4 mb-6">
              2. Intellectual Property Rights
            </h2>
            <p>
              The content on this website, including but not limited to articles, photographs, images, logos, and software, is the property of <strong>Global Excellence</strong> and is protected by copyright, trademark, and other intellectual property laws.
            </p>
            <ul className="list-disc pl-8 space-y-3 mt-4">
              <li>Users may view and read content for personal, non-commercial use only.</li>
              <li>Reproduction, distribution, or redistribution of content without prior written permission is strictly prohibited.</li>
              <li>Unauthorized use of our branding or trademarks is a violation of law.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-tight text-black border-b-2 border-brand-primary pb-4 mb-6">
              3. User Conduct
            </h2>
            <p>
              You agree to use this website only for lawful purposes. You are prohibited from:
            </p>
            <ul className="list-disc pl-8 space-y-3 mt-4">
              <li>Using the site in any way that violates any local, national, or international law.</li>
              <li>Engaging in any data mining, data harvesting, or similar activity.</li>
              <li>Violating the security of the website or attempting to gain unauthorized access.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-tight text-black border-b-2 border-brand-primary pb-4 mb-6">
              4. Disclaimer of Liability
            </h2>
            <p>
              The materials on <strong>Global Excellence</strong> are provided "as is". We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties of merchantability or fitness for a particular purpose.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-tight text-black border-b-2 border-brand-primary pb-4 mb-6">
              5. Governing Law
            </h2>
            <p>
              Any claim related to the <strong>Global Excellence</strong> website shall be governed by the laws of the Federal Republic of Nigeria without regards to its conflict of law provisions.
            </p>
          </section>

          <div className="bg-gray-50 p-10 mt-16 rounded-[2px] border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-black uppercase tracking-tight">Need Clarification?</h3>
              <p className="text-sm font-serif italic text-gray-500 max-w-sm">
                If you have any questions regarding these terms, please contact our legal department.
              </p>
            </div>
            <Link href="/contact-us" className="px-10 py-4 bg-brand-primary text-white text-[11px] font-black uppercase tracking-widest hover:bg-black transition-colors rounded-[2px] shadow-lg">Contact Us</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
