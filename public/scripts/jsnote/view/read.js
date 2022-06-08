import {read} from "../viewModel.js"
import {importFiles} from "../../filereader/index.js"

const elements = {
  read: document.getElementById("read"),
  readFile: document.getElementById("readFile"),
}

export const initialize = () => {
  elements.read.onclick = execute
}

const execute = async (e) => {
  e.stopPropagation()
  const element = elements.readFile;
  const files = await importFiles(element)
  const text = files[0].text
  const filename = files[0].filename

  read(text,filename) 
}

