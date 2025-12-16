import EditPdfLogic from '@/components/converters/EditPdfLogic';

export const metadata = {
  title: 'Edit PDF Tambah Teks Gratis | PDFGuerrilla',
  description: 'Tambahkan teks, nama, atau watermark pada file PDF Anda secara online tanpa aplikasi.',
};

export default function EditPage() {
  return (
    <main className="py-20 px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Edit PDF Online</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Isi formulir atau tambahkan catatan pada dokumen PDF langsung dari browser.
        </p>
      </div>
      <EditPdfLogic />
    </main>
  );
}