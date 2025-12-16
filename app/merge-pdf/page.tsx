import MergePdfLogic from '@/components/converters/MergePdfLogic';

export const metadata = {
  title: 'Merge PDF Gratis - Gabung PDF Online | PDFGuerrilla',
  description: 'Gabungkan banyak file PDF menjadi satu dokumen dengan urutan yang rapi. Gratis selamanya.',
};

export default function MergePdfPage() {
  return (
    <main className="py-20 px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Gabungkan PDF Online</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Satukan skripsi, laporan, atau dokumen penting Anda menjadi satu file utuh.
        </p>
      </div>
      <MergePdfLogic />
    </main>
  );
}