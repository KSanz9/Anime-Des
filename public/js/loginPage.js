window.addEventListener("load", init, false);

let cookieUsuario = false;
let UserLoged;
function init(){
    cargarEventos(); 
}

function cargarEventos(){

    cookieUsuario = isCookieTrue();

    if (!cookieUsuario) {
      //Mostrar el formulario para registrarse
      document.querySelector("#registro").addEventListener("click", mostrarForm);
  
       // Boton de registrar
      document.querySelector("#botRegistro").addEventListener("click",registraUsuario);
       //cerrar el formulario para registrarse
       document.querySelector("#botCancelar").addEventListener("click", cerrarForm);
  
      //logearse
      document.querySelector("#botLogin").addEventListener("click", accesoUsuario);





      var modal = document.getElementById('form');

    // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
        if (event.target == modal) {
        modal.style.display = "none";
    }
}

    }else{
      mostrarOpcionesUsuario();
    }
  
}

function isCookieTrue(){
  if (document.cookie == "") {
    return false;
  }
  let user = JSON.parse(document.cookie.split("=")[1]);

  if(user !== undefined){
    return true;
  }else{
    return false;
  }

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
  console.log("hago post");
  fetch(url, {
   method: 'POST',
    body:  JSON.stringify(user),
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response =>{
    console.log('Success:', response.usuario.nombre);
    UserLoged =response.usuario;
    iniciarSesion(response.usuario);
  } 
  
  );
  
  
}

function iniciarSesion(usuario){
  document.cookie = "userLogged="+JSON.stringify(usuario)+";max-age=9592090"; 

  mostrarOpcionesUsuario();
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
      .then(response => {
        alert("Se ha registrado correctamente");
        location.href ="../index.html";
      });
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

function mostrarOpcionesUsuario(){
 //quitamos el login
 let usuario = JSON.parse(document.cookie.split("=")[1]);

 document.querySelector(".login").style.display="none";  
 document.querySelector("#botonDeRegistro").style.display="none";
 document.getElementById("menuDesplegable").style.display="inline";
 document.getElementById("perfil").innerHTML = usuario.nombre;

  eventosBotonesUsusario();
}

function eventosBotonesUsusario() {
  
 document.querySelector("#logout").addEventListener("click", cerrarSesionUsuario);


 
}

function cerrarSesionUsuario(ev) {
  document.cookie = "userLogged="+UserLoged+";max-age=-1";
  location.href="../index.html";

}


