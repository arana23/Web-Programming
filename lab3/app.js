const people = require("./people");
const work = require("./work");

async function main(){
    try{
        //const peopledata = await people.peopleMetrics();
        const workdata = await work.listEmployees()
        console.log(workdata);
        //console.log("hi")
    }
    catch(e){
        console.log(e);
    }
}

main();