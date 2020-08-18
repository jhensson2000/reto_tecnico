'use strict';

const personService = require('../service/personService');
const util = require('../util/util');

module.exports.people = (event, context, callback) => {
  personService.getPeople().then(function(body){
    var resultados=[];

    for(var i=0; i<body.results.length; i++){
      var elemento={
        "nombre": body.results[i].name,
        "altura": body.results[i].height,
        "masa": body.results[i].mass,
        "color_cabello": body.results[i].hair_color,
        "color_piel": body.results[i].skin_color,
        "color_ojos": body.results[i].eye_color,
        "anho_naicimiento": body.results[i].birth_year,
        "genero": body.results[i].gender,
        "mundo_natal": body.results[i].homeworld,
        "peliculas": body.results[i].films,
        "especies": body.results[i].species,
        "vehiculos": body.results[i].vehicles,
        "naves_estelares": body.results[i].starships,
        "creado": body.results[i].created,
        "editado": body.results[i].edited,
        "url": body.results[i].url
      }
      resultados.push(elemento);
    }

    var people_in_spanish={
      "cantidad": body.count,
      "siguiente": body.next,
      "anterior": body.previous,
      "resultados": resultados
    }
    
    const response = {
      statusCode: 200,
      body: JSON.stringify(people_in_spanish)
    };
  
    return callback(null, response)
  });
};

module.exports.personById = (event, context, callback) => {
  var id = event.pathParameters.id;

  personService.getPerson(id).then(function(body){
    var person_in_spanish;
    if(!util.isEmpty(body)){
      if(body.detail=="Not found"){
        person_in_spanish = {"detalle":"Recurso no encontrado"}
      } else{
        person_in_spanish={
          "nombre": body.name,
          "altura": body.height,
          "masa": body.mass,
          "color_cabello": body.hair_color,
          "color_piel": body.skin_color,
          "color_ojos": body.eye_color,
          "anho_naicimiento": body.birth_year,
          "genero": body.gender,
          "mundo_natal": body.homeworld,
          "peliculas": body.films,
          "especies": body.species,
          "vehiculos": body.vehicles,
          "naves_estelares": body.starships,
          "creado": body.created,
          "editado": body.edited,
          "url": body.url
        }
      }
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(person_in_spanish)
    };
  
    return callback(null, response)
  });
};
