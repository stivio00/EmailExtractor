"use strict";

function procesar_datos(){
    var input_element = document.getElementById("table_input");
    var output_element = document.getElementById("table_output");
    var solo_inclusion = document.getElementById("solo_inclusion");

    console.log("test");
    var texto  = input_element.value;
    output_element.value = "";
    var lista = texto.split("\n");
    console.log(lista);

    var count = 0;
    lista.forEach((e,i) => {
        //0:id, 1:cedula , 2:apellido, nombre 3:tipo matricula(Normal, Inclusión)
        let cols = e.split("\t"); 
        if (cols[7] != undefined) {
            if (solo_inclusion.checked && cols[3] == "Inclusión"){
                //solo los que estan incluyendo
                output_element.value += cols[7] + "; ";
                count++;
            } else if (!solo_inclusion.checked) {
                //Agregamos todos
                output_element.value += cols[7]+ "; ";
                count++;
            } else {
                console.log("error");
            }
        }
    });
    

    var label = document.getElementById("correos_label");
    if (count != 0) {
        label.innerHTML= `Correos procesados (${count}):`;
        var link_element = document.querySelector("#email-link");
        //var ll = `https://outlook.office.com/owa/?rru=compose&to=${to}&subject=${subject}&body=${body}`//&cc=
        //link_element.href= "mailto:" + output_element.value;
        var link_str = `https://outlook.office.com/owa/?rru=compose&to=${output_element.value}&subject=Asunto&body=Buenos dias!`;
        //link_element.href = "#";
        link_element.innerHTML= `Enviar ${count} correos` ;
        link_element.onclick = function() { 
            var MyWindow = window.open(link_str,'Enviar correo','width=800,height=800');
            return false;
        };
        copyToClipboard();
    }  else {
        label.innerHTML = "Correos (0) : "
        postMessage("No se encontraron correos");
    }
}

function pasteFromClipboard() {
    console.log("pasted!!");
    navigator.clipboard.readText().then(clipText => {
        document.getElementById("table_input").value = clipText;
        postMessage("Pegado");
    });
}

function copyToClipboard() {
  var copyText = document.getElementById("table_output");
  copyText.select();
  copyText.setSelectionRange(0, 99999); /*For mobile devices*/
  document.execCommand("copy");
  postMessage(`Listo, el resultado fue copiado. \nPor favor pegar el contenido en el sujeto del correo.`);
}

function limpiar(element) {
    if(element === 1){
        document.getElementById("table_input").value = "";

    }else{
        document.getElementById("table_output").value = "";
    }
    var link_element = document.querySelector("#email-link");
    link_element.href= "#";
    link_element.innerHTML= `Sin correos` ;
    //postMessage("limpio");
}

function postMessage(text) {
    var x = document.getElementById("snackbar");
    x.className = "show";
    x.innerHTML = text;
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
