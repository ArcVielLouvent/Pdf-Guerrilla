import Link from 'next/link';
import { FileText } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-red-600 p-2 rounded-lg text-white">
              <FileText size={24} />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              PDF<span className="text-red-600">Guerrilla</span>
            </span>
          </Link>

          <div className="hidden md:flex space-x-6">
            <Link href="/img-to-pdf" className="text-gray-600 hover:text-red-600 font-medium transition">Img to PDF</Link>
            <Link href="/merge-pdf" className="text-gray-600 hover:text-red-600 font-medium transition">Merge PDF</Link>
            <Link href="/compress-pdf" className="text-gray-600 hover:text-red-600 font-medium transition">Compress</Link>
            <Link href="/edit-pdf" className="text-gray-600 hover:text-red-600 font-medium transition">Edit PDF</Link>
          </div>
          
          <Link href="/blog" className="px-4 py-2 text-sm font-semibold text-red-600 border border-red-600 rounded-full hover:bg-red-50 transition">
            Tips & Trik
          </Link>
        </div>
      </div>
    </nav>
  );
}