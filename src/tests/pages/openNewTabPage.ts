import basePage from "../../../utils/basePage"

export default class openNewTabPage extends basePage{

private exploreOurEmr:string="text=Explore Our EMR";
private theOpenMrsEmrText:string="//h3[@class='elementor-image-box-title']//b";
private exploreOurEMRbtn:string="text=Explore Our EMR";
private joinOurCommunityBtn:string="text=Join Our Community";
private learnInOurAcademybtn:string="text=Learn in Our Academy";




async  clickExploreEMRbtn(){

    await this.newPage(this.exploreOurEmr);
}

async getTextTheOpenMrsEMR():Promise<string>{
    return await this.getText(this.theOpenMrsEmrText);
}

async getTextExploreOurEMRbtn():Promise <string>{
    return await this.getText(this.exploreOurEMRbtn);
}

async getTextjoinOurCommunityBtn():Promise<string>{
    return await this.getText(this.joinOurCommunityBtn);
}

async getTextlearnInOurAcademybtn():Promise<string>{
    return await this.getText(this.learnInOurAcademybtn);
}




}