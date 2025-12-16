import Link from 'next/link';
import { FileText, ShieldCheck, Zap } from 'lucide-react';

export const metadata = {
  title: 'About Us | PDFGuerrilla',
};

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">About PDFGuerrilla</h1>
      
      <div className="text-lg text-gray-600 mb-10 leading-relaxed">
        <p className="mb-4">
          PDFGuerrilla was born from a simple frustration: <strong>Why do we have to upload our private documents to a server just to convert or merge them?</strong>
        </p>
        <p>
          Traditional PDF tools require you to upload files, wait for processing, and download them again. This is slow, eats up bandwidth, and raises privacy concerns.
        </p>
        <p>
          We decided to build something different. Using advanced <strong>WebAssembly</strong> technology, PDFGuerrilla processes your files right inside your browser. Your data never leaves your device. It's faster, safer, and completely free.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <ShieldCheck className="text-blue-600 w-8 h-8 mb-3" />
            <h3 className="font-bold text-gray-800">Privacy First</h3>
            <p className="text-sm text-gray-600">No server uploads. Your secrets stay yours.</p>
        </div>
        <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-100">
            <Zap className="text-yellow-600 w-8 h-8 mb-3" />
            <h3 className="font-bold text-gray-800">Lightning Fast</h3>
            <p className="text-sm text-gray-600">Zero latency. Instant conversion.</p>
        </div>
        <div className="bg-green-50 p-6 rounded-xl border border-green-100">
            <FileText className="text-green-600 w-8 h-8 mb-3" />
            <h3 className="font-bold text-gray-800">100% Free</h3>
            <p className="text-sm text-gray-600">Supported by ads, free for everyone.</p>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-8">
        <Link href="/" className="bg-red-600 text-white px-6 py-3 rounded-full font-bold hover:bg-red-700 transition">
          Try Our Tools
        </Link>
      </div>
    </main>
  );
}