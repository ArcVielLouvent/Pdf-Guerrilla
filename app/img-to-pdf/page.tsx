import JpgToPdfLogic from '@/components/converters/JpgToPdfLogic';

export const metadata = {
  title: 'JPG to PDF Converter Gratis | PDFGuerrilla',
  description: 'Ubah gambar JPG/PNG menjadi file PDF dalam hitungan detik. Tanpa watermark, tanpa upload server.',
};

export default function ImgToPdfPage() {
  return (
    <main className="py-20 px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Konverter JPG ke PDF</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Alat tercepat untuk mengubah kumpulan foto menjadi dokumen PDF. Privasi 100% aman.
        </p>
      </div>
      <JpgToPdfLogic />
    </main>
  );
}