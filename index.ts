import dotenv from 'dotenv';
import setUpClass from './utils/setUpClass';

var reporter = require('cucumber-html-reporter');

var options = {
        theme: 'bootstrap',
        jsonFile: 'reports/cucumber_report.json',
        output: 'reports/cucumber_report_bootstrap.html',
        reportSuiteAsScenarios: true,
        scenarioTimestamp: true,
        launchReport: false,
        metadata: {
            // "App Version":"0.3.2",
            // "Test Environment": "STAGING",
            // "Browser": "Chrome  54.0.2840.98",
            // "Platform": "Windows 10",
            // "Parallel": "Scenarios",
            // "Executed": "Remote"
            browser:"",
            url:"",
            testEnv:""
        },
        failedSummaryReport: true,
    };

    function generateHtmlReport(){

        // //getting info from env file and inserting it to medatada above
        dotenv.config({path:process.cwd()+"/configs/.env."+process.env.npm_config_env});
        let browserType=process.env.browser!;

        options.metadata.browser=browserType!;
        options.metadata.url=process.env.url!;
        options.metadata.testEnv=process.env.testEnv!;


        // //getting data from ConfigJson file and inserting it to metadata
        // below code did not bring data from SetUp class need to work on it
       
        // options.metadata.browser=setUpClass.browser!;
        // options.metadata.url=setUpClass.url!;
        // options.metadata.testEnv=setUpClass.testEnv!;
        




        reporter.generate(options);
        
    }
   
    
    
    generateHtmlReport();
