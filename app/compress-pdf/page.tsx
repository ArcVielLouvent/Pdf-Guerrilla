import CompressPdfLogic from '@/components/converters/CompressPdfLogic';

export const metadata = {
  title: 'Compress PDF Online Gratis | PDFGuerrilla',
  description: 'Kecilkan ukuran PDF Anda dengan menghapus data sampah tanpa mengurangi kualitas teks.',
};

export default function CompressPage() {
  return (
    <main className="py-20 px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Kompres PDF Aman</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Optimalkan file PDF Anda agar lebih ringan untuk diupload ke email atau portal pendaftaran.
        </p>
      </div>
      <CompressPdfLogic />
    </main>
  );
}