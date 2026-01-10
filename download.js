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
