import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { articles } from '@/utils/blogData';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params; // Wajib di-await
  const article = articles[resolvedParams.slug];
  
  if (!article) return { title: '404 - Artikel Tidak Ditemukan' };
  
  return {
    title: `${article.title} | Blog PDFGuerrilla`,
    description: article.excerpt
  };
}

export default async function BlogPage({ params }: Props) {
  const resolvedParams = await params; // Wajib di-await di sini juga
  const article = articles[resolvedParams.slug];

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Artikel Hilang? 🤔</h1>
        <p className="text-gray-600 mb-8">Maaf, artikel yang Anda cari tidak ditemukan atau URL salah.</p>
        <Link href="/blog" className="bg-red-600 text-white px-6 py-3 rounded-full font-bold hover:bg-red-700 transition">
          Kembali ke Daftar Blog
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/blog" className="inline-flex items-center text-gray-500 hover:text-red-600 mb-8 transition font-medium group">
        <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Kembali ke Tips & Trik
      </Link>
      
      <article className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
        {/* Header Artikel */}
        <header className="mb-8 border-b border-gray-100 pb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                {article.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="font-semibold text-red-600 bg-red-50 px-3 py-1 rounded-full">{article.author}</span>
                <span>•</span>
                <span>{article.date}</span>
            </div>
        </header>
        
        {/* Isi Artikel (Render HTML) */}
        {/* Kita tambahkan class 'prose' dari Tailwind Typography plugin jika ada, atau styling manual sederhana */}
        <div 
          className="prose prose-lg prose-red max-w-none text-gray-700 leading-relaxed [&>p]:mb-4 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-8 [&>h2]:mb-4 [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5"
          dangerouslySetInnerHTML={{ __html: article.content }} 
        />
        
        {/* Kotak Call to Action di bawah */}
        <div className="mt-12 p-8 bg-gray-900 rounded-2xl text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">Punya File untuk Dikonversi?</h3>
            <p className="mb-6 text-gray-400">Coba tools kami sekarang. Gratis & Aman.</p>
            <div className="flex justify-center gap-4 flex-wrap">
                <Link href="/img-to-pdf" className="bg-red-600 px-6 py-2 rounded-lg font-bold hover:bg-red-500 transition shadow-lg shadow-red-900/20">
                  JPG ke PDF
                </Link>
                <Link href="/merge-pdf" className="bg-white text-gray-900 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition">
                  Merge PDF
                </Link>
            </div>
          </div>
          {/* Hiasan background */}
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-red-600 rounded-full opacity-20 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-blue-600 rounded-full opacity-20 blur-2xl"></div>
        </div>
      </article>
    </main>
  );
}