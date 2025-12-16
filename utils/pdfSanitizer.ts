import * as pdfjsLib from 'pdfjs-dist';
import { PDFDocument } from 'pdf-lib';

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

export const sanitizePdf = async (file: File): Promise<Uint8Array> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    
    const loadingTask = pdfjsLib.getDocument(new Uint8Array(arrayBuffer));
    const pdfDoc = await loadingTask.promise;
    
    const newPdfDoc = await PDFDocument.create();

    for (let i = 1; i <= pdfDoc.numPages; i++) {
      const page = await pdfDoc.getPage(i);
      
      const viewport = page.getViewport({ scale: 2.0 });
      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      
      const context = canvas.getContext('2d');
      if (!context) throw new Error('Canvas context failed');

      await page.render({
        canvasContext: context,
        viewport: viewport
      }as any).promise;

      const imgDataUrl = canvas.toDataURL('image/jpeg', 0.80);
      const imgBytes = await fetch(imgDataUrl).then(res => res.arrayBuffer());

      const jpgImage = await newPdfDoc.embedJpg(imgBytes);
      
      const jpgDims = jpgImage.scale(0.5); 

      const newPage = newPdfDoc.addPage([jpgDims.width, jpgDims.height]);
      newPage.drawImage(jpgImage, {
        x: 0,
        y: 0,
        width: jpgDims.width,
        height: jpgDims.height,
      });
    }

    return await newPdfDoc.save();
    
  } catch (error) {
    console.error("Sanitize failed:", error);
    throw new Error("Gagal membersihkan proteksi PDF.");
  }
};