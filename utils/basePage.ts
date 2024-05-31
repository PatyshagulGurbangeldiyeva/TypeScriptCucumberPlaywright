import { getGherkinScenarioLocationMap } from "@cucumber/cucumber/lib/formatter/helpers/gherkin_document_parser";
import {page, bCtx} from "./hooks";
import {Page} from "@playwright/test";

export default class basePage{
    currentpage: Page;

    constructor(page:Page){
        this.currentpage = page;
    }

async navigateToURL(url:string){
    await page.goto(url);
}

async click(locator:string){
    await page.click(locator);
}

async cleartextArea(locator:string):Promise<void>{
    await page.click(locator);
    await page.keyboard.press("Control+A");
    await page.keyboard.press("Backspace");
}

async pressEsc(){
    await page.keyboard.press("Escape");
}

async sleep(timeOut:number){
    await page.waitForTimeout(timeOut);
}

async enterValue(locator:string, val:string){

    await page.fill(locator, val);
}

async waitForUrl(url:string){

    await page.waitForURL(url);
}

async isVisible(locator:string):Promise<boolean>{
    return await page.isVisible(locator);
}

async getText(locator:string):Promise<string>{
    return (await page.innerText(locator)).trim();
}

async newPage(locator:string){

    page.click(locator);
    const [newPage]=await Promise.all
    (
        [
            await bCtx.waitForEvent("page")

        ]
    )
    await newPage.waitForLoadState();

    await newPage.click(locator);

    await newPage

}

/**
   * Navigates to the login page,
   * sets the callback URL to redirect to after login.
   * After login is successful, authentication will auto redirect to callbackUrl.
   */
async navigate(callbackUrl: string) {
    this.url = callbackUrl;
    await this.page.goto(this.url);
  }

  
}