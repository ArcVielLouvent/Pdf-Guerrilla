'use client';
import { useState, useEffect } from 'react';
import { renderAsync } from 'docx-preview';
import Dropzone from '../Dropzone';
import { FileType, Printer, X, FileText, Minus, Plus, RefreshCw } from 'lucide-react';

export default function WordToPdfLogic() {
  const [file, setFile] = useState<File | null>(null);
  const [scale, setScale] = useState(100); // Default skala 100%

  const previewWord = async () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const arrayBuffer = event.target?.result as ArrayBuffer;
        const container = document.getElementById('word-preview-container');
        
        if (container) {
          container.innerHTML = ''; 
          await renderAsync(arrayBuffer, container, undefined, {
            className: 'docx-content', 
            inWrapper: false,
            ignoreWidth: false, 
            ignoreHeight: false,
            experimental: true,
            useBase64URL: true
          });
        }
      } catch (e) {
        console.error(e);
        alert("Gagal membaca file.");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    if (file) {
      previewWord();
    }
  }, [file]);

  return (
    <>
      <style jsx global>{`
        /* --- TAMPILAN PRATINJAU --- */
        .docx-content {
          background: white;
          /* Paksa font agar tidak raksasa */
          font-size: 11pt !important; 
          line-height: 1.2 !important;
        }
        
        /* Wadah kertas A4 di layar */
        #paper-simulation {
          width: 210mm; /* Lebar A4 Pas */
          min-height: 297mm;
          padding: 20mm; /* Simulasi margin Word */
          background: white;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          margin: 0 auto;
          overflow: hidden;
          /* Logika Skala User */
          transform: scale(${scale / 100});
          transform-origin: top center;
          transition: transform 0.2s ease;
        }

        /* --- TAMPILAN SAAT PRINT (PDF) --- */
        @media print {
          /* 1. Sembunyikan UI Website */
          body * {
            visibility: hidden;
            height: auto;
          }

          /* 2. Tampilkan Kertas Saja */
          #print-area-wrapper, #print-area-wrapper * {
            visibility: visible;
          }

          #print-area-wrapper {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 0;
          }

          /* 3. Terapkan Skala Pilihan User ke Hasil Print */
          #paper-simulation {
            box-shadow: none;
            margin: 0;
            /* Margin 0 karena margin diatur di @page */
            padding: 0 !important; 
            width: 100% !important;
            transform: scale(${scale / 100}) !important;
            transform-origin: top left !important;
          }

          /* 4. Mencegah Halaman Kosong Extra */
          html, body {
            height: 100%;
            overflow: hidden;
            margin: 0;
          }

          /* 5. CSS Ajaib Penahan Page Break */
          p, tr, td, li, h1, h2, h3 {
            break-inside: avoid;
            page-break-inside: avoid;
          }
          
          img {
            max-width: 100% !important;
            height: auto !important;
          }

          /* 6. Setting Halaman Browser */
          @page {
            size: A4 portrait;
            margin: 0mm; /* Kita atur margin sendiri lewat skala */
          }
        }
      `}</style>

      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-100 max-w-6xl mx-auto mt-10 print:shadow-none print:border-0 print:p-0">
        
        {/* Header UI */}
        <div className="flex items-center justify-between mb-6 print:hidden">
          <div className="flex items-center gap-3">
            <div className="bg-blue-900 p-2 rounded-lg">
              <FileType className="text-white w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Word ke PDF</h2>
          </div>
          {file && (
             <button 
               onClick={() => { setFile(null); setScale(100); }}
               className="text-gray-400 hover:text-red-500 transition"
             >
               <X size={24} />
             </button>
          )}
        </div>

        {/* Upload Area */}
        {!file && (
          <div className="print:hidden">
            <Dropzone 
              label="Upload file .docx" 
              accept={{ 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] }} 
              onFileAccepted={setFile} 
            />
          </div>
        )}

        {/* Preview & Control Area */}
        {file && (
          <div>
            {/* TOOLBAR KONTROL (Penting!) */}
            <div className="sticky top-20 z-40 bg-white/90 backdrop-blur border border-gray-200 shadow-sm p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4 mb-8 print:hidden">
               
               <div className="flex items-center gap-4 w-full md:w-auto">
                 <div className="bg-gray-100 p-2 rounded-lg flex items-center gap-3">
                    <button onClick={() => setScale(s => Math.max(50, s - 5))} className="p-1 hover:bg-gray-200 rounded"><Minus size={16}/></button>
                    <span className="font-mono font-bold w-12 text-center">{scale}%</span>
                    <button onClick={() => setScale(s => Math.min(150, s + 5))} className="p-1 hover:bg-gray-200 rounded"><Plus size={16}/></button>
                 </div>
                 <p className="text-xs text-gray-500 leading-tight max-w-[200px]">
                   <b>Tips:</b> Jika halaman berlebih, kurangi % skala sampai muat jadi 1 halaman.
                 </p>
               </div>
               
               <button
                onClick={handlePrint}
                className="w-full md:w-auto flex items-center justify-center gap-2 bg-blue-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-800 transition shadow-lg"
              >
                <Printer size={20} />
                Cetak ke PDF
              </button>
            </div>

            {/* AREA PREVIEW (Simulasi Kertas) */}
            <div className="bg-gray-100 p-4 md:p-10 overflow-auto border-t border-gray-200 print:bg-white print:p-0 print:border-0">
               <div id="print-area-wrapper">
                  {/* Ini adalah Kertas A4 */}
                  <div id="paper-simulation">
                     <div id="word-preview-container"></div>
                  </div>
               </div>
            </div>
            
          </div>
        )}
      </div>
    </>
  );
}