'use client';
import { useState, useRef, useEffect } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import Dropzone from '../Dropzone';
import { PenTool, Download, Loader2, Type, X, AlertCircle, Plus, Minus, Move } from 'lucide-react';

// Setup Worker (Versi Stabil)
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

// Tipe Data untuk Teks yang ditambahkan
interface AddedText {
  id: number;
  text: string;
  x: number;
  y: number;
  fontSize: number; // Properti baru untuk ukuran font
}

export default function EditPdfLogic() {
  const [file, setFile] = useState<File | null>(null);
  const [textInput, setTextInput] = useState('');
  
  // State Utama
  const [addedTexts, setAddedTexts] = useState<AddedText[]>([]);
  const [selectedTextId, setSelectedTextId] = useState<number | null>(null);
  
  // State Dragging (Geser)
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [pdfScale, setPdfScale] = useState(1);
  const [viewportDims, setViewportDims] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!file) return;

    const renderPdf = async () => {
      try {
        setErrorMsg(null);
        const arrayBuffer = await file.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument(new Uint8Array(arrayBuffer));
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);

        const desiredWidth = Math.min(window.innerWidth - 40, 800);
        const viewportUnscaled = page.getViewport({ scale: 1 });
        const scale = desiredWidth / viewportUnscaled.width;
        setPdfScale(scale);

        const viewport = page.getViewport({ scale });
        setViewportDims({ width: viewport.width, height: viewport.height });

        const canvas = canvasRef.current;
        if (canvas) {
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const context = canvas.getContext('2d');
          if (context) {
            await page.render({ canvasContext: context, viewport }).promise;
          }
        }
      } catch (err: any) {
        console.error("Render Error:", err);
        setErrorMsg("Gagal menampilkan preview. Coba file lain.");
      }
    };
    renderPdf();
  }, [file]);

  const addTextOverlay = () => {
    if (!textInput) return;
    const newId = Date.now();
    setAddedTexts([...addedTexts, { 
      id: newId, 
      text: textInput, 
      x: 50, 
      y: 50,
      fontSize: 16 // Ukuran Default
    }]);
    setTextInput('');
    setSelectedTextId(newId); // Otomatis pilih teks baru
  };

  const handlePointerDown = (e: React.PointerEvent, id: number, currentX: number, currentY: number) => {
    e.preventDefault(); // Mencegah scrolling di HP
    e.stopPropagation();
    
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const pointerX = e.clientX - rect.left;
    const pointerY = e.clientY - rect.top;

    setDragOffset({
      x: pointerX - currentX,
      y: pointerY - currentY
    });

    setSelectedTextId(id);
    setIsDragging(true);
    
    // Capture pointer agar gerakan tetap terdeteksi meski keluar area div
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || selectedTextId === null) return;
    e.preventDefault();

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const pointerX = e.clientX - rect.left;
    const pointerY = e.clientY - rect.top;

    // Hitung posisi baru dikurangi offset awal
    const newX = pointerX - dragOffset.x;
    const newY = pointerY - dragOffset.y;

    setAddedTexts(prev => prev.map(t => 
      t.id === selectedTextId ? { ...t, x: newX, y: newY } : t
    ));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  // 4. Logika Resize Font
  const updateFontSize = (delta: number) => {
    if (selectedTextId === null) return;
    setAddedTexts(prev => prev.map(t => {
      if (t.id === selectedTextId) {
        // Batasi ukuran min 8 dan max 72
        const newSize = Math.max(8, Math.min(72, t.fontSize + delta));
        return { ...t, fontSize: newSize };
      }
      return t;
    }));
  };

  // 5. Simpan PDF
  const savePdf = async () => {
    if (!file) return;
    setIsProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
      
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const { height } = firstPage.getSize(); 

      addedTexts.forEach(item => {
        const pdfX = item.x / pdfScale;
        
        const pdfFontSize = item.fontSize / pdfScale; 
        const pdfY = height - (item.y / pdfScale) - (pdfFontSize * 0.8); 

        firstPage.drawText(item.text, {
          x: pdfX,
          y: pdfY,
          size: pdfFontSize, 
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `edited-${file.name}`;
      link.click();

    } catch (e) {
      console.error(e);
      alert('Gagal menyimpan PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const selectedTextObj = addedTexts.find(t => t.id === selectedTextId);

  return (
    <div className="bg-white p-4 md:p-6 rounded-3xl shadow-xl border border-gray-100 max-w-4xl mx-auto mt-6">
       <div className="flex items-center justify-center mb-4">
        <div className="bg-green-100 p-3 rounded-full">
          <PenTool className="text-green-600 w-8 h-8" />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Edit PDF</h2>
      <p className="text-center text-gray-500 mb-6 text-sm">Upload, ketik, geser, dan simpan.</p>

      {errorMsg && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 flex items-center gap-2 text-sm">
            <AlertCircle size={16} /> <p>{errorMsg}</p>
        </div>
      )}

      {!file ? (
        <Dropzone label="Upload PDF" accept={{ 'application/pdf': ['.pdf'] }} onFileAccepted={setFile} />
      ) : (
        <div>
            {/* --- TOOLBAR INPUT --- */}
            <div className="flex flex-col gap-3 mb-4 bg-gray-50 p-4 rounded-xl border border-gray-200 sticky top-16 z-20 shadow-sm">
                <div className="flex gap-2 w-full">
                    <input 
                        type="text" 
                        placeholder="Ketik teks baru..." 
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 outline-none"
                    />
                    <button onClick={addTextOverlay} className="bg-blue-600 text-white px-3 py-2 rounded-lg font-bold hover:bg-blue-700 flex items-center gap-1 text-sm">
                        <Type size={16}/> <span className="hidden sm:inline">Tambah</span>
                    </button>
                </div>

                {/* --- TOOLBAR EDITING (Muncul jika ada teks dipilih) --- */}
                {selectedTextId && selectedTextObj && (
                  <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-gray-200 animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider pl-1">Ukuran:</span>
                      <button onClick={() => updateFontSize(-2)} className="p-1 bg-gray-100 hover:bg-gray-200 rounded border border-gray-300">
                        <Minus size={16} className="text-gray-700"/>
                      </button>
                      <span className="text-sm font-mono w-6 text-center">{selectedTextObj.fontSize}</span>
                      <button onClick={() => updateFontSize(2)} className="p-1 bg-gray-100 hover:bg-gray-200 rounded border border-gray-300">
                        <Plus size={16} className="text-gray-700"/>
                      </button>
                    </div>
                    <div className="text-xs text-blue-600 flex items-center gap-1">
                      <Move size={12}/> Geser Teks
                    </div>
                  </div>
                )}
                
                <div className="flex gap-2 mt-2 pt-2 border-t border-gray-200">
                    <button onClick={() => setFile(null)} className="flex-1 py-2 text-sm text-gray-500 hover:text-red-500 bg-white border border-gray-300 rounded-lg hover:bg-red-50">Batal</button>
                    <button onClick={savePdf} disabled={isProcessing} className="flex-[2] py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 flex items-center justify-center gap-2 text-sm shadow-sm">
                        {isProcessing ? <Loader2 className="animate-spin" size={16}/> : <Download size={16}/>}
                        Simpan PDF
                    </button>
                </div>
            </div>

            {/* --- CANVAS AREA --- */}
            <div className="overflow-auto bg-gray-200/50 p-2 sm:p-4 rounded-xl border border-gray-200 touch-none">
                <div 
                    ref={containerRef}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerDown={() => setSelectedTextId(null)} 
                    className="relative mx-auto shadow-lg bg-white touch-none"
                    style={{ 
                        width: viewportDims.width || '100%', 
                        height: viewportDims.height || 400,
                        touchAction: 'none' 
                    }}
                >
                    <canvas ref={canvasRef} className="absolute top-0 left-0 pointer-events-none" />

                    {addedTexts.map((item) => (
                        <div
                            key={item.id}
                            onPointerDown={(e) => handlePointerDown(e, item.id, item.x, item.y)}
                            className={`absolute font-bold cursor-move select-none px-2 py-1 rounded transition-colors
                                ${selectedTextId === item.id 
                                    ? 'bg-blue-500/20 text-blue-900 border border-blue-500 z-50' 
                                    : 'text-gray-900 hover:bg-gray-100/50 border border-transparent'}
                            `}
                            style={{ 
                                left: item.x, 
                                top: item.y,
                                fontSize: `${item.fontSize}px`, // Ukuran font dinamis di layar
                                fontFamily: 'Helvetica, sans-serif',
                                lineHeight: 1,
                                touchAction: 'none' 
                            }}
                        >
                            {item.text}
                            
                            {/* Tombol Hapus (Hanya muncul jika dipilih) */}
                            {selectedTextId === item.id && (
                              <button 
                                  onPointerDown={(e) => {
                                      e.stopPropagation(); // Stop drag trigger
                                      setAddedTexts(prev => prev.filter(t => t.id !== item.id));
                                  }}
                                  className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center shadow-md hover:bg-red-700 z-50"
                              >
                                  <X size={14} />
                              </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            
            <p className="text-center text-xs text-gray-400 mt-4">
               Gunakan 2 jari untuk zoom layar jika teks terlalu kecil.
            </p>
        </div>
      )}
    </div>
  );
}