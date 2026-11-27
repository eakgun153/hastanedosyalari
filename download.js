async function downloadZip(folderName, files, zipName) {
  const zip = new JSZip();
  const folder = zip.folder(folderName);

  for (const file of files) {
    const response = await fetch(`./${folderName}/${file}`);
    const blob = await response.blob();
    folder.file(file, blob);
  }

  const content = await zip.generateAsync({ type: "blob" });
  saveAs(content, zipName);
}

function downloadBelgematik() {
  downloadZip(
    "belgematik",
    [
      "BelgeMatik.xlsm",
      "fonetahkam(x4).docx",
      "istemsizyatis(x2).docx",
      "zorunlusk(x2).docx"
    ],
    "Belgematik_Dokumanlar.zip"
  );
}

function downloadDSMatik() {
  downloadZip(
    "dsmatik",
    [
      "DS Matik.xlsm",
      "dsMutalaSablon.docx"
    ],
    "DSMatik_Dokumanlar.zip"
  );
}

async function downloadDSTurbo() {
  const fileName = "DS_TURBO_V36.txt";
  const sources = [
    "./dsturbo/" + fileName,
    "https://raw.githubusercontent.com/eakgun153/hastanedosyalari/main/dsturbo/" + fileName
  ];

  for (const url of sources) {
    try {
      const response = await fetch(url, {
        cache: "no-store",
        credentials: "same-origin"
      });
      if (!response.ok) throw new Error("HTTP " + response.status);

      const blob = await response.blob();
      const code = (await blob.text()).trim();
      // HTML oturum ekranını, hata sayfalarını ve eksik/yanlış kodu indirme.
      if (!code.startsWith("(function () {") ||
          !code.endsWith("})();") ||
          !code.includes("fonetDSKayitBekleniyor") ||
          !code.includes("fonetMakroPanel") ||
          !code.includes("Fonet paneli hazır.")) {
        throw new Error("Geçerli DS Turbo V36 kodu alınamadı.");
      }

      // Orijinal baytları değiştirmeden doğrudan TXT olarak kaydet.
      saveAs(new Blob([blob], { type: "text/plain;charset=utf-8" }), fileName);
      return;
    } catch (error) {
      console.warn("DS Turbo indirme kaynağı başarısız:", url, error);
    }
  }
  alert("DS Turbo kodu indirilemedi. Lütfen tekrar giriş yapıp deneyin. Hatalı dosya kaydedilmedi.");
}
