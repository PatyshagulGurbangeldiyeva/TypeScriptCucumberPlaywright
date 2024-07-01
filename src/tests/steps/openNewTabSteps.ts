import { Given, When, Then } from "@cucumber/cucumber";
import setUpClass from "../../../utils/setUpClass";
import {expect} from "@playwright/test";
import openNewTabPage from "../pages/openNewTabPage";
import dataTablePage from "../pages/dataTablePage";


let openNewTabpg=new openNewTabPage();
let dataTablePg=new dataTablePage();


Given('User clicks on Explore Our Emr button', async function () {
    await openNewTabpg.clickExploreEMRbtn();
  });



  Then('Verify user switched to a new tab {string} title', async function (value:string) {
   
   const actualText:string=(await openNewTabpg.getTextTheOpenMrsEMR());
   const expectedString:string=value; //"The OpenMRS EMR";

   console.log("the actual text is: "+actualText);

   expect(actualText).toContain(expectedString);
  });



Then('User switches back to first page', async function ()  {
  await openNewTabpg.switchToParentPage();
  await openNewTabpg.sleep(5000);
})

Then('User sees three available buttons on OpenMRS main page', async function (dataTable) {
  
  const data=dataTable.hashes();

  const optionsFromFeature: string[] = [];
  for (const row of data){
      
      let opt=row.options;
      console.log("option from feature file from the loop: "+opt);

      await optionsFromFeature.push(opt);     

      
  }

  console.log("options from array feature file: "+optionsFromFeature);

  const optionsFromUI: string[] = [];
  const exploreOurEMRbtn:string=await openNewTabpg.getTextExploreOurEMRbtn();
  console.log("actual for exploreOurEMR button from ui: "+exploreOurEMRbtn);
   await optionsFromUI.push(exploreOurEMRbtn);

   const joinOurCommunityBtn:string =await openNewTabpg.getTextjoinOurCommunityBtn();
   console.log("actual for joinOurCommunityBtn button ui: "+joinOurCommunityBtn);   
   await optionsFromUI.push((joinOurCommunityBtn));

   const learnInOurAcademybtn:string=await openNewTabpg.getTextlearnInOurAcademybtn();
   console.log("actual for learnInOurAcademybtn from UI: "+learnInOurAcademybtn);
   await optionsFromUI.push(learnInOurAcademybtn);
  

   dataTablePg.compareArrays(optionsFromFeature,optionsFromUI);
})
