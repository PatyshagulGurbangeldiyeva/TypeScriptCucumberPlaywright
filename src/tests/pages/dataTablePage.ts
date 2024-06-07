import basePage from "../../../utils/basePage";

export default class dataTableSteps extends basePage{


    private whatWeDoDropDown:string="#menu-item-1400>a";
    private academyOption:string="#menu-item-10929";
    private conference2023Option:string="#menu-item-9685>a";
    private blogOption:string="#menu-item-5792>a";



    async clickWhatWeDoDropDown(){
        await this.click(this.whatWeDoDropDown);
    }

    async getTextAcademyOption():Promise<string>{
        return await this.getText(this.academyOption);
    }

    async getTextConference2023Option():Promise<string>{
        return await this.getText(this.conference2023Option);
    }

    async getTextBlogOption():Promise<string>{
        return await this.getText(this.blogOption);
    }


    async compareArrays<T>(arr1: T[], arr2: T[]): Promise<boolean>{
        if (arr1.length !== arr2.length) {
            console.log("the lenght of arrays are not matching");
            return false;
            
        }
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) {
                console.log("the option order is not matching");
                return false;
                
            }
        }
        return true;
    }
















}

