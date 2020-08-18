'use strict'

const config = require('../config/default');
const request = require('request');
const requestApi = require('../common/requestApi');

var getPeople = async () => {
    try{
        var endpoint = config.URL_PIN_API + '/api/people';
        console.log("Obteniendo personas del endpoint: " + endpoint);
        var requestPlanets = requestApi.setRequest("GET", requestApi.setHeaderAPIM(), null, endpoint);
        return new Promise(function(resolve,reject){
            request(requestPlanets,function(error,response,body){
                if(error) return reject(error);
                try{
                    console.log("response.statusCode: " + response.statusCode);
                    console.log("respuesta del servicio: " + body?JSON.stringify(body,null,4):"");
                    switch (response.statusCode) {
                        case 200:
                            console.log("Se obtuvieron satisfactoriamente todas las personas");
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

exports.getPeople = getPeople;


var getPerson = async (id) => {
    try{
        var endpoint = config.URL_PIN_API + '/api/people/'+id;
        console.log("Obteniendo la persona con ID "+ id +" del endpoint: " + endpoint);
        var requestPlanets = requestApi.setRequest("GET", requestApi.setHeaderAPIM(), null, endpoint);
        return new Promise(function(resolve,reject){
            request(requestPlanets,function(error,response,body){
                if(error) return reject(error);
                try{
                    console.log("response.statusCode: " + response.statusCode);
                    console.log("respuesta del servicio: " + body?JSON.stringify(body,null,4):"");
                    switch (response.statusCode) {
                        case 200:
                            console.log("Se obtuvo satisfactoriamente la persona con ID "+id);
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

exports.getPerson = getPerson;