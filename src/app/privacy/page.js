import Link from "next/link";

export const metadata = {
  title: "Privacy Policy",
  description: "Official Privacy Policy for Global Excellence. Learn how we handle your data and protect your privacy.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full bg-white pb-24">
      {/* Header */}
      <section className="bg-gray-50 border-b border-gray-100 py-16 mb-16">
        <div className="w-[95%] xl:w-[85%] mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-400 italic font-roboto">
            Last Updated: April 10, 2026
          </p>
        </div>
      </section>

      <div className="w-[95%] xl:w-[85%] mx-auto px-4 max-w-4xl">
        <div className="prose prose-xl max-w-none font-serif text-[18px] leading-[1.8] text-gray-800 space-y-12">
          
          <section>
            <h2 className="text-2xl font-black uppercase tracking-tight text-black mb-6 flex items-center gap-4">
              <span className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center text-sm">01</span>
              Introduction
            </h2>
            <p>
              Welcome to <strong>Global Excellence Online</strong> (globalexcellenceonline.com). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-tight text-black mb-6 flex items-center gap-4">
              <span className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center text-sm">02</span>
              Data We Collect
            </h2>
            <p>
              When you visit our site, we may collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the site, we collect information about the individual web pages or products that you view.
            </p>
            <ul className="list-disc pl-8 space-y-3 mt-4">
              <li><strong>Contact Data:</strong> Includes email address for newsletter subscriptions.</li>
              <li><strong>Technical Data:</strong> Includes internet protocol (IP) address, browser type, and version.</li>
              <li><strong>Usage Data:</strong> Includes information about how you use our website.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-tight text-black mb-6 flex items-center gap-4">
              <span className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center text-sm">03</span>
              How We Use Your Data
            </h2>
            <p>
              We use the data we collect to help us screen for potential risk and fraud, and more generally to improve and optimize our site (for example, by generating analytics about how our customers browse and interact with the site).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-tight text-black mb-6 flex items-center gap-4">
              <span className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center text-sm">04</span>
              Third-Party Links
            </h2>
            <p>
              Our website includes links to third-party websites, plug-ins, and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-tight text-black mb-6 flex items-center gap-4">
              <span className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center text-sm">05</span>
              Cookies
            </h2>
            <p>
              We use cookies to enhance your experience. You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly.
            </p>
          </section>

          <div className="bg-gray-50 p-10 mt-16 rounded-[2px] border border-gray-100">
            <h3 className="text-xl font-black uppercase mb-4 tracking-tight">Contact Our Privacy Team</h3>
            <p className="text-sm font-serif italic text-gray-500 mb-6">
              If you have any questions about this privacy policy or our privacy practices, please contact us at:
            </p>
            <div className="flex flex-col gap-2">
              <a href="mailto:info@globalexcellenceonline.com" className="text-brand-primary font-black uppercase tracking-widest text-xs hover:underline">info@globalexcellenceonline.com</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
