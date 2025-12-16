import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <h3 className="text-lg font-bold mb-4">PDFGuerrilla</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            The ultimate client-side PDF tool suite. Fast, secure, and free forever. 
            Processing happens in your browser.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-4">Tools</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><Link href="/img-to-pdf" className="hover:text-white transition">JPG to PDF</Link></li>
            <li><Link href="/merge-pdf" className="hover:text-white transition">Merge PDF</Link></li>
            <li><Link href="/compress-pdf" className="hover:text-white transition">Compress PDF</Link></li>
            <li><Link href="/edit-pdf" className="hover:text-white transition">Edit PDF</Link></li>
          </ul>
        </div>

        {/* Legal Pages (WAJIB ADA) */}
        <div>
          <h3 className="text-lg font-bold mb-4">Legal & Support</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white transition">Contact Us</Link></li>
            <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white transition">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="text-center text-gray-600 text-xs mt-12 pt-8 border-t border-gray-800">
        &copy; {new Date().getFullYear()} PDFGuerrilla. All rights reserved.
      </div>
    </footer>
  );
}