window.addEventListener("load", init, false);


function init(){
    if (document.cookie == "") {
        alert("Debes estar registrado");
        location.href="../index.html"
      }else{
    cargarInfoPerfil();
    cargarListaAnime();
    }
}


function cargarInfoPerfil(){
    console.log("info");
    let divPrincipal = document.getElementById("perfilUsuario");
    let User = JSON.parse(document.cookie.split("=")[1]);
    //div que contiene la info del usuario
    let userInfo = document.createElement("div");
    userInfo.id="infoUsuario";
    let imgUser = document.createElement("img");
    let nombreUser = document.createElement("p");
    let correoUser = document.createElement("p");
    let animesVistos = document.createElement("p");
    let tiempoDeCuenta = document.createElement("p");

    imgUser.src="../img/imgPerfil.jpg";
    nombreUser.innerHTML = "Nickname: "+User.nombre;
    correoUser.innerHTML = "Mail: "+User.email;
    tiempoDeCuenta.innerHTML ="Cuenta Creada: "+User.createdAt.split("T")[0];
    animesVistos.innerHTML = "Animes vistos: "+User.animesVistos.length;

    userInfo.appendChild(imgUser);   
    userInfo.appendChild(nombreUser);   
    userInfo.appendChild(correoUser);
    userInfo.appendChild(tiempoDeCuenta);
    userInfo.appendChild(animesVistos);
    divPrincipal.appendChild(userInfo);
}

function cargarListaAnime(){
    console.log("infoAnime");
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
