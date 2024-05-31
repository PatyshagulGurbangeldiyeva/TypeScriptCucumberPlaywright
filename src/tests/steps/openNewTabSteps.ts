import { Given, When, Then } from "@cucumber/cucumber";
import setUpClass from "../../../utils/setUpClass";
import {expect} from "@playwright/test";
import openNewTabPage from "../pages/openNewTabPage";


let openNewTabpg=new openNewTabPage();


Given('User clicks on Explore Our Emr button', async function () {
    await openNewTabpg.clickExploreEMRbtn();
  });



  Then('Verify user switched to a new tab {string} title', async function (string) {
   
   const actualText:string=(await openNewTabpg.getTextTheOpenMrsEMR());
   const expectedString:string="The OpenMRS EMR";

   console.log("the actual text is: "+actualText);

   expect(actualText).toContain(expectedString);
  });