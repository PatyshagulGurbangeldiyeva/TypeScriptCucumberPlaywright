import basePage from "../../../utils/basePage";
import{faker} from "@faker-js/faker";

export default class openMrsPage extends basePage{

    
    private tabs:string = "//div[@class='zak-top-bar__1']//a[contains(text(),'value')]";
    private communityHRF:string = "//*[@id='zak-masthead']//div[@class='zak-top-bar__1']//a[1]";
    private demoBtn:string= "//div//a[@class='zak-button']";
    private openMRSbtn:string = "//span[contains(text(),'Enter the OpenMRS 3 Demo')]";
    private Continue:string= "text=Continue";

    async navigateOpenMrsPage(url:string){
        await this.navigateOpenMrsPage(url);
    }

    async clickDemoBtn(){
        await this.click(this.demoBtn);
    }

    async clickEnterOpenMrsBtn(){
        await this.click(this.openMRSbtn);
    }
    async getTextContinueBtn():Promise<string>{
        return this.getText(this.Continue);
    }
}