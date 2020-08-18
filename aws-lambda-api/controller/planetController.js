'use strict';

const planetService = require('../service/planetService');
const Dynamo = require('../common/Dynamo');
const uuid = require('uuid');
const util = require('../util/util');
const config = require('../config/default');

module.exports.planets = (event, context, callback) => {
  planetService.getPlanets().then(function(body){
    var resultados=[];

    for(var i=0; i<body.results.length; i++){
      var elemento={
        "nombre": body.results[i].name,
        "periodo_rotacion": body.results[i].rotation_period,
        "periodo_orbital": body.results[i].orbital_period,
        "diametro": body.results[i].diameter,
        "clima": body.results[i].climate,
        "gravedad": body.results[i].gravity,
        "terreno": body.results[i].terrain,
        "superficie_agua": body.results[i].surface_water,
        "poblacion": body.results[i].population,
        "residentes": body.results[i].residents,
        "peliculas": body.results[i].films,
        "creado": body.results[i].created,
        "editado": body.results[i].edited,
        "url": body.results[i].url
      }
      resultados.push(elemento);
    }

    var planets_in_spanish={
      "cantidad": body.count,
      "siguiente": body.next,
      "anterior": body.previous,
      "resultados": resultados
    }
    
    const response = {
      statusCode: 200,
      body: JSON.stringify(planets_in_spanish)
    };
  
    return callback(null, response)
  });
};

module.exports.planetById = (event, context, callback) => {
  var id = event.pathParameters.id;

  planetService.getPlanet(id).then(function(body){
    var planet_in_spanish;
    if(!util.isEmpty(body)){
      if(body.detail=="Not found"){
        planet_in_spanish = {"detalle":"Recurso no encontrado"}
      }
      else{
        planet_in_spanish={
          "nombre": body.name,
          "periodo_rotacion": body.rotation_period,
          "periodo_orbital": body.orbital_period,
          "diametro": body.diameter,
          "clima": body.climate,
          "gravedad": body.gravity,
          "terreno": body.terrain,
          "superficie_agua": body.surface_water,
          "poblacion": body.population,
          "residentes": body.residents,
          "peliculas": body.films,
          "creado": body.created,
          "editado": body.edited,
          "url": body.url
        }
      }
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(planet_in_spanish)
    };
  
    return callback(null, response)
  });
};

module.exports.planetsCreateBD = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  
  var tableName = config.TABLE_PLANETS
  var body={
    "ID": uuid.v1(),
    "nombre": data.nombre,
    "periodo_rotacion": data.periodo_rotacion,
    "periodo_orbital": data.periodo_orbital,
    "diametro": data.diametro,
    "clima": data.clima,
    "gravedad": data.gravedad,
    "terreno": data.terreno,
    "superficie_agua": data.superficie_agua,
    "poblacion": data.poblacion,
    "residentes": data.residentes,
    "peliculas": data.peliculas,
    "creado": timestamp,
    "editado": timestamp,
    "url": data.url
  }

  Dynamo.write(body, tableName);
  
  const response = {
    statusCode: 200,
    body: JSON.stringify(body)
  };
  return callback(null, response)
};
  

module.exports.planetsBD = (event, context, callback) => {
  var tableName = config.TABLE_PLANETS
  var data = Dynamo.getAll(tableName);
  
  const response = {
    statusCode: 200,
    body: JSON.stringify(data)
  };
  return callback(null, response)
};


module.exports.planetByIdBD = async (event, context, callback) => {;
  var id = event.pathParameters.id
  var tableName = config.TABLE_PLANETS
  const data = await Dynamo.get(id, tableName)

  var planet={
    "nombre": data.nombre,
    "periodo_rotacion": data.periodo_rotacion,
    "periodo_orbital": data.periodo_orbital,
    "diametro": data.diametro,
    "clima": data.clima,
    "gravedad": data.gravedad,
    "terreno": data.terreno,
    "superficie_agua": data.superficie_agua,
    "poblacion": data.poblacion,
    "residentes": data.residentes,
    "peliculas": data.peliculas,
    "creado": data.creado,
    "editado": data.editado
  }
  
  const response = {
    statusCode: 200,
    body: JSON.stringify(planet)
  };
  return callback(null, response)
  
  
};
