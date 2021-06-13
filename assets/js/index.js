const userName = document.getElementById("name");
const submitBtn = document.getElementById("submitBtn");
const { PDFDocument, rgb, degrees } = PDFLib;

submitBtn.addEventListener("click", () => {
    const val =userName.value;
    if (val.trim() !== "" && userName.checkValidity()) {
        // console.log(val);
        generatePDF(val);
      } else {
        userName.reportValidity();
      }
});

const generatePDF = async (name) => {
    const existingPdfBytes = await fetch("./assets/certificate/Certificate.pdf").then((res) =>
      res.arrayBuffer()
    );

    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    pdfDoc.registerFontkit(fontkit);

    const fontBytes = await fetch("./assets/ttf/Montserrat-ExtraLight.ttf").then((res) =>
    res.arrayBuffer()
  );
    // Embed our custom font in the document
    const Montserrat  = await pdfDoc.embedFont(fontBytes);
     // Get the first page of the document
     const pages = pdfDoc.getPages();
     const firstPage = pages[0];
   
     // Draw a string of text diagonally across the first page
     firstPage.drawText(name, {
       x: 100,
       y: 315,
       size: 50,
       font: Montserrat ,
       color: rgb(1.0, 1.0, 1.0),
     });
   
    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
    saveAs(pdfDataUri,name + " CER-HCI-QZ-2021-01-P")
  };