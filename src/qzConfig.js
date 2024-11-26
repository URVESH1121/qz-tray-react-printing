// src/qzConfig.js
import qz from "qz-tray";
import { sha256 } from "js-sha256";

const configureQz = async () => {
  qz.api.setPromiseType((resolver) => new Promise(resolver));
  qz.api.setSha256Type((data) => sha256(data));

  try {
    await qz.websocket.connect();
    console.log("Connected to QZ Tray");
  } catch (err) {
    console.error("Failed to connect to QZ Tray", err);
  }
};

const getPrinters = async () => {
  try {
    const printers = await qz.printers.find();
    return printers;
  } catch (err) {
    console.error("Error fetching printers", err);
    return [];
  }
};

export { configureQz, getPrinters };
