// I pledge my honor that I have abided by the Stevens Honor System - Aparajita Rana
const axios = require('axios');
const { getPeople, getPersonById} = require('./people')

async function getWork() {
  const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/febcdd2ca91ddc685c163158ee126b4f/raw/c9494f59261f655a24019d3b94dab4db9346da6e/work.json')
  return data
}

async function listEmployees(){
    //const people = await getPeople();
    const work = await getWork();
    const people = await getPeople();
    var res = [];
    //var companyname = {};
   for(var temp in work){
       //this is only ONE company how would I save/keep adding all the lists
       const company = {
        company_name: work[temp].company_name, employees: [] };
       for(var index in work[temp].employees){
        const {first_name, last_name} = people.filter(person => person.id === work[temp].employees[index])[0]
        company.employees.push({first_name, last_name})             
        }
        res.push(company);
   }
   
   return res;
}

async function fourOneOne(phoneNumber){
    if (typeof phoneNumber !== 'string'){
        throw "Entered value is not a string"
    }
    if(phoneNumber === undefined){
        throw "Input can't be empty";
    }
    const numBreak = phoneNumber.split('-');

    if (numBreak.length !== 3 || numBreak[0].length !== 3 || numBreak[1].length !== 3 || numBreak[2].length !== 4){
        throw "Input not proper format"
    }

    const work = await getWork()
    var comp;
    for(var i = 0; i < work.length; i++){
    if(work[i].company_phone == phoneNumber){
        const {company_name, company_address} = work[i];
        return {company_name,company_address}
    }
    }

    if(!comp){
        throw "Invalid Phone Number"
    }
    //return {company_name, company_address};
}


async function whereDoTheyWork(ssn){
    if (typeof ssn !== 'string'){
        throw "Entered value is not a string"
    }
    if(ssn === undefined){
        throw "Input can't be empty";
    }
    const numBreak = ssn.split('-');

    if (numBreak.length !== 3 || numBreak[0].length !== 3 || numBreak[1].length !== 2 || numBreak[2].length !== 4){
        throw "Input not proper format"
    }

    const people = await getPeople();
    const work = await getWork();
    var id;
    var first_name;
    var last_name;
    var company;

    for(var temp in people){
        if(ssn==people[temp].ssn){
            first_name=people[temp].first_name
            last_name =people[temp].last_name
            id=people[temp].id
        }
    }
    for(var temp2 in work){
        for(var index in work[temp2].employees){
            var empId= work[temp2].employees[index];
            if(id==empId){
                company=work[temp2].company_name;
            }      
         }
    }
    if(!first_name || !last_name || !company){
        throw "that SSN doesn't exist"
    }
    return first_name+" "+last_name+" works at "+company+"."
    
}

module.exports = { getWork, listEmployees, fourOneOne, whereDoTheyWork }