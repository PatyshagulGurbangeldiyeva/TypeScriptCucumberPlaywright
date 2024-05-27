import {BeforeAll, AfterAll, Before, After, setDefaultTimeout, Status} from "@cucumber/cucumber";
import {Browser, BrowserContext, Page, chromium, firefox} from "playwright";
import setUpClass from "../utils/setUpClass";
import dotenv from 'dotenv';



setDefaultTimeout(1000*60*2);

let browser:Browser;
let bCtx:BrowserContext;
let page:Page;

BeforeAll(async function(){
    setUpClass.testSetUp();

//     get data from env file
   dotenv.config({path:process.cwd()+"/configs/.env."+process.env.npm_config_env});
   dotenv.config(); //is going to get path from root directory
   let browserType:string=process.env.browser!;

    // let browserType:string=setUpClass.browser;
    console.log("the browser type is: "+browserType);

    switch (browserType){
        case 'chrome':
        case'gc':
        browser=await chromium.launch({headless:false, channel:'chrome', args:['--start-maximized']});
        break;
        case 'firefox':
            case 'ff':
                browser=await chromium.launch({headless:false, channel:'firefox', args:['--start-maximized']}); 
                break;                
        case 'edge':
            case 'msedge':
                browser=await chromium.launch({headless:false, channel:'msedge', args:['--start-maximized']});
                break;
        default:
           throw new Error('Invalid browser type: '+browserType+' is passed');

    }

});

Before(async function(scenario){

    bCtx=await browser.newContext({viewport:null, javaScriptEnabled:true});
    page=await bCtx.newPage();
    
    //page.goto(setUpClass.url);

    this.log( "Scenario title: "+scenario.pickle.name);

});

After (async function(scenario){

    this.attach("scenario ended: "+scenario.pickle.name+" and scneario status is :"+scenario.result?.status);


    if (scenario.result?.status==Status.PASSED){
        const img = await page.screenshot({path: "./screenshots/passed/"+scenario.pickle.name+".png"});
        this.attach(img,'image/png');
    }else{
        const img = await page.screenshot({path: "./screenshots/failed/"+scenario.pickle.name+".png"});
        this.attach(img,'image/png');
    }
    


    await page.close();
    await bCtx.close();

});

AfterAll(async function(){

    await browser.close();

});

export{page};

// export function getPage():Page{
    
//     return page;
// }