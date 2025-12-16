'use client';
import { useState } from 'react';
import jsPDF from 'jspdf';
import Dropzone from '../Dropzone';
import { Download, Loader2, Image as ImageIcon, CheckCircle } from 'lucide-react';

export default function JpgToPdfLogic() {
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);

  const processConversion = async () => {
    if (!file) return;
    setIsConverting(true);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = (event) => {
        const imgData = event.target?.result as string;
        
        const img = new Image();
        img.src = imgData;

        img.onload = () => {
          const imgWidth = img.width;
          const imgHeight = img.height;

          const orientation = imgWidth > imgHeight ? 'l' : 'p';

          const pdf = new jsPDF({
            orientation: orientation,
            unit: 'mm',
            format: 'a4'
          });

          const pageWidth = pdf.internal.pageSize.getWidth();
          const pageHeight = pdf.internal.pageSize.getHeight();

          const widthRatio = pageWidth / imgWidth;
          const heightRatio = pageHeight / imgHeight;
          const scaleFactor = Math.min(widthRatio, heightRatio);

          const finalWidth = imgWidth * scaleFactor;
          const finalHeight = imgHeight * scaleFactor;

          const x = (pageWidth - finalWidth) / 2;
          const y = (pageHeight - finalHeight) / 2;

          pdf.addImage(imgData, 'JPEG', x, y, finalWidth, finalHeight);
          
          pdf.save(`${file.name.split('.')[0]}-converted.pdf`);
          setIsConverting(false);
        };
      };
    } catch (error) {
      console.error(error);
      setIsConverting(false);
      alert('Gagal konversi.');
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 max-w-2xl mx-auto mt-10">
      <div className="flex items-center justify-center mb-6">
        <div className="bg-blue-100 p-3 rounded-full">
          <ImageIcon className="text-blue-600 w-8 h-8" />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Konversi Gambar ke PDF</h2>
      <p className="text-center text-gray-500 mb-8">
        Otomatis menyesuaikan kertas A4 (Landscape/Portrait).
      </p>

      {!file ? (
        <Dropzone 
          label="Seret gambar ke sini" 
          accept={{ 'image/*': ['.jpeg', '.jpg', '.png'] }} 
          onFileAccepted={setFile} 
        />
      ) : (
        <div className="text-center bg-gray-50 p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-center gap-2 mb-4 text-green-600">
            <CheckCircle size={20} />
            <p className="text-lg font-medium truncate max-w-xs">{file.name}</p>
          </div>
          
          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => setFile(null)}
              className="px-6 py-2 text-gray-600 font-semibold hover:bg-gray-200 rounded-lg transition"
            >
              Ganti File
            </button>
            <button
              onClick={processConversion}
              disabled={isConverting}
              className="flex items-center gap-2 bg-blue-600 text-white px-8 py-2 rounded-lg font-bold hover:bg-blue-700 transition disabled:opacity-50 shadow-lg hover:shadow-blue-600/30"
            >
              {isConverting ? <Loader2 className="animate-spin" /> : <Download size={20} />}
              {isConverting ? 'Memproses...' : 'Download PDF'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}