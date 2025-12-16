import { MetadataRoute } from 'next';
import { articles } from '@/utils/blogData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://pdfguerrilla.vercel.app/'; // GANTI URL INI dengan domain vercel kamu

  // Halaman Statis
  const routes = [
    '',
    '/img-to-pdf',
    '/merge-pdf',
    '/compress-pdf',
    '/edit-pdf',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Halaman Blog Dinamis
  const blogRoutes = Object.keys(articles).map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...routes, ...blogRoutes];
}