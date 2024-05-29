import {page} from "../hooks";

export class apiUtils{

async APIGET(content:string, status1:number, testUrl:any, testPath:any)
{
    await page.route("**Get**", async (route)=>{

        await route.fulfill({ contentType:content,status:status1,path:testPath });

    });

    const resp=await page.evaluate(async({ testUrl, testPath})=>
        await(
            await fetch(testUrl+testPath,{
                method:"GET"
            })
        ).json(),{testUrl,testPath}
    );
    console.log(resp);
    
    return resp;
    

}


async APIStatus(
    testUrl:any,
    testPath:any
){
    const resp=await page.evaluate(async ({testUrl, testPath})=> 
        await ( 
            await(await fetch(testUrl+testPath)).status
        ), {testUrl, testPath}
    );
    return resp;
}


async APIPOST(content:string, status2:number, testUrl:any, testPath:any, body:any){


    await page.route("**Post**", async (route)=>{

        await route.fulfill({ contentType:content,status:status2,path:testPath });

    });

    const resp=await page.evaluate(async({ testUrl, testPath, body})=>
        await(
            await fetch(testUrl+testPath,{
                method:"POST"
            })
        ).json(),{testUrl,testPath,body}
    );
    console.log(resp);
    
    return resp;


}
    

async APIPUT(content:string, status2:number, testUrl:any, testPath:any, body:any){


    await page.route("**Put**", async (route)=>{

        await route.fulfill({ contentType:content,status:status2,path:testPath });

    });

    const resp=await page.evaluate(async({ testUrl, testPath, body})=>
        await(
            await fetch(testUrl+testPath,{
                method:"Put",
                body:JSON.stringify(body)
            })
        ).json(),{testUrl,testPath,body}
    );
    console.log(resp);
    
    return resp;


}



async APIDELETE(content:string, status2:number, testUrl:any, testPath:any){


    await page.route("**Delete**", async (route)=>{

        await route.fulfill({ contentType:content,status:status2,path:testPath });

    });

    const resp=await page.evaluate(async({ testUrl, testPath})=>
        await(
            await fetch(testUrl+testPath,{
                method:"DELETE"
            })
        ).json(),{testUrl,testPath}
    );
    console.log(resp);
    
    return resp;


}


}