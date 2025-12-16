import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://pdf-guerrilla.vercel.app'; 

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/', // Opsional: jika ada folder rahasia
    },
    sitemap: `${baseUrl}/sitemap.xml`, // <--- INI KUNCINYA
  };
}