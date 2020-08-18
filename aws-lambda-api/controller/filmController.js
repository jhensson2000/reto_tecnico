'use strict';

const filmService = require('../service/filmService');
const util = require('../util/util');

module.exports.films = (event, context, callback) => {
  filmService.getFilms().then(function(body){
    var resultados=[];

    for(var i=0; i<body.results.length; i++){
      var elemento={
        "titulo": body.results[i].title,
        "episodio_id": body.results[i].episode_id,
        "rastreo_apertura": body.results[i].opening_crawl,
        "director": body.results[i].director,
        "productor": body.results[i].producer,
        "fecha_lanzamiento": body.results[i].release_date,
        "personajes": body.results[i].characters,
        "planetas": body.results[i].planets,
        "naves_estelares": body.results[i].starships,
        "vehiculos": body.results[i].vehicles,
        "especies": body.results[i].species,
        "creado": body.results[i].created,
        "editado": body.results[i].edited,
        "url": body.results[i].url
      }
      resultados.push(elemento);
    }

    var films_in_spanish={
      "cantidad": body.count,
      "siguiente": body.next,
      "anterior": body.previous,
      "resultados": resultados
    }
    
    const response = {
      statusCode: 200,
      body: JSON.stringify(films_in_spanish)
    };
  
    return callback(null, response)
  });
};

module.exports.filmById = (event, context, callback) => {
  var id = event.pathParameters.id;

  filmService.getFilm(id).then(function(body){
    var film_in_spanish;
    if(!util.isEmpty(body)){
      if(body.detail=="Not found"){
        film_in_spanish = {"detalle":"Recurso no encontrado"}
      }
      else{
        film_in_spanish={
          "titulo": body.title,
          "episodio_id": body.episode_id,
          "rastreo_apertura": body.opening_crawl,
          "director": body.director,
          "productor": body.producer,
          "fecha_lanzamiento": body.release_date,
          "personajes": body.characters,
          "planetas": body.planets,
          "naves_estelares": body.starships,
          "vehiculos": body.vehicles,
          "especies": body.species,
          "creado": body.created,
          "editado": body.edited,
          "url": body.url
        }
      }
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(film_in_spanish)
    };
  
    return callback(null, response)
  });
};