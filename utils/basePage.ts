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


  
}