
const elements = {
    sampleArea: document.getElementById("sampleArea"),
}

const initialize = () => {
  elements.sampleArea.onclick = execute
}

const execute = () => {
   e.stopPropagation()
}
