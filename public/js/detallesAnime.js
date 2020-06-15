
window.addEventListener("load", init, false);


let idAnime = window.location.href.split("?")[1];

function init(){
  /*recoge la id del anime para saber cual has mirado */
  
  cargarApiAnime(idAnime);
  cargarComentarios();
  //eventos
  let votacion = {
    idAnime: idAnime,
  }

  let url = "/api/votacion/mirarVotacion"

  fetch(url, {
   method: 'POST',
    body:  JSON.stringify(votacion),
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response => {

    let divPrincipal = document.querySelector("#anime");
    let div = document.createElement("div");
    let cajita = document.createElement("p");
    if (response.sumaNotas==null||response.sumaNotas == undefined) {
      cajita.innerHTML="Nota Media: 0";
    }else{
    cajita.innerHTML="Nota Media: "+response.sumaNotas;
  }
    div.id="notaMedia";
    div.appendChild(cajita);
    divPrincipal.appendChild(div);
    
    
  });





  document.querySelector(".votarAnime").addEventListener("click", votarAnime);

  document.querySelector(".favoritoAnime").addEventListener("click", anyadirListaFav);
  
  document.getElementById("comentar").addEventListener("click", comentarAnime);



  }

  function cargarComentarios(){

    let animeId = {
      codigoAnime: idAnime
    }
    let url = "/api/comentarios/comentAnime";

    fetch(url, {
    
      method: 'POST',
      body:  JSON.stringify(animeId),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response =>{
      let divPrincipal = document.querySelector("#comentariosUsuarios");

      response.anime.forEach(element => {
          let divComent = document.createElement("div");
          let nombreUsuario = document.createElement("h3");
          let comentario = document.createElement("p");

          nombreUsuario.innerHTML = element.idUsuario;
          comentario.innerHTML = element.comentario;

          divComent.appendChild(nombreUsuario);
          divComent.appendChild(comentario);
          divPrincipal.appendChild(divComent);

      });
    } 

    );

  }

  function comentarAnime(){
    if (document.cookie == "") {
      alert("Debes estar registrado");

    }else{
      let text = document.getElementById("textArea");

    if (text.value != "") {
      let cookie = JSON.parse(document.cookie.split("=")[1]);

      let comentario = {
        idAnime: idAnime,
        idUsuario: cookie.nombre,
        comentario: text.value
      }

      let url = "/api/comentarios/create"

      fetch(url, {
       method: 'POST',
        body:  JSON.stringify(comentario),
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        location.href=window.location.href;
      });

    }else{
      alert("Tienes que tener algo escrito");
    }
    }


  }



  

  function votarAnime(ev){

    ev.preventDefault();

    if (document.cookie == "") {
      alert("Debes estar registrado");

    }else{

      let cookie = JSON.parse(document.cookie.split("=")[1]);

      const score = document.querySelector("select[name='score']").value;
   
      let votacion = {
        idAnime: idAnime,
        idUsuario: cookie.nombre,
        nota:score
      }

      let url = "/api/votacion/create"

      fetch(url, {
       method: 'POST',
        body:  JSON.stringify(votacion),
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {

        
        
      });

    }
    }
    

  function anyadirListaFav(ev){
    ev.preventDefault();
    if (document.cookie == "") {
      alert("Debes estar registrado");
    }else{

      let cookie = JSON.parse(document.cookie.split("=")[1]);
      let animeName = window.location.href.split("?")[1];

      let lista = {
        anime: animeName,
        usuario: cookie.nombre,
      }

      let url = "/api/usuarios/updateAnimeList"

      fetch(url, {
       method: 'POST',
        body:  JSON.stringify(lista),
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        alert(document.querySelector(".nameAnimeDetails").innerHTML+" ha sido añadido a favoritos");
      });
  

    }



  }

  function cargarApiAnime(idAnime) {
    //atributos principales
    const urlApiAnime = "https://kitsu.io/api/edge/anime?filter[id]="+idAnime;
    const fetchAnimes = fetch(urlApiAnime);
    
    fetchAnimes.then(respuesta => {
  
      return respuesta.json();
  
    }).then(result => {   
      infoAnimeAtributos(result.data[0]);
     })
  }

  function infoAnimeAtributos(anime){
    let imgAnime = document.createElement("img");
    let nombreAnime = document.createElement("h1");
    let synopsisAnime = document.createElement("p");
    let statusAnime = document.createElement("h3");
    let typeAnime = document.createElement("h3");
    

    imgAnime.src = anime.attributes.posterImage.small;
    imgAnime.alt = anime.attributes.canonicalTitle;
    imgAnime.classList.add("imgAnimeDetails");

    nombreAnime.innerHTML = anime.attributes.canonicalTitle;
    nombreAnime.classList.add("nameAnimeDetails");

    synopsisAnime.innerHTML = anime.attributes.synopsis;
    synopsisAnime.classList.add("synopsisAnimeDetails");

    statusAnime.innerHTML = anime.attributes.status;
    statusAnime.classList.add("statusAnimeDetails");

    typeAnime.innerHTML = anime.attributes.subtype;
    typeAnime.classList.add("typeAnimeDetails");


    añandirElementos(imgAnime, nombreAnime, synopsisAnime, statusAnime, typeAnime);

  }


  function añandirElementos(imgAnime, nombreAnime, synopsisAnime, statusAnime, typeAnime){
    let divPrincipal = document.getElementById("anime");

    divPrincipal.appendChild(imgAnime);
    divPrincipal.appendChild(nombreAnime);
    divPrincipal.appendChild(synopsisAnime);
    divPrincipal.appendChild(statusAnime);
    divPrincipal.appendChild(typeAnime);
  }