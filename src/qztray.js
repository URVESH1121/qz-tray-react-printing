
import qz from 'qz-tray';

const connectToQZ = async () => {
    try {
        await qz.websocket.connect({ websocketUrl: 'ws://localhost:8181' });;
        console.log('Connected to QZ Tray');
    } catch (err) {
        console.error('Error connecting to QZ Tray:', err);
    }
 };
 
 const fetchPrinterNames = async () => {
    try {
        const printers = await qz.printers.find();
        return printers.map((printer) => printer.name);
    } catch (err) {
        console.error('Error fetching printer names:', err);
        return [];
    }
 };
 
 const print = async (printerName, data) => {
    try {
        await qz.print({ printer: printerName, data });
        console.log('Printing successful');
    } catch (err) {
        console.error('Error printing:', err);
    }
 };
 
 export { connectToQZ, fetchPrinterNames, print };