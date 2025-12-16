import Link from 'next/link';
import { Image as ImageIcon, Layers, Zap, PenTool, ShieldCheck, CheckCircle, ArrowRight } from 'lucide-react';

export default function Home() {
  const tools = [
    {
      title: 'JPG ke PDF',
      desc: 'Ubah foto dokumen (KTP, Ijazah, CV) menjadi PDF siap kirim.',
      icon: <ImageIcon className="w-8 h-8 text-blue-600" />,
      href: '/img-to-pdf',
      color: 'bg-blue-50 hover:bg-blue-100 border-blue-100'
    },
    {
      title: 'Merge PDF',
      desc: 'Gabungkan banyak file PDF skripsi atau tugas menjadi satu file urut.',
      icon: <Layers className="w-8 h-8 text-purple-600" />,
      href: '/merge-pdf',
      color: 'bg-purple-50 hover:bg-purple-100 border-purple-100'
    },
    {
      title: 'Compress PDF',
      desc: 'Kecilkan ukuran file PDF agar hemat penyimpanan dan mudah diupload.',
      icon: <Zap className="w-8 h-8 text-yellow-600" />,
      href: '/compress-pdf',
      color: 'bg-yellow-50 hover:bg-yellow-100 border-yellow-100'
    },
    {
      title: 'Edit PDF',
      desc: 'Tambahkan teks, nama, atau tanda tangan pada halaman PDF.',
      icon: <PenTool className="w-8 h-8 text-green-600" />,
      href: '/edit-pdf',
      color: 'bg-green-50 hover:bg-green-100 border-green-100'
    }
  ];

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50/50">
      
      {/* --- HERO SECTION --- */}
      <div className="w-full bg-white border-b border-gray-100 pt-24 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold mb-6 border border-red-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            100% Gratis & Tanpa Server
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
            Semua Alat PDF dalam <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">Satu Aplikasi Cepat</span>
          </h1>
          
          <p className="text-xl text-gray-500 mb-10 leading-relaxed max-w-2xl mx-auto">
            Kelola dokumen tanpa ribet. Privasi terjaga karena file Anda diproses langsung di browser, tidak pernah diupload ke cloud.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/img-to-pdf" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition shadow-lg hover:shadow-xl hover:-translate-y-1">
              Mulai Konversi JPG <ArrowRight size={18} />
            </Link>
            <Link href="/merge-pdf" className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-700 font-bold rounded-full border border-gray-200 hover:bg-gray-50 transition hover:border-gray-300">
              Gabung PDF
            </Link>
          </div>
        </div>
      </div>

      {/* --- TOOLS GRID --- */}
      <div className="py-20 px-4 w-full max-w-7xl">
        <div className="text-center mb-12">
           <h2 className="text-2xl font-bold text-gray-800">Pilih Alat yang Anda Butuhkan</h2>
        </div>
        
        <div id="tools" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <Link 
              key={index} 
              href={tool.href} 
              className={`block p-8 rounded-2xl border transition-all duration-300 hover:shadow-lg group ${tool.color}`}
            >
              <div className="mb-6 bg-white w-14 h-14 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                {tool.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{tool.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{tool.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* --- WHY US / SEO SECTION --- */}
      <div className="w-full bg-white border-t border-gray-100 py-20 px-4">
        <div className="max-w-5xl mx-auto">
           <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Kenapa PDFGuerrilla Berbeda?</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="mt-1"><ShieldCheck className="text-green-600 w-6 h-6" /></div>
                    <div>
                      <h4 className="font-bold text-gray-800">Privasi Level Tinggi</h4>
                      <p className="text-gray-600 text-sm mt-1">Kami menggunakan teknologi WebAssembly. File Anda tidak pernah meninggalkan perangkat Anda. Aman dari peretasan server.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="mt-1"><Zap className="text-yellow-600 w-6 h-6" /></div>
                    <div>
                      <h4 className="font-bold text-gray-800">Kecepatan Kilat</h4>
                      <p className="text-gray-600 text-sm mt-1">Tidak perlu menunggu proses upload dan download yang lama. Semuanya instan.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="mt-1"><CheckCircle className="text-blue-600 w-6 h-6" /></div>
                    <div>
                      <h4 className="font-bold text-gray-800">Gratis Selamanya</h4>
                      <p className="text-gray-600 text-sm mt-1">Tanpa batasan jumlah file, tanpa watermark, dan tanpa pendaftaran akun.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Tips & Trik Produktivitas</h3>
                <p className="text-gray-500 mb-6 text-sm">Pelajari cara mengelola dokumen digital agar kerja lebih efisien.</p>
                <Link href="/blog" className="inline-block w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition">
                  Baca Artikel Blog
                </Link>
              </div>
           </div>
        </div>
      </div>

    </main>
  );
}