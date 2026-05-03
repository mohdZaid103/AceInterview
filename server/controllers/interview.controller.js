import fs from "fs"
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs"

export const analyzeResume = async(req,res)=>{
    try {
        if(!req.file){
            return res.status(400).json({message:"Resume required"})
        }
        const filePath= req.file.filePath
        const fileBuffer = await fs.promises.readFile(filePath)
        const uint8Array = new Uint8Array(fileBuffer)

        const pdf = await pdfjsLib.getDocument({data:uint8Array}).promise

        let resumeTest = ""
        //extract text from all pages of pdf
        for(let pageNum = 1;pageNum<=pdf.numPages;pageNum++){
            const page = await pdf.getPage(pageNum)
            const content = await page.getTextContent()

            const pageText = content.items.map(item=>item.str).join(" ");
            resumeTest+=pageText+"\n";
        }
        resumeTest =resumeTest.
        replace(/\s+/g," ").trim(); 

        const messages = [
            {
                role:"system",
                content:
            }
        ]

    } catch (error) {
        
    }
}