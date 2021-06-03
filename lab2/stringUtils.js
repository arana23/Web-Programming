// I pledge my honor that I have abided by the Stevens Honors System - Aparajita Rana
const StringErrorCheck = (str) => {
    if(str==null || str==undefined){
        throw "Parameter doesn't exist";
    }
    if (typeof str != 'string'){
        throw "Wrong type";
    }
    if(str.length<=0){
        throw "string not long enough"
    }
    if(str==' ' || str==''){
        throw "empty input"
    }
}

const camelCase = function camelCase(string){
    StringErrorCheck(string)
    string = string.toLowerCase();
    let words = string.split(' ');
    let val = ''
    for(let i = 0; i < words.length; i++){
        if(i!=0){
            val+=words[i].charAt(0).toUpperCase() + words[i].slice(1)
        }
        else{
            val+=words[i]
        }
    }
    return val;
}

const replaceChar = function replaceChar(string){
    StringErrorCheck(string)
    
    let first = string.charAt(0).toLowerCase();
    let res = string.charAt(0)
    let temp = "*"

    for (var i = 1; i < string.length; i++) {
        if(first == string.charAt(i).toLowerCase()){
            res+=temp
            if(temp=="*"){
                temp="$"
            }
            else{
                temp="*"
            }
        }
        else{
            res+=string.charAt(i)
        }
      }
      return res
}

const mashUp = function mashUp(string1, string2){
    StringErrorCheck(string1)
    StringErrorCheck(string2)

    if(string1.length<2 || string2.length<2){
        throw "lengths don't meet requirement"
    }

    return string2.slice(0,2)+string1.slice(2)+" "+string1.slice(0,2)+string2.slice(2)
}

module.exports = {camelCase, replaceChar, mashUp}
