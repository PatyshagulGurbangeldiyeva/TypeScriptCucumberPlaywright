import { Given, When, Then } from "@cucumber/cucumber";
import setUpClass from "../../../utils/setUpClass";
import {expect} from "@playwright/test";
import openMrsPage from "../pages/openMrsPage";
import { emailUtils } from "../../../utils/QAUtilLib/emailUtils";

let _emailUtils=new emailUtils();



Given('User deletes all emails from gmail account', async function () {
    
    await _emailUtils.deleteAllEmails();
  })

Given('User gets  {string} subject mail in his box', async function (subject: string) {
    let htmltext=await _emailUtils.readEmailBody(subject, "jesicatestemail@gmail.com", "Test@123", "imap.gmail.com");
    let body = await _emailUtils.getBodyText(htmltext);

    expect(body).toContain(subject);
})
  