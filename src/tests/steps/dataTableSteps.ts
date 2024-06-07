import { Given,When,Then } from "@cucumber/cucumber";
import dataTablePage from "../pages/dataTablePage";


let dataTablePg=new dataTablePage();

Given('User clicks What We Do drop down', async function () {

    await dataTablePg.clickWhatWeDoDropDown();
    await dataTablePg.sleep(5000);
  });


  Then('User sees three available options', async function (dataTable) {
    
    const data=dataTable.hashes();

    const optionsFromFeature: string[] = [];
    for (const row of data){
        
        let opt=row.options;
        console.log("option from feature file from the loop: "+opt);

        await optionsFromFeature.push(opt);     

        
    }

    console.log("options from array feature file: "+optionsFromFeature);

    const optionsFromUI: string[] = [];
    const actualAcademy:string=await dataTablePg.getTextAcademyOption();
    console.log("actual for academy option from ui: "+actualAcademy);
     await optionsFromUI.push(actualAcademy);

     const optionConference:string =await dataTablePg.getTextConference2023Option();
     console.log("actual for conference option ui: "+optionConference);
     await optionsFromUI.push(await dataTablePg.getTextConference2023Option());

     const optionBlog:string=await dataTablePg.getTextBlogOption();
     console.log("actual for blog from UI: "+optionBlog);
     await optionsFromUI.push(optionBlog);
    

     dataTablePg.compareArrays(optionsFromFeature,optionsFromUI);
  });



