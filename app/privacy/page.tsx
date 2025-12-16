import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | PDFGuerrilla',
};

export default function PrivacyPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 prose prose-gray">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">1. Data Handling (Client-Side Processing)</h2>
        <p className="mb-4">
          At PDFGuerrilla, we prioritize your privacy above all else. Unlike other online converters, 
          <strong> we do not upload your files to any server.</strong>
        </p>
        <p>
          All file processing (Image to PDF, Merge, Compress, Edit) happens locally within your web browser 
          using WebAssembly technology. Your documents never leave your device.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">2. Advertising & Cookies</h2>
        <p className="mb-4">
          We use third-party advertising partners (such as Adsterra, Monetag, and Google AdSense) to keep this tool free. 
          These partners may use cookies and web beacons to serve ads based on your prior visits to this website.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Adsterra & Monetag:</strong> These networks may collect non-personal data (like browser type, IP address) to display relevant advertisements.</li>
          <li><strong>Cookies:</strong> You can choose to disable cookies through your individual browser options.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">3. Analytics</h2>
        <p>
          We may use simple analytics tools to count how many visitors use our site. This data is anonymous and used solely to improve website performance.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">4. Consent</h2>
        <p>
          By using our website, you hereby consent to our Privacy Policy and agree to its terms.
        </p>
      </section>

      <div className="mt-12 pt-8 border-t border-gray-200">
        <Link href="/" className="text-blue-600 hover:underline">Back to Home</Link>
      </div>
    </main>
  );
}