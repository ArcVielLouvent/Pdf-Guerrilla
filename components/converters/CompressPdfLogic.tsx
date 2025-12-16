'use client';
import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import Dropzone from '../Dropzone';
import { Zap, Download, Loader2, FileText, CheckCircle } from 'lucide-react';

export default function CompressPdfLogic() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [compressedPdf, setCompressedPdf] = useState<Uint8Array | null>(null);
  const [stats, setStats] = useState<{ original: string, new: string, percent: string } | null>(null);

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const compressPDF = async () => {
    if (!file) return;
    setIsProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      
      const pdfBytes = await pdfDoc.save({ useObjectStreams: false });
      
      setCompressedPdf(pdfBytes);
      
      const originalSize = file.size;
      const newSize = pdfBytes.byteLength;
      const reduction = ((originalSize - newSize) / originalSize) * 100;

      setStats({
        original: formatSize(originalSize),
        new: formatSize(newSize),
        percent: reduction > 0 ? reduction.toFixed(1) + '%' : '0%'
      });

    } catch (error) {
      console.error(error);
      alert('Gagal memproses file.');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadFile = () => {
    if (!compressedPdf || !file) return;
    const blob = new Blob([compressedPdf as any], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `compressed-${file.name}`;
    link.click();
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 max-w-2xl mx-auto mt-10">
      <div className="flex items-center justify-center mb-6">
        <div className="bg-yellow-100 p-3 rounded-full">
          <Zap className="text-yellow-600 w-8 h-8" />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Compress PDF Lite</h2>
      <p className="text-center text-gray-500 mb-8">
        Membersihkan metadata & struktur file yang tidak perlu.
      </p>

      {!file ? (
        <Dropzone 
            label="Upload PDF untuk dikompres" 
            accept={{ 'application/pdf': ['.pdf'] }} 
            onFileAccepted={setFile} 
        />
      ) : (
        <div className="text-center">
            {!compressedPdf ? (
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <FileText className="text-gray-400"/>
                        <p className="font-medium text-gray-700">{file.name}</p>
                        <span className="text-xs bg-gray-200 px-2 py-1 rounded text-gray-600">{formatSize(file.size)}</span>
                    </div>
                    <button
                        onClick={compressPDF}
                        disabled={isProcessing}
                        className="w-full flex justify-center items-center gap-2 bg-yellow-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-yellow-600 transition shadow-lg"
                    >
                        {isProcessing ? <Loader2 className="animate-spin" /> : <Zap size={20} />}
                        {isProcessing ? 'Sedang Mengompres...' : 'Mulai Kompresi'}
                    </button>
                    <button onClick={() => setFile(null)} className="mt-4 text-sm text-gray-400 hover:text-red-500">Batal</button>
                </div>
            ) : (
                <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                    <div className="mb-6">
                        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
                        <h3 className="text-xl font-bold text-green-800">Berhasil!</h3>
                        <p className="text-green-600 text-sm">File Anda lebih efisien.</p>
                    </div>

                    <div className="flex justify-center gap-8 mb-6 text-sm">
                        <div>
                            <p className="text-gray-500">Awal</p>
                            <p className="font-bold text-gray-700 line-through">{stats?.original}</p>
                        </div>
                        <div className="text-green-600 font-bold flex flex-col justify-center">
                            <span>↘ {stats?.percent}</span>
                        </div>
                        <div>
                            <p className="text-gray-500">Hasil</p>
                            <p className="font-bold text-green-700">{stats?.new}</p>
                        </div>
                    </div>

                    <button
                        onClick={downloadFile}
                        className="w-full flex justify-center items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition shadow-lg"
                    >
                        <Download size={20} /> Download PDF
                    </button>
                    <button onClick={() => { setFile(null); setCompressedPdf(null); }} className="mt-4 text-sm text-gray-400 hover:text-green-600">Kompres Lainnya</button>
                </div>
            )}
        </div>
      )}
    </div>
  );
}