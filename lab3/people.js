// I pledge my honor that I have abided by the Stevens Honor System - Aparajita Rana
const axios = require('axios');

async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json')
    //const parsedData = JSON.parse(data) // parse the data from JSON into a normal JS Object
    return data // this will be the array of people objects
}

const numChecker = function numChecker(num){
    if (typeof num !== 'number'){
        throw "Input must be a number";
    }
    if(num<0){
        throw "Input must be greater than zero";
    }
    if(num === undefined){
        throw "Input can't be empty";
    }
}

async function getPersonById(id) {
    numChecker(id);
    const people = await getPeople();
    if (people.length < id){
        throw "Scope error";
    }

    for (var person in people) {
        if (people[person].id === id) return people[person];
    }
}

async function howManyPerState(stateAbbrv){
    const people = await getPeople();
    if (typeof stateAbbrv !== 'string'){
        throw "Entered value is not a string"
    }
    if(stateAbbrv === undefined){
        throw "Input can't be empty";
    }
    
    var count = 0;
    for (var person in people) {
        if (people[person].address.state === stateAbbrv) count+=1;
    }
    if(count==0){
        throw "No valid input given"
    }
    return count;
}

//reference: https://stackoverflow.com/questions/4060004/calculate-age-given-the-birth-date-in-the-format-yyyymmdd
const ageCalc = function ageCalc(num){
    const dob = new Date(num);
    var diff = Date.now() - dob.getTime();
    var tempdate = new Date(diff);
    return Math.abs(tempdate.getUTCFullYear() - 1970);
}

async function personByAge(index){

    const people = await getPeople();

    if(isNaN(index)){
        throw "input is not a number";
    }
    if(index>people.length || index<0){
        throw "index value is out of bounds";
    }

    people.sort((a, b) => {
        return new Date(a.date_of_birth) - new Date(b.date_of_birth);
    });

    const {first_name, last_name, date_of_birth} = people[index];
    return {first_name, last_name, date_of_birth, age: ageCalc(date_of_birth)};
}
const vowelCount = function vowelCount(text){
    var vow = text.match(/[aeiou]/gi);
    return (vow!=null) ? vow.length : 0;
}
const constCount = function constCount(text){
    var cons = text.match(/[bcdfghjklmnpqrstvwxzy]/gi);
    return (cons!=null) ? cons.length : 0;
}
const popCity = function popCity(val){

}

 
async function peopleMetrics(){
    const people = await getPeople();
    
    let vals= {};
    var frequency = {};
    var max = 0;
    var age = 0;
    var res;
    vals.totalLetters=0;
    vals.totalVowels=0;
    vals.averageAge=0;
    vals.totalConsonants=0;
    for (var person in people) {
        //console.log(people[person].first_name.length+people[person].last_name.length);
        //vals.totalLetters += people[person].first_name.length+people[person].last_name.length;
        vals.totalVowels += vowelCount(people[person].first_name+people[person].last_name);
        vals.totalConsonants += constCount(people[person].first_name+people[person].last_name);

        frequency[people[person].address.city] = (frequency[people[person].address.city] || 0)+1;
        if(frequency[people[person].address.city] > max) { 
            max = frequency[people[person].address.city]; 
            res = people[person].address.city;
        }
        //console.log(ageCalc(people[person].date_of_birth))
        age+=ageCalc(people[person].date_of_birth)
    }
    
    vals.totalLetters=vals.totalConsonants+vals.totalVowels
    vals.mostRepeatingCity=res;
    vals.averageAge=age/people.length;

    people.sort(function(a, b) {
        return (a.first_name.length+a.last_name.length) - (b.first_name.length+b.last_name.length);
    });

    vals.longestName=people[people.length-1].first_name+" "+people[people.length-1].last_name;
    vals.shortestName=people[0].first_name+" "+people[0].last_name;

    return vals;
}

module.exports = {getPeople, getPersonById, howManyPerState, personByAge, peopleMetrics};