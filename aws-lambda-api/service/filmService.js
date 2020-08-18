'use strict'

const config = require('../config/default');
const request = require('request');
const requestApi = require('../common/requestApi');

var getFilms = async () => {
    try{
        var endpoint = config.URL_PIN_API + '/api/films';
        console.log("Obteniendo peliculas del endpoint: " + endpoint);
        var requestPlanets = requestApi.setRequest("GET", requestApi.setHeaderAPIM(), null, endpoint);
        return new Promise(function(resolve,reject){
            request(requestPlanets,function(error,response,body){
                if(error) return reject(error);
                try{
                    console.log("response.statusCode: " + response.statusCode);
                    console.log("respuesta del servicio: " + body?JSON.stringify(body,null,4):"");
                    switch (response.statusCode) {
                        case 200:
                            console.log("Se obtuvieron satisfactoriamente todas las peliculas");
                            resolve(body);
                            break;
                        case 500:
                            console.log(config.ERROR_500);
                            resolve(body);
                            break;
                        default:
                            console.log(config.ERROR_SWAPI);
                            resolve(body);
                    }
                }catch(error){
                    reject(error);
                }
            });
        }).catch((error) => {
            throw new Error(error);
        });
    }catch(error){
        throw new Error(error);
    }
}

exports.getFilms = getFilms;


var getFilm = async (id) => {
    try{
        var endpoint = config.URL_PIN_API + '/api/films/'+id;
        console.log("Obteniendo la pelicula con ID "+ id +" del endpoint: " + endpoint);
        var requestPlanets = requestApi.setRequest("GET", requestApi.setHeaderAPIM(), null, endpoint);
        return new Promise(function(resolve,reject){
            request(requestPlanets,function(error,response,body){
                if(error) return reject(error);
                try{
                    console.log("response.statusCode: " + response.statusCode);
                    console.log("respuesta del servicio: " + body?JSON.stringify(body,null,4):"");
                    switch (response.statusCode) {
                        case 200:
                            console.log("Se obtuvo satisfactoriamente la pelicula con ID "+id);
                            resolve(body);
                            break;
                        case 500:
                            console.log(config.ERROR_500);
                            resolve(body);
                            break;
                        default:
                            console.log(config.ERROR_SWAPI);
                            resolve(body);
                    }
                }catch(error){
                    reject(error);
                }
            });
        }).catch((error) => {
            throw new Error(error);
        });
    }catch(error){
        throw new Error(error);
    }
}

exports.getFilm = getFilm;