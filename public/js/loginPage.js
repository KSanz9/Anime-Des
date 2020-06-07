window.addEventListener("load", init, false);


function init(){
    cargarEventos(); 
}

function cargarEventos(){
    console.log("ey");

  //Mostrar el formulario para registrarse
  document.querySelector("#registro").addEventListener("click", mostrarForm);
  
  // Boton de registrar
  document.querySelector("#botRegistro").addEventListener("click",registraUsuario);
  //cerrar el formulario para registrarse
  document.querySelector("#botCancelar").addEventListener("click", cerrarForm);
  
  //logearse
  document.querySelector("#botLogin").addEventListener("click", accesoUsuario);

}




function testEmail(mail) {
  regex = /^\w+([\.-]?\w+)*@(?:|hotmail|outlook|yahoo|live|gmail)\.(?:|com|es)+$/;

  if (regex.test(mail)) {
     return true
  } else {
      return false
  }
  
};
function testPasswords(passwd1, passwd2){
  let passwordValid = false;
  regex = /^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/;

  if (regex.test(passwd1)) {
    if (passwd2 == passwd1) {
      passwordValid = true;
    }
  } 

  return passwordValid;

}
// funcion para logearse en la pag.
function accesoUsuario(ev){
  
  ev.preventDefault();
  const nombre = document.querySelector("input[name='loguser']").value;
  const password = document.querySelector("input[name='logpassword']").value;


  let user = {
    nombre:nombre,
    password:password
  }

  let url = "/api/usuarios/isValidUser"

  fetch(url, {
   method: 'POST',
    body:  JSON.stringify(user),
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response =>{
    console.log('Success:', response);

    iniciarSesion(nombre);
  } 
  
  );
  
  
}

function iniciarSesion(name){

  //quitamos el login
  document.querySelector(".login").style.display="none";  
  document.querySelector("#botonDeRegistro").style.display="none";
  document.getElementById("MenuDesplegable").innerHTML = name;


 mostrarOpciones();
}




// Funcion para registrar el usuario 
function registraUsuario(ev){
  ev.preventDefault();
    const nombre = document.querySelector("input[name='nombre']").value;
    const email = document.querySelector("input[name='email']").value;
    const password = document.querySelector("input[name='password']").value;
    const password2 = document.querySelector("input[name='password2']").value;
   
    if (!testEmail(email)) {
      console.log("correo erroneo");
      return;
    }
    if (!testPasswords(password, password2)) {
      console.log("password erroneo");
      return;
    }

      let user = {
        nombre:nombre,
        email: email,
        password:password
      }

      let url = "/api/usuarios/create"
      console.log(user);

      fetch(url, {
       method: 'POST',
        body:  JSON.stringify(user),
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));
    }


//muestra el formulario oculto para poder registrarse en la pagina.
function mostrarForm(){
  document.querySelector("#form").style.display="inline";

}

// Esta funcion lo que hace es cerrar el formulario al darle a cancelar.
function cerrarForm(ev) {
  ev.preventDefault();
  document.querySelector("#registro").style.display="inline";
  document.querySelector("#form").style.display="none";
}

function mostrarOpciones(){
  console.log("click");
  for (let index = 0; index < 4; index++) {
   document.getElementsByClassName("mD")[index].style.display="initial";
  }
}
