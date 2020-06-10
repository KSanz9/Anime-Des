
window.addEventListener("load", init, false);


let idAnime = window.location.href.split("?")[1];

function init(){
  /*recoge la id del anime para saber cual has mirado */
  
  cargarApiAnime(idAnime);

  //eventos
  document.querySelector(".votarAnime").addEventListener("click", votarAnime);

  document.querySelector(".favoritoAnime").addEventListener("click", anyadirListaFav);
   
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
      console.log(votacion);

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
      let animeName = document.getElementsByClassName("nameAnimeDetails")[0].innerHTML;

      let lista = {
        anime: animeName,
        usuario: cookie.nombre,
      }

      let url = "/api/usuarios/updateAnimeList"
      console.log(lista);

      fetch(url, {
       method: 'POST',
        body:  JSON.stringify(lista),
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        alert(animeName+" ha sido añadido a favoritos");
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