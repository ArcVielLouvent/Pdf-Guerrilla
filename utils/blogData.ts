// Database Artikel Sederhana
export const articles: Record<string, { title: string; excerpt: string; content: string; date: string; author: string }> = {
  
  // Artikel 1
  'cara-ubah-jpg-ke-pdf': {
    title: 'Cara Mengubah Foto KTP/Ijazah ke PDF di HP',
    excerpt: 'Panduan cepat mengubah file gambar (JPG/PNG) menjadi PDF untuk keperluan administrasi.',
    date: '14 Oktober 2023',
    author: 'Admin',
    content: `
      <p class="mb-4">Seringkali saat melamar kerja atau mendaftar CPNS, kita diminta mengupload dokumen dalam format PDF, padahal kita hanya punya foto (JPG) dari HP.</p>
      <h2 class="text-2xl font-bold mt-6 mb-4">Cara Menggunakan PDFGuerrilla</h2>
      <ol class="list-decimal pl-5 space-y-2 mb-6">
        <li>Buka fitur <a href="/img-to-pdf" class="text-blue-600 font-bold hover:underline">JPG ke PDF</a>.</li>
        <li>Klik area upload atau seret foto KTP/Ijazah Anda.</li>
        <li>Aplikasi akan otomatis mendeteksi ukuran gambar.</li>
        <li>Klik tombol <strong>Download PDF</strong>.</li>
      </ol>
      <p>Kelebihannya, file Anda tidak akan pecah dan ukurannya pas dengan gambar asli.</p>
    `
  },

  // Artikel 2
  'cara-gabung-pdf-skripsi': {
    title: 'Solusi Skripsi: Cara Menggabungkan Banyak PDF Jadi Satu',
    excerpt: 'Jangan bingung saat Bab 1, Bab 2, dan Lampiran terpisah. Satukan semuanya di sini.',
    date: '15 Oktober 2023',
    author: 'Tim Teknis',
    content: `
      <p class="mb-4">Mahasiswa tingkat akhir pasti paham betapa ribetnya mengurus file skripsi yang terpisah-pisah. Bab 1 file sendiri, Bab 2 sendiri, Daftar Pustaka sendiri.</p>
      <h2 class="text-2xl font-bold mt-6 mb-4">Cara Menggabungkan (Merge) PDF</h2>
      <p class="mb-4">Anda tidak perlu install aplikasi berat. Cukup gunakan browser:</p>
      <ul class="list-disc pl-5 space-y-2 mb-6">
        <li>Masuk ke menu <a href="/merge-pdf" class="text-blue-600 font-bold hover:underline">Merge PDF</a>.</li>
        <li>Pilih semua file bab skripsi Anda sekaligus.</li>
        <li>Urutan bisa dipastikan lewat nama file (sebaiknya beri nama 01-Bab1, 02-Bab2).</li>
        <li>Klik tombol <strong>Gabungkan PDF</strong>.</li>
      </ul>
      <p>Selesai! File siap diupload ke sistem kampus.</p>
    `
  },

  // Artikel 3 (Pengganti Word to PDF)
  'keamanan-data-pdf': {
    title: 'Kenapa Convert PDF di Website Ini Lebih Aman?',
    excerpt: 'Penjelasan teknis mengapa data Anda 100% aman dan tidak bisa dicuri orang lain.',
    date: '16 Oktober 2023',
    author: 'Security Expert',
    content: `
      <p class="mb-4">Banyak orang takut mengupload dokumen sensitif (KTP, KK, Surat Tanah) ke website converter online gratisan. Takut datanya disimpan di server mereka.</p>
      <h2 class="text-2xl font-bold mt-6 mb-4">Rahasia Teknologi "Client-Side"</h2>
      <p class="mb-4">PDFGuerrilla dibangun dengan teknologi <em>WebAssembly</em> dan <em>JavaScript Client-Side</em>.</p>
      <div class="bg-green-50 p-4 border-l-4 border-green-500 mb-6">
        <strong>Artinya:</strong> Ketika Anda memilih file, file itu TIDAK DIKIRIM ke internet. File itu hanya diproses oleh chip prosesor di HP/Laptop Anda sendiri.
      </div>
      <p>Jadi, meskipun internet Anda mati saat proses konversi, aplikasi ini tetap bisa berjalan! Privasi Anda adalah prioritas kami.</p>
    `
  }
};