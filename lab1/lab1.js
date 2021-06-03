//I pledge my honor that I have abided by the Stevens Honor System - Aparajita Rana

const { promises } = require("fs");

const questionOne = function questionOne(arr) {
    // Implement question 1 here
    
    if(arr == undefined){
        return {};
    }
    if(arr.length==0){
        return {};
    }
    
    let prime={};

    for(let x = 0; x < arr.length; x++){
        let num = arr[x];
        let temp = true;
        //base cases 
        if(num == 0 || num == 1){
            temp = false;
        }
        //check if divisable by anything -> if it is then not prime ret false
        else{
            for(let y = 2; y <= num/2; y++){
                if(num%y == 0){
                    temp = false;
                }
            }
        }
        //set the res into the right place
        prime[num] = temp ? true : false;
    }
    return prime;
}

const questionTwo = function questionTwo(arr) { 
    // Implement question 2 here

    if(arr.length===0 || arr==undefined){
        return 0;
    }
    
    let myNumArraySquared = arr.map((x) => {
        return x * x;
      });
    
    let sum = myNumArraySquared.reduce((a, b) => a + b, 0);
    let temp = Math.sqrt(Math.pow(sum, 5));

    //toFixed returns string -> we want number
    return Number(temp.toFixed(2));

}

const questionThree = function questionThree(text) {
    // Implement question 3 here
    let vals= {consonants: 0,  vowels: 0,  numbers: 0, spaces: 0,  punctuation: 0, specialCharacters: 0}
    if(text.length<=0 || text==undefined){
        return vals;
    }

    // regex format: g -> string i -> ignores case
    var vow = text.match(/[aeiou]/gi);
    vals.vowels = (vow!=null) ? vow.length : 0;

    var num = text.match(/[01233456789]/gi);
    vals.numbers = (num!=null) ? num.length : 0;

    vals.spaces = (text.split(" ").length - 1);

    var punc = text.match(/[.,':;!?]/gi);
    vals.punctuation = (punc!=null) ? punc.length : 0;

    var spec = text.match(/[@#$%^&*]/gi);
    vals.specialCharacters = (spec!=null) ? spec.length : 0;

    var cons = text.match(/[bcdfghjklmnpqrstvwxzy]/gi);
    vals.consonants = (cons!=null) ? cons.length : 0;

    return vals;
}

const questionFour = function questionFour(num1, num2, num3) {
    // Implement question 4 here
    if(num1<0 || num2<0 || num3<0){
        return -1;
    }

    // Loan Payment (P) = Amount (A) / Discount Factor (D)
	var rate = (num2 / 100) /12;
	var mon = num3 * 12;
    var temp = Math.pow((1+rate), mon);
    
    if (rate === 0) {
        var res = num1 / mon;
        return parseFloat(res.toFixed(2), 10);
    } 
    else {
        var res2 = (num1 * rate * temp) / (temp - 1);
        return parseFloat(res2.toFixed(2), 10);
	}
}

module.exports = {
    firstName: "Aparajita", 
    lastName: "Rana", 
    studentId: "10440384",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};