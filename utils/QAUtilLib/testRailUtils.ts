import fs from 'fs';
import path from 'path';
import FormData from 'form-data';
import axios from 'axios';


//config for test rail
const testRailConfig = {
    host: "https://companyName.testrail.io",
    user: "user@companyName.com",
    apikey: "kdjflsjflkds",
  //  projectid: 1, // replace with your project id (you can find your project id in test rail)
   // testRunID: 1222  // replace with your suire id (you can find your project id in test rail)
};

const auth = Buffer.from('${testRailConfig.user}:${testRailConfig.apikey}').toString('base64');



export class testRailUtil {

    //axios library is used for API. This method is just uploading screenshot to TestRail
    async uploaScreenshotToTestRail(resultId: number, filePath: string) {
        //const url = testRailConfig.host + "/index.php?/api/v2/add_attachment_to_result/" + resultId;
        const url=`${testRailConfig.host}//index.php?/api/v2/add_attachment_to_result/${resultId}`;
        const auth = Buffer.from(testRailConfig.user + ":" + testRailConfig.apikey).toString('base64');

        const formData = new FormData();
        formData.append('attachment', fs.createReadStream(filePath), path.basename(filePath));

        try {
            const response = await axios.post(url, formData, {
                headers: {
                    'Authorization': 'Basic' + auth,
                    ...formData.getHeaders(),

                },
            });

            if (response.status != 200) {
                console.error('failed to upload screenshot: ' + response.statusText);
                console.error('server response: ' + response.data);
            } else {
                console.log("screenshot uploaded successfully");
            }

        } catch (error) {
            console.error(`error uploading screenshot to test rail:${error}`);
        }
    }


    //this method uses Playwright API call, and calling above "uploaScreenshotToTestRail" method in it, to update TR with status and attaching screenshot
    async uploadTestResultWithScreenshot(caseId: number, statusID: number, comment: any, screenshotPath: string, testrunID:any) {
        try {
            //1. upload test result to test rail
            const resultResponse = await global.req.post(
               // `${testRailConfig.host}/index.php?/api/v2/add_result_for_case/${testRailConfig.testRunID}/${caseId}`
                `${testRailConfig.host}/index.php?/api/v2/add_result_for_case/${testrunID}/${caseId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Basic${auth}`,
                    },
                    data: {
                        status_id: statusID,
                        comment: comment,
                    },
                }
            );

            if (!resultResponse.ok()) {
                throw new Error(`failed to upload test result: ${resultResponse.statusText()}`);
            }

            const result = await resultResponse.json();
            const resultID = result.id;

            //2. attach the screenshot to the test resutl in test rail

            await this.uploaScreenshotToTestRail(resultID, screenshotPath);
        } catch (error) {
            console.error(`error in uploading result or screenshot : ${error}`);
        }
    }


    //this method uses Playwright API but attaching screenshot does not work with Playwithg API
    async uploaScreenshotToTestRail1(resultId: number, filePath: string):Promise <void> {
      //  const url = testRailConfig.host + "/index.php?/api/v2/add_attachment_to_result/" + resultId;
        const url= `${testRailConfig.host}/index.php?/api/v2/add_attachment_to_result/${resultId}`;
        
        const formData = new FormData();
        formData.append('attachment', fs.createReadStream(filePath), path.basename(filePath));

        try {
            const response = await global.request.post(url,  {
              data:formData,
              headers:{
                ...formData.getHeaders(),
              }
            });

            if (response.ok()) {
                console.log('screenshot uploaded to TR sucessfully');
                
            } else {
                console.error("failed to upload screenshot to TR");
                console.error( `server response:${await response.text()}`);
            }

        } catch (error) {
            console.error(`error uploading screenshot to test rail: ${error}`);
        }
    }

    //this method uses Playwright method, where we just updating TR with pass, we are not attaching any screenshots
    async uploadTestResult(caseId:number, statusId:number, comment:any, trrunID:any){
        try{

            //1. upload the test result to test rail
            const resultResponse=await global.req.post(
                //testRailConfig.host+'/index.php?/api/v2/add_result_for_case/'+testRailConfig.testRunID+"/"+caseId,
                `${testRailConfig.host}/index.php?/api/v2/add_result_for_case/${trrunID}/${caseId}`,
                {
                    headers:{
                        'Content-Type':'application/json',
                       // 'Authorization':'Basic'+auth
                       'Authorization':`Basic ${auth}`,
                    },
                    data:{
                        status_id:statusId,
                        comment:comment
                    },
                }
            );

            if(!resultResponse.ok()){
                throw new Error("failed to upload test result: "+resultResponse.statusText);
            }

        }catch (error){
            console.error("failed to upload test result: "+error);
        }
    }

  



    







}