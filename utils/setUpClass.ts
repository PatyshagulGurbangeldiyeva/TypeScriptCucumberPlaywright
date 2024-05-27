import * as confJson from "../configs/configs.json";

export default class setUpClass{

    public static browser="";
    public static testEnv="";
    public static url="";
    public static userName1="";
    public static pwd="";


public static testSetUp(){
    const getEnv=confJson.TestConfig.TestEnv;

    if(getEnv!=null && getEnv!=undefined){
        this.testEnv=getEnv;
    }else{
        this.testEnv=confJson.TestConfig.TestEnv;
    }

if (this.testEnv=="QA"){
    this.browser=confJson.TestConfig.Browser;
    this.url=confJson.TestConfig.QAConfig.URL;
    this.userName1=confJson.TestConfig.QAConfig.username1;
    this.pwd=confJson.TestConfig.QAConfig.pwd;
}
else if(this.testEnv=="Dev"){
    this.browser=confJson.TestConfig.Browser;
    this.url=confJson.TestConfig.DevConfig.URL;
    this.userName1=confJson.TestConfig.DevConfig.username1;
    this.pwd=confJson.TestConfig.DevConfig.pwd;
}
else if(this.testEnv=="Prod"){
    this.browser=confJson.TestConfig.Browser;
    this.url=confJson.TestConfig.ProdConfig.URL;
    this.userName1=confJson.TestConfig.ProdConfig.username1;
    this.pwd=confJson.TestConfig.ProdConfig.pwd;
}



}





}