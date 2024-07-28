var cor = getCookie("modo_cor");
if (cor=="escuro"){
    modo_cor("escuro");
    document.getElementById('select_cor').value = "escuro";
} else {
    modo_cor("claro");
    document.getElementById('select_cor').value = "claro";
}

var xhr = new XMLHttpRequest();
animal_id = window.location.href.split('/').at(-1);
xhr.open('GET', 'http://localhost:8080/animais/' + animal_id);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            data = xhr.responseText;
            var jsonResponse = JSON.parse(data);
            document.getElementById('iespecie').value = jsonResponse.especie;
            document.getElementById('idescricao').value = jsonResponse.descricao;
            document.getElementById('icontato').value = jsonResponse.contato;
        }
    }
};
xhr.send();

function submitform(){
    var form = document.getElementById('form_animais');
    var xhr = new XMLHttpRequest();
    var formData = new FormData(form);

    xhr.open('PUT','http://localhost:8080/animais/' + animal_id);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(JSON.stringify(Object.fromEntries(formData)));

    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            form.reset(); //reset form after AJAX success or do something else
        }
    };
}

function modo_cor(modo){
    elementos = document.getElementsByTagName("*");
    for (var i = 0; i < elementos.length; i++) {
        elemento = elementos[i];
        if(modo == "escuro"){
            elemento.classList.add('modo_escuro');
            elemento.classList.remove('modo_claro');
            setCookie("escuro");
        } else if (modo == "claro"){
            elemento.classList.add('modo_claro');
            elemento.classList.remove('modo_escuro');
            setCookie("claro");
        }
    };
}

function setCookie(modo) {
  const d = new Date();
  d.setTime(d.getTime() + (100*365*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = "modo_cor=" + modo + ";" + expires + "path=/;";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
    
    