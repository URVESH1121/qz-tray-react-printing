// src/components/PrinterComponent.jsx
import React, { useEffect, useState } from "react";
import { configureQz, getPrinters } from "../qzConfig";
import qz from "qz-tray";
import { PDFDocument } from "pdf-lib";
import pdf from "../assests/Sample1.pdf";

const PrinterComponent = () => {
  const [printers, setPrinters] = useState([]);
  const [selectedPrinter, setSelectedPrinter] = useState("");

  useEffect(() => {
    const setupQz = async () => {
      await configureQz();
      await fetchPrinters();
    };

    setupQz();

    // return () => {
    //   disconnectQz();
    // };
  }, []);

  const fetchPrinters = async () => {
    const printerList = await getPrinters();
    setPrinters(printerList);
    if (printerList.length > 0) {
      setSelectedPrinter(printerList[0]); // Select the first printer by default
    }
  };

  const handlePrinterChange = (event) => {
    setSelectedPrinter(event.target.value);
  };

  const handlePrint = async () => {
    if (!selectedPrinter) {
      console.error("No printer selected");
      return;
    }

    const config = qz.configs.create(selectedPrinter);

    const pdfUrl = pdf; // Replace with your PDF file URL
    // const pdfUrl =
    //   "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"; // Replace with your PDF file URL
    try {
      const response = await fetch(pdfUrl);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch PDF: ${response.status} ${response.statusText}`
        );
      }
      const pdfBlob = await response.blob();
      const pdfArrayBuffer = await pdfBlob.arrayBuffer();
      const pdfUint8Array = new Uint8Array(pdfArrayBuffer);

      // Ensure the PDF header exists
      const pdfHeader = String.fromCharCode(...pdfUint8Array.slice(0, 5));
      if (pdfHeader !== "%PDF-") {
        throw new Error("The fetched data is not a valid PDF.");
      }

      // Load PDF and convert to base64
      const pdfDoc = await PDFDocument.load(pdfUint8Array);
      const pdfBytes = await pdfDoc.save();
      const base64String = btoa(String.fromCharCode(...pdfBytes));

      // Create raw print job
      const data = [{ type: "raw", format: "base64", data: base64String }];
      //   const data = [
      //     { type: 'raw', format: 'command', data: 'Hello, QZ!\n\n\n' }
      //   ];

      console.log("Attempting to print with config:", config);
      console.log("Data being sent:", data);
      await qz.print(config, data);
      alert("Print successful");
    } catch (err) {
      alert("Error fetching or printing PDF:", err);
    }
  };
  return (
    <div>
      <label htmlFor="printers">Select Printer:</label>
      <select
        id="printers"
        value={selectedPrinter}
        onChange={handlePrinterChange}
      >
        {printers.map((printer, index) => (
          <option key={index} value={printer}>
            {printer}
          </option>
        ))}
      </select>
      <button onClick={handlePrint}>Print</button>
    </div>
  );
};

export default PrinterComponent;
