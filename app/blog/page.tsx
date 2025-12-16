import Link from 'next/link';
import { articles } from '@/utils/blogData'; // Import data dari file utils
import { ArrowRight, Calendar, BookOpen } from 'lucide-react';

export const metadata = {
  title: 'Blog & Tutorial PDF | PDFGuerrilla',
  description: 'Tips produktivitas mengelola dokumen PDF.',
};

export default function BlogIndex() {
  // Ubah object data menjadi array agar bisa di-loop
  const articleList = Object.entries(articles).map(([slug, data]) => ({
    slug,
    ...data
  }));

  return (
    <main className="py-20 px-4 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Tips & Trik</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Panduan singkat mengelola dokumen tanpa aplikasi berbayar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articleList.map((article) => (
            <Link 
              key={article.slug} 
              href={`/blog/${article.slug}`} // Link dinamis ke slug
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full group"
            >
              <div className="mb-6 bg-red-50 w-12 h-12 rounded-xl flex items-center justify-center">
                <BookOpen className="text-red-600" size={24} />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors line-clamp-2">
                {article.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-6 flex-grow line-clamp-3">
                {article.excerpt}
              </p>
              
              <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-auto">
                <div className="flex items-center text-gray-400 text-xs gap-1">
                  <Calendar size={14} />
                  {article.date}
                </div>
                <div className="flex items-center text-sm font-bold text-red-600 group-hover:translate-x-2 transition-transform">
                  Baca Artikel <ArrowRight size={16} className="ml-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}