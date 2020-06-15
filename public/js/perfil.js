window.addEventListener("load", init, false);

let UserPerfil;
function init(){
    if (document.cookie == "") {
        alert("Debes estar registrado");
        location.href="../index.html"
      }else{
    cargarInfoPerfil();
    cargarListaAnime();


    document.getElementById("inp").addEventListener("change", readFile);

    let modal = document.getElementById('configuracion');

    // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
        if (event.target == modal) {
        modal.style.display = "none";
    }
}

    
    }
}

function readFile() {

  if (this.files && this.files[0]) {

    var FR= new FileReader();

    FR.addEventListener("load", function(e) {
      document.getElementById("img").src       = e.target.result;
      document.getElementById("b64").innerHTML = e.target.result;
    }); 

    FR.readAsDataURL( this.files[0] );
  }

}



function cargarInfoPerfil(){
    let divPrincipal = document.getElementById("perfilUsuario");
    let User = JSON.parse(document.cookie.split("=")[1]);
    //div que contiene la info del usuario
    let userInfo = document.createElement("div");
    userInfo.id="infoUsuario";
    let imgUser = document.createElement("img");
    imgUser.id = "imgUser";
    imgUser.src="";
    let nombreUser = document.createElement("p");
    let correoUser = document.createElement("p");
    let animesVistos = document.createElement("p");
    let tiempoDeCuenta = document.createElement("p");
    let settings = document.createElement("button");
    settings.id="settings";
    settings.innerHTML= "Configuración";

    
    nombreUser.innerHTML = "Nickname: "+User.nombre;
    correoUser.innerHTML = "Mail: "+User.email;
    tiempoDeCuenta.innerHTML ="Cuenta Creada: "+User.createdAt.split("T")[0];
    animesVistos.innerHTML = "Animes vistos: "+User.animesVistos.length;

    settings.addEventListener("click", settingPerfil);


    userInfo.appendChild(imgUser);   
    userInfo.appendChild(nombreUser);   
    userInfo.appendChild(correoUser);
    userInfo.appendChild(tiempoDeCuenta);
    userInfo.appendChild(animesVistos);
    userInfo.appendChild(settings);
    divPrincipal.appendChild(userInfo);
}

function settingPerfil(){

  document.querySelector("#configuracion").style.display="inline";
  document.querySelector("#botAcceptConfig").addEventListener("click", mandarImg);
  document.querySelector("#botCancelarConfig").addEventListener("click",  cerrarModal);
}
function cerrarModal(){
  let modal = document.getElementById('configuracion');
   modal.style.display = "none";
    
}
function mandarImg(){

  let img = document.getElementById("b64").innerHTML;

  let cookie = JSON.parse(document.cookie.split("=")[1]);
  

  let lista = {
    imgUser: img,
    usuario: cookie.nombre,
  }

  let url = "/api/usuarios/updateImg"


  fetch(url, {
   method: 'POST',
    body:  JSON.stringify(lista),
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response => {
  });
}

function cargarListaAnime(){
    let array
    let divPrincipal = document.getElementById("perfilUsuario");
    let animeList = document.createElement("div");
    let nombreList = document.createElement("h1");
    nombreList.innerHTML= "Animes Vistos";
    animeList.id="list"
    animeList.appendChild(nombreList);
    
    let User = JSON.parse(document.cookie.split("=")[1]);

    let user = {
        idUsuario: User.nombre
      }
    let url = "/api/usuarios/conseguirAnime";

    fetch(url, {
      method: 'POST',
      body:  JSON.stringify(user),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response =>{
      UserPerfil = response.usuario;
      let imgUser = document.querySelector("#imgUser");

      if (UserPerfil[0].imgUser == "" || UserPerfil[0].imgUser == undefined) {
        imgUser.src="../img/imgPerfil.jpg";
      }else{
        imgUser.src=UserPerfil[0].imgUser;
      }
        array = response.usuario[0].animesVistos;
        array.forEach(element => {
            const urlApiAnime = "https://kitsu.io/api/edge/anime?filter[id]="+element;
            const fetchAnimes = fetch(urlApiAnime);
            
            fetchAnimes.then(respuesta => {  
              return respuesta.json();
          
            }).then(result => {   
                let anime = result.data[0];
                let link = document.createElement("a");
                let animeVisto = document.createElement("div");
                let imgAnime = document.createElement("img");
                let nombreAnime = document.createElement("p");
    
                nombreAnime.innerHTML = anime.attributes.canonicalTitle;
                imgAnime.src = anime.attributes.posterImage.small;
                imgAnime.classList.add("imgList");
                
                link.href =  "./detalles.html?"+anime.id;
                
                animeVisto.appendChild(nombreAnime);
                animeVisto.appendChild(imgAnime);
                link.appendChild(animeVisto);
                animeList.appendChild(link);
                
            })
        });
        divPrincipal.appendChild(animeList);
    });

      


    
}
