"use strict";

function procesar_datos(){
    var input_element = document.getElementById("table_input");
    var output_element = document.getElementById("table_output");

    console.log("test");
    var texto  = input_element.value;
    output_element.value = "";
    var lista = texto.split("\n");
    console.log(lista);
    lista.forEach((e,i) => {
        output_element.value += e.split("\t")[7] + ";";
    });

    copyToClipboard();
}

function pasteFromClipboard() {
    console.log("pasted!!");
    var copyText = document.getElementById("table_input");
    copyText.focus();
    document.execCommand("paste");
}

function copyToClipboard() {
  var copyText = document.getElementById("table_output");
  copyText.select();
  copyText.setSelectionRange(0, 99999); /*For mobile devices*/
  document.execCommand("copy");
  alert(`Listo copiado. Por favor pegar contenido en el sujerto del correo`);
}

function limpiar(element) {
    if(element === 1){
        document.getElementById("table_input").value="";
    }else{
        document.getElementById("table_output").value="";
    }
    
}
