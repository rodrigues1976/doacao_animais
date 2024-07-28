listar_animais();
var cor = getCookie("modo_cor");
if (cor=="escuro"){
    modo_cor("escuro");
    document.getElementById('select_cor').value = "escuro";
} else {
    modo_cor("claro");
    document.getElementById('select_cor').value = "claro";
}

function listar_animais(){

    var xhr = new XMLHttpRequest(); 
    xhr.open('GET', 'http://localhost:8080/animais');
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 204) {
                var tabela_animais = document.getElementById('tabela_animais');
                tabela_animais.innerHTML = "";
            }
            if (xhr.status == 200) {
                data = xhr.responseText;
                var jsonResponse = JSON.parse(data);
                var tabela_animais = document.getElementById('tabela_animais');
                tabela_animais.innerHTML = "";
                Object.entries(jsonResponse).forEach(([key, value]) => {
                    var div_linha = document.createElement('div');
                    div_linha.setAttribute('class', 'col-12 row');
                    tabela_animais.appendChild(div_linha);
                    
                    var div_id = document.createElement('div');
                    div_id.setAttribute('class', 'col-1 justify-content-center text-justify');
                    div_id.innerHTML = value.id;
                    
                    var div_especie = document.createElement('div');
                    div_especie.setAttribute('class', 'col-1 justify-content-center text-justify');
                    div_especie.innerHTML = value.especie;
                    
                    var div_descricao = document.createElement('div');
                    div_descricao.setAttribute('class', 'col-4 justify-content-center text-justify');
                    div_descricao.innerHTML = value.descricao;
                    
                    var div_contato = document.createElement('div');
                    div_contato.setAttribute('class', 'col-3 justify-content-center text-justify');
                    div_contato.innerHTML = value.contato;
                    
                    var div_botoes = document.createElement('div');
                    div_botoes.setAttribute('class', 'row col-3');
                    
                    var botao_delete = document.createElement('button');
                    botao_delete.innerHTML = "Apagar";
                    botao_delete.setAttribute('class', 'btn p-1 col-6');
                    botao_delete.setAttribute('onclick', "apagar_animal(" + value.id + ")");
                    div_botoes.appendChild(botao_delete);
                    
                    var botao_editar = document.createElement('a');
                    botao_editar.innerHTML = "Editar cadastro";
                    botao_editar.setAttribute('class', 'btn link_botao p-1 col-6');
                    botao_editar.setAttribute('href', "http://localhost:8080/views/editar_animal/" + value.id);
                    div_botoes.appendChild(botao_editar);                    
                    
                    div_linha.appendChild(div_id);
                    div_linha.appendChild(div_especie);
                    div_linha.appendChild(div_descricao);
                    div_linha.appendChild(div_contato);
                    div_linha.appendChild(div_botoes);                                                                  
                });
            }
        }
        modo_cor(document.getElementById('select_cor').value);
    };
    xhr.send();
}

function apagar_animal(id_animal){
    var xhr = new XMLHttpRequest(); 
    xhr.open('DELETE', 'http://localhost:8080/animais/' + id_animal);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 204) {
                listar_animais();
            }
        }
    };
    xhr.send();
}

function submitform(){
    var form = document.getElementById('form_animais');
    var xhr = new XMLHttpRequest();
    var formData = new FormData(form);

    xhr.open('POST','http://localhost:8080/animais');
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(JSON.stringify(Object.fromEntries(formData)));

    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            form.reset(); //reset form after AJAX success or do something else
            listar_animais();
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
    