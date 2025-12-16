import Link from 'next/link';
import { Mail } from 'lucide-react';

export const metadata = {
  title: 'Contact Us | PDFGuerrilla',
};

export default function ContactPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
        <Mail className="text-blue-600 w-8 h-8" />
      </div>
      
      <h1 className="text-3xl font-bold mb-4 text-gray-900">Get in Touch</h1>
      <p className="text-gray-600 mb-8">
        Have questions, suggestions, or found a bug? We'd love to hear from you.
      </p>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        <p className="text-sm text-gray-500 mb-2">Email Support</p>
        {/* Ganti dengan emailmu, boleh email gmail biasa */}
        <a href="armandalfarizy96@gmail.com" className="text-xl font-bold text-blue-600 hover:underline">
          contact.pdfguerrilla@gmail.com
        </a>
        <p className="text-xs text-gray-400 mt-4">
          We usually reply within 24-48 hours.
        </p>
      </div>

      <div className="mt-12">
         <Link href="/" className="text-gray-500 hover:text-gray-900 font-medium">
           &larr; Back to Tools
         </Link>
      </div>
    </main>
  );
}