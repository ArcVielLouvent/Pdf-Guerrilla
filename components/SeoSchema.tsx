export const SeoSchema = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "PDFGuerrilla",
    "url": "http://localhost:3000",
    "description": "Tools PDF Gratis Tanpa Batas. Konversi, gabung, dan edit PDF langsung di browser Anda.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://pdfguerrilla.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      suppressHydrationWarning={true}
    />
  );
};