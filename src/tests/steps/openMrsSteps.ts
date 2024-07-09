import { Given, When, Then } from "@cucumber/cucumber";
import setUpClass from "../../../utils/setUpClass";
import {expect} from "@playwright/test";
import openMrsPage from "../pages/openMrsPage";
import {dbUtils }from "../../../utils/QAUtilLib/dbUtils";


let openMrsPg:openMrsPage=new openMrsPage();



  Given('User navigates to OpenMrs page', async function () {
    await openMrsPg.navigateToURL(setUpClass.url);
    
  });

  Given('User clicks on Demo button', async function () {
    await openMrsPg.clickDemoBtn();
  });

 

  When('User clicks on Enter the OpenMRS Demo button', async function () {
    await openMrsPg.clickEnterOpenMrsBtn();
  });

 

  Then('User navigate to Login page of Open MRS', async function () {

    console.log("user is in login page");
    const expected:string="Continue";
    const actual:string= await openMrsPg.getTextContinueBtn();
    console.log("actual btn is: "+actual);
    expect(actual).toBe(expected);
  });

  Given('after providing credentials user authenticate himself', async function() {
    
    /*
    1. you  need to instal otplib
    2. then you need to import it to the step class where you are going to use as "import{authenticator} from 'otplib'"
    3. generate method under this step:
    await provideCredentials()
    const token authenticator.generate('sharedSecret that company will provide');
    await provideTokenToUIBox(token);
    await clickOK();
    */
  })