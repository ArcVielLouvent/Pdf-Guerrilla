'use client';
import { useState } from 'react';
import { PDFDocument, PageSizes } from 'pdf-lib';
import { sanitizePdf } from '@/utils/pdfSanitizer'; // Import helper tadi
import Dropzone from '../Dropzone'; // Pastikan path Dropzone benar
import { Download, Loader2, Layers, X, ArrowUp, ArrowDown, FileText, CheckCircle } from 'lucide-react';

export default function MergePdfLogic() {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState('Gabungkan PDF');

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files || [])]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const moveFile = (index: number, direction: 'up' | 'down') => {
    const newFiles = [...files];
    if (direction === 'up' && index > 0) {
      [newFiles[index], newFiles[index - 1]] = [newFiles[index - 1], newFiles[index]];
    } else if (direction === 'down' && index < newFiles.length - 1) {
      [newFiles[index], newFiles[index + 1]] = [newFiles[index + 1], newFiles[index]];
    }
    setFiles(newFiles);
  };

  const mergePDFs = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    setStatusText('Memulai proses...');

    try {
      const mergedPdf = await PDFDocument.create();

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setStatusText(`Memproses file ${i + 1} dari ${files.length}: ${file.name}`);
        
        let srcDoc;
        const fileBuffer = await file.arrayBuffer();

        try {
          srcDoc = await PDFDocument.load(fileBuffer);
        } catch (e) {
          console.warn(`File ${file.name} terkunci. Mencoba membuka paksa...`);
          setStatusText(`Membuka enkripsi file ${i + 1}... (Mohon tunggu)`);
          
          try {
            const sanitizedBytes = await sanitizePdf(file);
            srcDoc = await PDFDocument.load(sanitizedBytes);
          } catch (sanitizeError) {
            console.error(sanitizeError);
            alert(`Gagal memproses file: ${file.name}. File rusak atau password terlalu kuat.`);
            setIsProcessing(false);
            setStatusText('Gagal');
            return;
          }
        }
        
        const indices = srcDoc.getPageIndices();
        const embeddedPages = await mergedPdf.embedPages(srcDoc as any, indices as any);

        for (const embeddedPage of embeddedPages) {
           const originalDims = embeddedPage.scale(1);
           
           const isLandscape = originalDims.width > originalDims.height;

           let targetWidth = PageSizes.A4[0];
           let targetHeight = PageSizes.A4[1];

           if (isLandscape) {
             targetWidth = PageSizes.A4[1];
             targetHeight = PageSizes.A4[0];
           }

           const newPage = mergedPdf.addPage([targetWidth, targetHeight]);

           const widthRatio = targetWidth / originalDims.width;
           const heightRatio = targetHeight / originalDims.height;
           const scaleFactor = Math.min(widthRatio, heightRatio);

           const finalWidth = originalDims.width * scaleFactor;
           const finalHeight = originalDims.height * scaleFactor;

           const x = (targetWidth - finalWidth) / 2;
           const y = (targetHeight - finalHeight) / 2;

           newPage.drawPage(embeddedPage, {
             x,
             y,
             width: finalWidth,
             height: finalHeight,
           });
        }
      }

      setStatusText('Finishing...');
      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `merged-result-${Date.now()}.pdf`;
      link.click();

    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan tak terduga.');
    } finally {
      setIsProcessing(false);
      setStatusText('Gabungkan PDF');
    }
  };

  // --- TAMPILAN UI ---
  return (
     <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-100 max-w-4xl mx-auto mt-10">
      
      {/* Header */}
       <div className="flex items-center justify-center mb-6">
        <div className="bg-purple-100 p-3 rounded-full">
          <Layers className="text-purple-600 w-8 h-8" />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Gabungkan & Rapikan PDF</h2>
      <p className="text-center text-gray-500 mb-8">
        Fitur Pro: Auto-Unlock file terkunci & Auto-Fit ke ukuran A4.
      </p>

      {/* Upload Box */}
      <div className="border-2 border-dashed border-purple-200 rounded-2xl p-8 text-center bg-purple-50/50 hover:bg-purple-50 transition cursor-pointer relative mb-8 group">
        <input 
          type="file" 
          multiple 
          accept=".pdf" 
          onChange={handleFiles}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div className="group-hover:scale-105 transition-transform duration-200">
            <Layers className="mx-auto h-12 w-12 text-purple-400 mb-4" />
            <p className="text-purple-900 font-bold text-lg">Klik untuk tambah file PDF</p>
            <p className="text-sm text-purple-600 mt-2">Bisa pilih banyak sekaligus</p>
        </div>
      </div>

      {/* List File */}
      {files.length > 0 && (
        <div className="space-y-3 mb-8 bg-gray-50 p-4 rounded-xl border border-gray-200">
          <div className="flex justify-between items-center mb-2">
             <p className="text-sm font-bold text-gray-700">Urutan File ({files.length}):</p>
             <button onClick={() => setFiles([])} className="text-xs text-red-500 hover:underline">Hapus Semua</button>
          </div>
          
          {files.map((f, i) => (
            <div key={i} className="flex items-center justify-between bg-white border border-gray-200 p-3 rounded-lg shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-3 overflow-hidden flex-1">
                <span className="bg-gray-800 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full shrink-0 font-mono">
                  {i + 1}
                </span>
                <div className="flex items-center gap-2 truncate">
                    <FileText size={16} className="text-blue-500 shrink-0"/>
                    <span className="truncate text-sm text-gray-700 font-medium">{f.name}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-1 ml-2">
                <button 
                  onClick={() => moveFile(i, 'up')} 
                  disabled={i === 0}
                  title="Naikkan urutan"
                  className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded disabled:opacity-30"
                >
                  <ArrowUp size={16} />
                </button>
                <button 
                  onClick={() => moveFile(i, 'down')} 
                  disabled={i === files.length - 1}
                  title="Turunkan urutan"
                  className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded disabled:opacity-30"
                >
                  <ArrowDown size={16} />
                </button>
                <div className="w-px h-4 bg-gray-300 mx-1"></div>
                <button 
                  onClick={() => removeFile(i)}
                  title="Hapus file ini"
                  className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Action Button */}
      {files.length > 0 && (
         <button
          onClick={mergePDFs}
          disabled={isProcessing}
          className="w-full flex justify-center items-center gap-3 bg-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-purple-700 transition shadow-lg hover:shadow-purple-600/30 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isProcessing ? <Loader2 className="animate-spin" /> : <Download size={24} />}
          {statusText}
        </button>
      )}
     </div>
  );
}