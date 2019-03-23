export const view = {
  elements:{
    body: document.body, 
    header: document.getElementsByTagName("header")[0], 
    main: document.getElementsByTagName("main")[0], 
    menutab: document.getElementById("menutab"), 
    footer: document.getElementsByTagName("footer")[0], 
    read: document.getElementById("read"),
    readFile: document.getElementById("readFile"),
    save: document.getElementById("save"),
    import: document.getElementById("import"),
    importFile: document.getElementById("importFile"),
    export: document.getElementById("export"),
    sample: document.getElementById("sample"),
    register: document.getElementById("register"),
    run: document.getElementById("run"),
    keyBinding: document.getElementById("keyBinding"),
    fontSize: document.getElementById("fontSize"),
    editor: document.getElementById("editor"),
    drawArea: document.getElementById("drawArea"),
    draw: document.getElementById("draw"),
    drawCheckBox: document.getElementById("drawCheckBox"),
    sampleArea: document.getElementById("sampleArea"),
    registerArea: document.getElementById("registerArea"),
    categoryInput: document.forms.register.category,
    category: document.getElementById("category"),
    filenameInput: document.forms.register.filename,
    filename: document.getElementById("filename"),
    registerExec: document.getElementById("registerExec"),
    registerMessage: document.getElementById("registerMessage"),
  },
  /*
  fitHeight: function(){
    let bodyBorderWidth = (this.elements.body.style.borderWidth || 
      window.getComputedStyle(this.elements.body, null)
      .getPropertyValue('border'))
      .match(/(\d*).*px/)[1];
    let height = window.innerHeight
      - this.elements.header.getBoundingClientRect().height
      - this.elements.menutab.getBoundingClientRect().height
      - this.elements.footer.getBoundingClientRect().height
      - bodyBorderWidth*2 ;

    this.elements.editor.style.height = height + "px";
    this.elements.drawArea.style.height = height + "px";
    this.elements.drawArea.style.width = this.drawBoxWidth + "px";
    this.elements.draw.style.height = height + "px";
    this.elements.draw.style.width = this.drawBoxWidth + "px";
    return this;
  },
  */
}

