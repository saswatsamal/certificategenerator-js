const userName = document.getElementById("name");
const userValidation = document.getElementById("validation");
const submitBtn = document.getElementById("submitBtn");
const { PDFDocument, rgb, degrees } = PDFLib;


submitBtn.addEventListener("click", () => {
    const val =userName.value;
    const val2 =userValidation.value;
    if (val.trim() !== "" && userName.checkValidity() && val2=="cdh2021wd") {
        generatePDF(val);
        text = "Downloading.";
      } 
      if(val.trim() == "" && val2.trim() == "" && val2!=="cdh2021wd"){
        text = "Enter your name and the correct Validation key";;
      }
      else if(val.trim() == ""){
        text = "Enter your name";;
      }
      else if(val2.trim() == "" && val2!=="cdh2021wd"){
        text = "Enter the correct Validation key";;
      }
      document.getElementById("alert").innerHTML = text;
});

const generatePDF = async (name) => {
    const existingPdfBytes = await fetch("./assets/certificate/CER-HCI-CM-2021-01-P.pdf").then((res) =>
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
       x: 150,
       y: 315,
       size: 40,
       font: Montserrat ,
       color: rgb(0.0, 0.0, 0.0),
     });
   
    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
    saveAs(pdfDataUri,name + " CER-HCI-CM-2021-01-P")
  };