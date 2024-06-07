import * as sql from 'mssql';  // or you can just import sql from "mssql";


 //var sql=require("mssql");



 // if you need to have connection via user credentials you can use below one
var workSpaceConfigPersonInfo={
    server:"provide server url",
    database:" database-qa",
    user:"paty@work.email",
    password:"Paty work pwd",
    authentication:{
        "type":"write the type here",
        "options":{
            "username":"paty credentials",
            "password":"paty pwd",
            "tenantID(some id if requred)":"write id here"
        },
    }
},
options:{
    encrypt:true, //for azure
    trustServerCertificate:false //if you will run local change it to true
}


const config={
    server: "serverNme",
    database:"databaseName",
    option:{
        encrypt:true,
        enableArithAbord:true,
        connectionTimeout:300000
    },
    authentication:{
        type:"write type of db",
        options:{
            clientId:"provideClientId",
            clientSecret:"provide client secret",
            tenantId:"provide tenant id, you can search in Azure DB and get it"
        },
    },
}



var conn="provide connection text"; // this coonection can be found in azure db

export class dbUtils{



    async updateSomeData(query:any){
        try{

            await sql.connect(workSpaceConfigPersonInfo);
            //or you can use
           // await sql.connect(config);
    
            //or you can use
            //await sql.connect(conn);
    
            await sql.query(query);
            await sql.close();

        }catch (error){
            console.log(error);
        }
     
    }


    async getClientID(query:any){

        try{
            let pool=await sql.connect(conn);
            const result=await pool.request().query(query);
            await sql.close();
            return result.recordset[0].clientID;

        }catch (error){
            console.log(error);
        }
       
    }

}





