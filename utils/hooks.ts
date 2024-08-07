import {BeforeAll, AfterAll, Before, After, setDefaultTimeout, Status, BeforeStep, AfterStep} from "@cucumber/cucumber";
import {Browser, BrowserContext, Page, chromium, firefox, webkit, request} from "playwright";
import setUpClass from "../utils/setUpClass";
import dotenv from 'dotenv';
import commonMethods from "./commonMethods";
import path from 'path';
//import {request} from from "playwright";
import { testRailUtil } from "./QAUtilLib/testRailUtils";
import filterPlugin from "@cucumber/cucumber/lib/filter";





setDefaultTimeout(1000*60*2);
let _commanMethods=new commonMethods();
let _testRailUtil=new testRailUtil();
let videoPath;
const passedVideoDir=path.join(__dirname, '../videos/passed');
const failedVideoDir=path.join(__dirname, '../videos/failed');
const tempVidoeDir=path.join(__dirname, '../videos/temp');



// let browser:Browser;
// let bCtx:BrowserContext;
// let page:Page;

BeforeAll(async function(){
    
    
    setUpClass.testSetUp();

// get data from env file
   dotenv.config({path:process.cwd()+"/configs/.env."+process.env.npm_config_env});
   dotenv.config(); //is going to get path from root directory
   let browserType:string=process.env.browser!;

    // let browserType:string=setUpClass.browser;
    console.log("the browser type is: "+browserType);

    switch (browserType){
        case 'chrome':
        case'gc':
        global.browser=await chromium.launch({headless:false, channel:'chrome', args:['--start-maximized']});
        break;
        case 'firefox':
            case 'ff':
                global.browser=await firefox.launch({headless:false, args:['--start-maximized']}); 
                break;                
        case 'edge':
            case 'msedge':
                global.browser=await chromium.launch({headless:false, channel:'msedge', args:['--start-maximized']});
                break;
        case 'webkit':
            case 'safari':
                global.browser=await webkit.launch({headless:false, args:['--start-maximized']});
                break;
        default:
           throw new Error('Invalid browser type: '+browserType+' is passed');

    }

    global.req=await request.newContext();
});

Before(async function(scenario){

    global.bCtx=await global.browser.newContext({
        viewport:null, 
        javaScriptEnabled:true, // if you do not need recording of the scenarios you can remove recordVideo below
        recordVideo:{
            mode:'retain-on-failure',
            dir:tempVidoeDir,
            size:{width:1280,height:720}
        }

    });
    
    global.page=await global.bCtx.newPage();
    
    //page.goto(setUpClass.url);  >> if all your scenarios have same url for navigation you can declare navigation here (uncomment it)

    this.log( "Scenario title: "+scenario.pickle.name); // this going to add log to html cucumber report
    console.log("----------------------------------scenario title: "+scenario.pickle.name+"--------------------------");
    console.log();
});

// BeforeStep(async function (scenario){
//     this.log("step started: "+scenario.pickle.name);
//     console.log("step started: "+scenario.pickle.name);
// });

// AfterStep(async function(scenario){
//     this.log("step ended: "+scenario.pickle.name);
//     console.log("step ended: "+scenario.pickle.name);
// });

After (async function(scenario){

    let uniqueDate:string=await _commanMethods.getTodayDate()+"_"+await _commanMethods.getCurrentTime();
   
   // var for Test Run 
    var tags=scenario.pickle.tags.map(tag=>tag.name); // getting runned tags
    var scenarioName=scenario.pickle.name;
    var testRunID;
    let testRunEnable:boolean=await _commanMethods.parseStringToBoolean(process.env.testRunEnable!);
   // let testRunEnable:boolean= JSON.parse(process.env.testRunEnable!);  >> or you can use directly this one
   console.log("test run enabled: "+testRunEnable+" and the type is: "+typeof testRunEnable);
    let matches:any=scenario.pickle.name.match(/C\d+/g); //getting scenario name from cucumber file (in test rail test case start with "C", so that is why we are removing "C" from the titile)



    if (scenario.result?.status==Status.PASSED){
       // const img = await global.page.screenshot({path: "./screenshots/passed/"+todayDateString+"_"+timeString+scenario.pickle.name+".png"});
       let img_path='./screenshots/passed/'+uniqueDate+"_"+scenario.pickle.name+'.jpg';
       const img=await global.page.screenshot(({path:img_path}));
       this.attach(img,'image/jpg');  // this should attach screenshot to cucumber html report


        if (testRunEnable) {
            if (tags.includes("Project 1")) {
                testRunID = parseInt(process.env.testRunID!);
                console.log("test run id for project 1 is: " + testRunID);
                //upload result to test rail
                for (const match of matches) {
                    await _testRailUtil.uploadTestResult(match.replace("C", ""), 1, "Passed", testRunID);
                }
            } else if(tags.includes("Project2")){
                testRunID = parseInt(process.env.testRunID2!);
                console.log("test run id for project 2 is: " + testRunID);
                //upload result to test rail
                for (const match of matches) {
                    await _testRailUtil.uploadTestResult(match.replace("C", ""), 1, "Passed", testRunID);
                }
            }

       }
      

       // we need to close the page and browserContext then video recording is working
       await global.page.close();
       await global.bCtx.close();

       videoPath=await global.page.video().path();
       if(videoPath){
        await _commanMethods.removeFile(videoPath);
       }
        
    }else{
        //const img = await global.page.screenshot({path: "./screenshots/failed/"+todayDateString+"_"+timeString+scenario.pickle.name+".png"});

        let img_path='./screenshots/failed/'+uniqueDate+"_"+scenario.pickle.name+'.png'; //'.jpg'
        const img=await global.page.screenshot(({path:img_path}));
        this.attach(img,'image/png');

        if(testRunEnable){
            if (tags.includes("project 1")) {
                testRunID = parseInt(process.env.testRunID!);
                console.log("test run id for project 1 is: " + testRunID);
                //upload result to test rail
                for (const match of matches) {
                    await _testRailUtil.uploadTestResultWithScreenshot(match.replace("C", ""), 8, scenario.result?.message, img_path, testRunID);
                };
            }else if(tags.includes("project 2")){
                testRunID = parseInt(process.env.testRunID2!);
                console.log("test run id for project 2 is: " + testRunID);
                //upload result to test rail
                for (const match of matches) {
                    await _testRailUtil.uploadTestResultWithScreenshot(match.replace("C", ""), 8, scenario.result?.message, img_path, testRunID);
                };
            }
        }
      

       await global.page.close();
       await global.bCtx.close();

       videoPath=await global.page.video().path();
       if(videoPath){

        try{
        const fileName=path.basename(videoPath); //extract original file name
        const finalDir=scenario.result?.status===Status.FAILED?failedVideoDir+"/"+scenario.pickle.name:passedVideoDir;
        const finalPath=path.join(finalDir,fileName);
        const dir=path.dirname(finalPath);
        await _commanMethods.mkDir(dir, true);

        //copy file to destination with the same title
        await _commanMethods.copyFile(videoPath, finalPath);
        console.log("video is vopied to : "+finalPath);

        // after coping the file we are removing it
        await _commanMethods.removeFile(videoPath);
        console.log("vide file removed: "+videoPath);

       }catch (error){
        console.error("error for video record :"+error);
       }
        
       }
    }
    


    // we have added this closing above after uploading results to test rail. If there is not test rail cong, you can keep them here
    // await global.page.close();
    // await global.bCtx.close();

});

AfterAll(async function(){

    await global.browser.close();
    await _commanMethods.clearDirectory(tempVidoeDir);
    await _commanMethods.clearDirectory("downloadedFiles");

});

// export{page};


// export function getPage():Page{
    
//     return page;
// }