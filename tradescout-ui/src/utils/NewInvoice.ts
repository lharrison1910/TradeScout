import Docxtemplater from "docxtemplater"
import PizZip from "pizzip"
import * as fs from "fs"
import path from "path";




export const NewInvoice = () => {
console.log("Got here")
    const content = fs.readFileSync(
    path.resolve(__dirname, "input.docx"),
    "binary"
);


const zip = new PizZip(content);


const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
});
doc.render({
    first_name: "John",
    last_name: "Doe",
    phone: "+33666666",
    description: "The Acme Product",
});

/*
 * Get the output document and export it as a Node.js buffer
 * This method is available since docxtemplater@3.62.0
 */
const buf = doc.toBuffer();

// Write the Buffer to a file
fs.writeFileSync(path.resolve(__dirname, "output.docx"), buf);
}