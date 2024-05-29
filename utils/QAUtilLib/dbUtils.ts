//import sql from 'mssql';


 var sql=require("mssql");



var workSpaceConfig={
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

var conn="provide connection text";

export class dbUtils{



    async updateSomeData(query:any){
        await sql.connect(workSpaceConfig);
        await sql.query(query);
        await sql.close();
    }

    async  connectToDataBase(){
        try{
            const pool= await sql.connect({
                user:'usser_name',
                password:'your_password',
                server:'your_server',
                database:'your_database',
                options:{
                    encrypt:true, //for azure
                    trustServerCertificate:false //if you will run local change it to true
                }
    
            });
            console.log('connected to MSSQL');
            return pool;
        }catch(err){
            console.error("error connecting to databas", err);
            throw err;
        }
            
    }


    async getClientID(query:any){
        let pool=await sql.connect(workSpaceConfig);
        const result=await pool.request().query(query);
        await sql.close();
        return result.recordset[0].clientID;
    }

}





