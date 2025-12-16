'use client';
import { useDropzone } from 'react-dropzone';
import { UploadCloud } from 'lucide-react';

interface DropzoneProps {
  onFileAccepted: (file: File) => void;
  accept: Record<string, string[]>;
  label: string;
}

export default function Dropzone({ onFileAccepted, accept, label }: DropzoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onFileAccepted(acceptedFiles[0]);
      }
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all
      ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
    >
      <input {...getInputProps()} />
      <UploadCloud className="mx-auto h-12 w-12 text-gray-400 mb-4" />
      <p className="text-lg font-semibold text-gray-700">{label}</p>
      <p className="text-sm text-gray-500 mt-2">atau seret file ke sini</p>
    </div>
  );
}