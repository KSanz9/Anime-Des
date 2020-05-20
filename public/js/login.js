window.onload=init;

function init(){
  console.log("sjdnua<db");
    cargarEventos();    
}
function cargarEventos(){
  //Mostrar el formulario para registrarse
  document.querySelector("#registro").addEventListener("click", mostrarForm);
  
  // Boton de registrar
  document.querySelector("#botRegistro").addEventListener("click",registraUsuario);
  //cerrar el formulario para registrarse
  document.querySelector("#botCancelar").addEventListener("click", cerrarForm);
  

}

// Funcion para registrar el usuario 
function registraUsuario(ev){
  
    const nombre = document.querySelector("input[name='nombre']").value;
    const email = document.querySelector("input[name='email']").value;
    const password = document.querySelector("input[name='password']").value;
    const password2 = document.querySelector("input[name='password2']").value;
    let userValido;
    //validamos el Mail y la contraseña.
    userValido = validarUsuario();

    if (userValido) {

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


}
   //muestra el formulario oculto para poder registrarse en la pagina.
function mostrarForm(){
  document.querySelector("#registro").style.display="none";
  document.querySelector("#form").style.display="inline";

}

// Esta funcion lo que hace es cerrar el formulario al darle a cancelar.
function cerrarForm() {
  document.querySelector("#registro").style.display="inline";
  document.querySelector("#form").style.display="none";
}


function validarUsuario() {
  let emailTrue = false;
  let passwordTrue = false; 
  let confirmacionPassword = false;
  
  const email = document.querySelector("input[name='email']");
  const password = document.querySelector("input[name='password']");
  const password2 = document.querySelector("input[name='password2']");

  email.addEventListener('input', function(ev) {
    const mail = ev.target,
                 regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/;


    if (regex.test(mail.value)) {
        emailTrue = true; 
    } else {
      emailTrue = false; 
    }
    
  });


  password.addEventListener('input', function(ev) {
    const password = ev.target,
                 regex = /^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/;


    if (regex.test(password.value)) {
      passwordTrue = true; 
    } else {
      passwordTrue = false; 
    }
    
  });

  password2.addEventListener('input', function(ev) {
    const password = ev.target;

    if (password2.value == password.value) {
      confirmacionPassword = true; 
    } else {
      confirmacionPassword = false; 
    }
    
  });

  if ( emailTrue && passwordTrue && confirmacionPassword) {
    return true;
  }else{
    return false;
  }


}