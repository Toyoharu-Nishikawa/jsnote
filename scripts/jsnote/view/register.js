
const elements = {
    register: document.getElementById("register"),
}

export const initialize = () => {
  elements.register.onclick = execute
}

const execute = (e) => {
  e.stopPropagation() 
}


