// I pledge my honor that I have abided by the Stevens Honors System - Aparajita Rana

const ArrayErrorCheck = (array) => {
    //That the array parameter exists (meaning the function has input at all)
    if(array==null || array==undefined){
        throw "Parameter doesn't exist";
    }
    //The array parameter is of the proper type (meaning, it's an array)
    if(!Array.isArray(array)){
        throw "Input is not an array";
    }
    //The array is not empty.
    if(array.length<=0){
        throw "Array is empty"
    }
    //Each array element is a number.
    for(let i = 0; i<array.length; i++){
        if(isNaN(array[i])){
            throw "Every value is not a number"
        }
    }
}

const mean = function mean(array){
    ArrayErrorCheck(array);
    let sum = array.reduce((a, b) => a + b, 0);
    let temp = sum/array.length;
    return temp.toFixed(2);
}

const medianSquared = function medianSquared(array){
    ArrayErrorCheck(array);

    let median = array.sort((a, b) => a - b)[Math.floor(array.length / 2)]
    let sqa = Math.pow(median, 2);
    return sqa.toFixed(2);
}

const maxElement = function maxElement(array){
    ArrayErrorCheck(array);
    let max = -1;
    let loc = -1;

    for(let i = 0; i<array.length; i++){
        if(array[i]>max){
            max=array[i];
            loc=i;
        }
    }
    return {[max]: loc};
}

const fill = function fill(end, value){
    if(end==null || end==undefined){
        throw "end doesn't exist";
    }
    if(isNaN(end)){
        throw "end is not proper type";
    }
    if(end<=0){
        throw "end is not proper value"
    }
    let array = [];

    for(let i = 0; i<end; i++){
        array.push((value == undefined) ? i : value);
    }
    return array;
}

const countRepeating = function countRepeating(array){
    if(array==null || array==undefined){
        throw "array doesn't exist";
    }

    if (!Array.isArray(array)){
        throw "array isn't an array"
    }

    if (array.filter(val => !(['number', 'string'].includes(typeof val))).length > 0){
        throw "values must be a string or number"
    }

    let vals = {}

    if(array==[]){
        return vals;
    }

    for(let i = 0; i<array.length; i++){
        if(!vals[array[i]]){
            vals[array[i]]=1;
        }
        else{
            vals[array[i]]+=1;
        }
    }

    let res = {}
    
    for(var i in vals) {
        if(vals[i]>1){
            res[i]=vals[i];
        }
      }

    return res;
}

const isEqual = function isEqual(arrayOne, arrayTwo){
    if (arrayOne==null || arrayTwo==null || arrayOne==undefined || arrayTwo==undefined){
        throw "Empty/Invalid Arrays not allowed"
    }
    if (!Array.isArray(arrayOne) || !Array.isArray(arrayTwo)) {
        throw 'One/Both entered arrays are not an array'
    }
    if((arrayOne.length == 0 && arrayTwo.length != 0) || (arrayTwo.length == 0 && arrayOne.length != 0)){
        return false;
    }
    
    if(arrayOne.every(element => element == null) && arrayTwo.every(element => element == null)){
        return true;
    }

    //flatten arrays
    let mergedOne = [].concat.apply([], arrayOne);
    let mergedTwo = [].concat.apply([], arrayTwo);

    //sort arrays
    mergedOne.sort();
    mergedTwo.sort();

    for(let i = 0; i<mergedOne.length; i++){
        if(mergedOne[i]!=mergedTwo[i]){
            return false;
        }
    }
    return true;
}

module.exports = {mean, medianSquared, maxElement, fill, countRepeating, isEqual}