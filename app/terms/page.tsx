import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service | PDFGuerrilla',
};

export default function TermsPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 prose prose-gray">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">1. Acceptance of Terms</h2>
        <p>
          By accessing and using PDFGuerrilla, you accept and agree to be bound by the terms and provision of this agreement.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">2. Use of License</h2>
        <p>
          PDFGuerrilla grants you a personal, non-exclusive, non-transferable license to use the software provided on this website for personal or commercial purposes.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">3. Disclaimer ("As Is")</h2>
        <p className="mb-4">
          The materials on PDFGuerrilla's website are provided on an 'as is' basis. PDFGuerrilla makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability.
        </p>
        <p>
          While we strive for perfection, we are not liable for any data loss or corruption that may occur during the conversion process (though highly unlikely due to client-side processing).
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">4. Limitations</h2>
        <p>
          In no event shall PDFGuerrilla or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit) arising out of the use or inability to use the materials on this website.
        </p>
      </section>

      <div className="mt-12 pt-8 border-t border-gray-200">
        <Link href="/" className="text-blue-600 hover:underline">Back to Home</Link>
      </div>
    </main>
  );
}