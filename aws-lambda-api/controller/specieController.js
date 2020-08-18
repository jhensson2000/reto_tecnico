'use strict';

const specieService = require('../service/specieService');
const util = require('../util/util');

module.exports.species = (event, context, callback) => {
  specieService.getSpecies().then(function(body){
    var resultados=[];

    for(var i=0; i<body.results.length; i++){
      var elemento={
        "nombre": body.results[i].name,
        "clasificacion": body.results[i].classification,
        "designacion": body.results[i].designation,
        "altura_promedio": body.results[i].average_height,
        "colores_piel": body.results[i].skin_colors,
        "colores_cabello": body.results[i].hair_colors,
        "colores_ojos": body.results[i].eye_colors,
        "promedio_de_vida": body.results[i].average_lifespan,
        "mundo_natal": body.results[i].homeworld,
        "idioma": body.results[i].language,
        "personas": body.results[i].people,
        "peliculas": body.results[i].films,
        "creado": body.results[i].created,
        "editado": body.results[i].edited,
        "url": body.results[i].url
      }
      resultados.push(elemento);
    }

    var species_in_spanish={
      "cantidad": body.count,
      "siguiente": body.next,
      "anterior": body.previous,
      "resultados": resultados
    }
    
    const response = {
      statusCode: 200,
      body: JSON.stringify(species_in_spanish)
    };
  
    return callback(null, response)
  });
};

module.exports.specieById = (event, context, callback) => {
  var id = event.pathParameters.id;

  specieService.getSpecie(id).then(function(body){
    var specie_in_spanish;
    if(!util.isEmpty(body)){
      if(body.detail=="Not found"){
        specie_in_spanish = {"detalle":"Recurso no encontrado"}
      } else{
        specie_in_spanish={
          "nombre": body.name,
          "clasificacion": body.classification,
          "designacion": body.designation,
          "altura_promedio": body.average_height,
          "colores_piel": body.skin_colors,
          "colores_cabello": body.hair_colors,
          "colores_ojos": body.eye_colors,
          "promedio_de_vida": body.average_lifespan,
          "mundo_natal": body.homeworld,
          "idioma": body.language,
          "personas": body.people,
          "peliculas": body.films,
          "creado": body.created,
          "editado": body.edited,
          "url": body.url
        }
      }
    }
    
    const response = {
      statusCode: 200,
      body: JSON.stringify(specie_in_spanish)
    };
  
    return callback(null, response)
  });
};
