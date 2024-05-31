import basePage from "../../../utils/basePage"

export default class openNewTabPage extends basePage{

private exploreOurEmr:string="text=Explore Our EMR";
private theOpenMrsEmrText:string="//h3[@class='elementor-image-box-title']//b";




async  clickExploreEMRbtn(){

    await this.newPage(this.exploreOurEmr);
}

async getTextTheOpenMrsEMR():Promise<string>{
    return this.getText(this.theOpenMrsEmrText);
}







}