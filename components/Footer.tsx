export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-bold mb-4">PDFGuerrilla</h3>
          <p className="text-gray-400 text-sm">
            Tools PDF gratis tanpa server. Privasi terjaga karena file diproses di browser Anda.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Tools Populer</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="/img-to-pdf" className="hover:text-white">JPG ke PDF</a></li>
            <li><a href="/merge-pdf" className="hover:text-white">Gabung PDF</a></li>
            <li><a href="/word-to-pdf" className="hover:text-white">Word ke PDF</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Legal</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="text-center text-gray-500 text-xs mt-10">
        &copy; {new Date().getFullYear()} PDFGuerrilla. 100% Client-Side Processing.
      </div>
    </footer>
  );
}