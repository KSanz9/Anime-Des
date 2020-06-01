window.onload=init;


function init(){
    cargarApiAnime();   
}


function cargarApiAnime(){
    const urlApiAnime = "https://kitsu.io/api/edge/trending/anime";
    const fetchAnimes = fetch(urlApiAnime);
    
    fetchAnimes.then(respuesta => {
  
      return respuesta.json();
  
    }).then(resposte => {
      jsonAnimes = resposte;
      console.log(jsonAnimes.data);
    })
  }


  