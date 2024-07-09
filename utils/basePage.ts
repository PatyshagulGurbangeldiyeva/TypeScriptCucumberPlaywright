// import { getGherkinScenarioLocationMap } from "@cucumber/cucumber/lib/formatter/helpers/gherkin_document_parser";
// import {page, bCtx} from "./hooks";
// import {Page} from "@playwright/test";

export default class basePage{
   

  

async navigateToURL(url:string){
    await global.page.goto(url);
}

async click(locator:string){
    await global.page.click(locator);
}

async cleartextArea(locator:string):Promise<void>{
    await global.page.click(locator);
    await global.page.keyboard.press("Control+A");
    await global.page.keyboard.press("Backspace");
}

async pressEsc(){
    await global.page.keyboard.press("Escape");
}

async sleep(timeOut:number){
    await global.page.waitForTimeout(timeOut);
}

async enterValue(locator:string, val:string){

    await global.page.fill(locator, val);
}

async waitForUrl(url:string){

    await global.page.waitForURL(url);
}

async isVisible(locator:string):Promise<boolean>{
    return await global.page.isVisible(locator);
}

async getText(locator:string):Promise<string>{
    return (await global.page.innerText(locator)).trim();
}

async newPage(locator:string){

    global.page.click(locator);
    const [newPage]=await Promise.all
    (
        [
            await global.bCtx.waitForEvent("page")

        ]
    )

    await newPage.waitForLoadState();
    console.log("new tab is opened and the title of the page is: "+await newPage.title());

    await newPage.waitForTimeout(5000)
    global.page=newPage;
    await global.page.bringToFront();

    }

    async switchToParentPage() {

        console.log("the url of new page is: " + global.page.url());

        const pages = global.page.context().pages();  // this method returns array
        console.log("number of pages: " + pages.length);

        //getting urls of each opened tabs/pages
        console.log("opened pages urls are below: ");
        
        pages.forEach(tab => {
            console.log(tab.url())

        });

        global.page=pages[1];
        global.page.close();
        //switch to first opened page by providing index 0
        global.page=pages[0];

        //if you want to switch to desired url use below method
        // for (let index=0; index<pages.length; index++){
        //     let url:string=pages[index].url();
        //     if (url=="provide url"){
        //         global.page=pages[index];
        //     }
        // }


    }


    public async swithToURL(switchurl:string){

        const pages = global.page.context().pages();  // this method returns array
        console.log("number of pages: " + pages.length);
         
        for (let index=0; index<pages.length; index++){
            let url:string=pages[index].url();
            if (url==switchurl){
                global.page=pages[index];
            }
        }
    }


    //return array of string
    public async getTextInList(locators:any){

        try{
            var content:string[]=new Array();
            var elements=await global.page.$$(locators);
            for(let index=0; index<ElementInternals.length; index++){
                content.push(await elements[index].innerText());
            }
            return content;
        }catch (error){
            console.log(error);
        }
    }


    //return size of the list
    public async getLengthOfList(locators:any){

        try{
            var content:string[]=new Array();
            var count=0;
            var elements=await global.page.$$(locators);
            for(let index=0; index<ElementInternals.length; index++){
                content.push(await elements[index].innerText());
                count++;
            }
            return count;
        }catch (error){
            console.log(error);
        }
    }
  
}