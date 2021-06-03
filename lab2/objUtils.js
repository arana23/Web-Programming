// I pledge my honor that I have abided by the Stevens Honors System - Aparajita Rana

const makeArrays = function makeArrays(objects){
    if (!objects || !Array.isArray(objects)){
        throw 'Invalid Input'
    }
    if (objects.length < 2){
        throw 'Objects has less than two elements'
    }
    if (objects.filter(object => typeof object != 'object' || (Object.keys(object).length == 0)).length > 0) {
    throw "Object can't be empty"
    } 

    let res = [];

    for (let i = 0; i < objects.length; i++) {
        let temp = objects[i];
        for (const val in temp) {
            res.push([val, temp[val]]);
        }
    }

    return JSON.stringify(res);
}

const isDeepEqual = function isDeepEqual(obj1, obj2){
    if (!obj1 || !obj2){
        throw 'Input is invalid'
    }
    if((typeof obj1 !== 'object') || (typeof obj2 !== 'object')){
        throw 'Input not objects'
    }
    if((Array.isArray(obj1)) || (Array.isArray(obj2))){
        throw 'Neither input is an array'
    }
    
    for (let val in obj1) {
        //look for nested
        if (typeof obj1[val] == 'object' && typeof obj2[val] == 'object') 
        {
         //recursive portion
          if(!isDeepEqual(obj1[val], obj2[val])){
            return false
          }
        } 
        else 
        {
            if (typeof obj1[val] !== typeof obj2[val]){
                return false
            }
            if (obj1[val] !== obj2[val]){
                return false
            }
        }
    }
    
    //same thing but w obj2
    for (let val in obj2) {
        //look for nested
        if (typeof obj1[val] == 'object' && typeof obj2[val] == 'object') 
        {
         //recursive portion
          if(!isDeepEqual(obj1[val], obj2[val])){
            return false
          }
        } 
        else 
        {
            if (typeof obj1[val] !== typeof obj2[val]){
                return false
            }
            if (obj1[val] !== obj2[val]){
                return false
            }
        }
    }
    return true
}

const computeObject = function computeObject(object, func){
    
    if (typeof object != 'object' && object == null) {
    throw 'Not an object'
    }
  
    if ((Object.keys(object).length) < 1) {
        throw 'Must have at minimum one val value pair'
    }
    let check = Object.values(object).every(function(element) {return typeof element == 'number';})
    if(!check){
        throw "all need to be nums"
    }

    if (typeof func != 'function') {
        throw 'Must be a function'
    }

    let res = {};

    for (let val in object) {
        res[val] = func(object[val]);
    }

    return res;
}

module.exports = {computeObject, isDeepEqual, makeArrays}