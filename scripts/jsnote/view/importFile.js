import {importFiles} from "../../filereader/index.js"

const elements = {
  import: document.getElementById("import"),
  importFile: document.getElementById("importFile"),
}

export const initialize = () => {
  elements.import.onclick = execute
} 

const execute = async (e) => {
  e.stopPropagation()
  const element = elements.importFile
  importTexts = [];
  importTexts = await importFiles(element)
  importTexts.forEach(v=>console.log(`read ${v.filename}`))
}


