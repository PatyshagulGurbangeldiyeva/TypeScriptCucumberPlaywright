// import { getGherkinScenarioLocationMap } from "@cucumber/cucumber/lib/formatter/helpers/gherkin_document_parser";
// import {page, bCtx} from "./hooks";
// import {Page} from "@playwright/test";
import fsExtra from 'fs-extra';
import { promisify } from 'util';


const mkdirAsync = promisify(fsExtra.mkdir);

export default class basePage {


    // downloading file and getting the title of the file
    public async downloadFile(locator: string):Promise <string> {
        await mkdirAsync("downloadedFiles", {recursive:true}); // creating directory where we are going to stor donwloaded files
    const download=await Promise.all([
        global.page.waitForEvent("download"),
        global.page.click(locator)
    ])    

    // const path=await download[0].path();
    // console.log(path);

    const filename:string=download[0].suggestedFilename();
    download[0].saveAs("./downloadedFiles/"+filename);
    //download[0].saveAs(filename);  >> it will download file current directory
    console.log("downloaded file: "+filename);

    return filename;

    }

    public async uploadFile(locator:string, fileLocation:string){
     //   await global.page.setInputFiles(locator, fileLocation);

     const [uploadFiles]=await Promise.all([
        global.page.waitForEvent("filechooser"),
        global.page.click(locator)
     ])

     const isMultiple=uploadFiles.isMultiple(); // this method checks does uploading files can upload multiple files at the same time
    console.log("upload file is multiple: "+isMultiple);
    
    if(isMultiple){
         uploadFiles.setFiles(["uploadFiles/lionpic.jpg", "uploadFiles/flower.jpg"]); // we are uploading multiple files
    }else {
        uploadFiles.setFiles(fileLocation);
    }
    }

    public async navigateToURL(url: string) {
        await global.page.goto(url);
    }

    public async click(locator: string) {
        await global.page.click(locator);
    }

    public async cleartextArea(locator: string): Promise<void> {
        await global.page.click(locator);
        await global.page.keyboard.press("Control+A");
        await global.page.keyboard.press("Backspace");
    }

    public async pressEsc() {
        await global.page.keyboard.press("Escape");
    }

    public async sleep(timeOut: number) {
        await global.page.waitForTimeout(timeOut);
    }

    public async enterValue(locator: string, val: string) {

        await global.page.fill(locator, val);
    }

    public async waitForUrl(url: string) {

        await global.page.waitForURL(url);
    }

    public async isVisible(locator: string): Promise<boolean> {
        return await global.page.isVisible(locator);
    }

    async getText(locator: string): Promise<string> {
        return (await global.page.innerText(locator)).trim();
    }

    //by providing url we are navigating to a new page
    public async navigateToSecondPage(url: string) {
        const newPage = await global.bCtx.waitForEvent('page');
        await newPage.goto(url);
        await newPage.waitForLoadState();
        global.page = newPage;
        await global.page.bringToFront();
    }

    //by clicking on a locator navigating to the new page
    public async newPage(locator: string) {

        const pagePromise = await global.bCtx.waitForEvent('page');
        await global.page.click(locator);
        const newPage = await pagePromise;

        console.log("new tab is opened and the title of the page is:" + await newPage.title());

        await global.page.waitForTimeout(5000);
        global.page = newPage;
        await global.page.bringToFront();

    }

    public async selectNewPageWithTitle(pageTitle: string) {
        const pages = global.page.context().pages();
        for (let i = 0; i < pages.length; i++) {
            if (pages[i].title === pageTitle) {
                console.log("title of the page: " + pages[i].title);
                global.page = pages[i];
                await global.page.bringToFront();
                break;
            }
        }
    }
    public async switchToParentPage() {

        console.log("the url of new page is: " + global.page.url());

        const pages = global.page.context().pages();  // this method returns array
        console.log("number of pages: " + pages.length);

        //getting urls of each opened tabs/pages
        console.log("opened pages urls are below: ");

        pages.forEach(tab => {
            console.log(tab.url())

        });

        global.page = pages[1];
        global.page.close();
        //switch to first opened page by providing index 0
        global.page = pages[0];

        //if you want to switch to desired url use below method
        // for (let index=0; index<pages.length; index++){
        //     let url:string=pages[index].url();
        //     if (url=="provide url"){
        //         global.page=pages[index];
        //     }
        // }


    }


    public async switchToURL(switchurl: string) {

        const pages = global.page.context().pages();  // this method returns array
        console.log("number of pages: " + pages.length);

        for (let index = 0; index < pages.length; index++) {
            let url: string = pages[index].url();
            if (url == switchurl) {
                global.page = pages[index];
            }
        }
    }


    //return array of string
    public async getTextInList(locators: any) {

        try {
            var content: string[] = new Array();
            var elements = await global.page.$$(locators);
            for (let index = 0; index < ElementInternals.length; index++) {
                content.push(await elements[index].innerText());
            }
            return content;
        } catch (error) {
            console.log(error);
        }
    }


    //return size of the list
    public async getLengthOfList(locators: any) {

        try {
            var content: string[] = new Array();
            var count = 0;
            var elements = await global.page.$$(locators);
            for (let index = 0; index < ElementInternals.length; index++) {
                content.push(await elements[index].innerText());
                count++;
            }
            return count;
        } catch (error) {
            console.log(error);
        }
    }



}