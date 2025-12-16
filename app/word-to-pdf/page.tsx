import WordToPdfLogic from '@/components/converters/WordToPdfLogic';

export const metadata = {
  title: 'Word to PDF Converter | PDFGuerrilla',
  description: 'Konversi dokumen Word (docx) ke PDF secara gratis. Solusi cepat untuk surat lamaran kerja dan tugas.',
};

export default function WordToPdfPage() {
  return (
    <main className="py-20 px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Ubah Word ke PDF</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Simpan dokumen Word Anda menjadi format PDF yang siap cetak dan anti-berantakan.
        </p>
      </div>
      <WordToPdfLogic />
    </main>
  );
}