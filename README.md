Description: This framework is designed for automating UI, by using Typescript, Cucumber and Playwright

Pre condition: 
Before pulling from this repository/ or creating the same new framework make sure below options are installed
a. Make sure you have installed Visual Studio Code
b. If you are using Windows, it will be better to install gitbash 
c. Make sure you have installed Node.js : https://nodejs.org/en/download/prebuilt-installer
>> to check if you have installed node.js write command line in terminal/gitbash: "node -v" (it will return you version of node.js)
>> by default node is having npm packages (node package manager). Run in terminal: "npm -v" (it will return you version of npm)
d. Install Typescript globally. So you can access it anywhere. Make sure you have openeded gitbash/terminal as Administrator 
>> run command: "npm install -g typescript" (globally installs it)
                "npm install typescritpt --save-dev" (project level)



Steps of creating a new framework:
1. Create a project and open it in VSCode
2. Navigate to terminal/gitbash and initialize the repository "npm init"
   >> you can give same name as your folder title
   >> description: provide any description of your project
   >> keywords: any words fine (like ts, pw, ts)
   >> author: anything
3. After initializing is done "package.json" will be created under your project and while adding dependencies, they will be added in this file.
4. We are going to add some dependencies from terminal
   >>  typescript: "typescript -D" (language that we are using)
   >> ts-node: "ts-node -D"
   >> @cucumber/cucumber: "npm i @cucumber/cucumber -D" (to run cucumber project)
   >> playwright: "npm i -D playwright" (browser)
   >> @playwright/test: "npm i -D @playwright/test" (running)
   >> cucumber-html-reporter: "npm i -D cucumber-html-reporter" (cucumber reporter)
   >> dot-env:  "npm i dotenv -D" (env file)
   >> @faker-js/faker: "npm i @faker-js/faker" or "npm i -D @faker-js/faker" (this library used to get some data like fname, lname and etc)
   >> log4js: "npm i log4js" or "npm i -D log4js" we will use it to generate logs (this is optional)
   >> mssql: "npm i mssql" (if you will use microsoft sql for assertion)
   >> xlsx: "npm i xlsx" (for excel)
5. After all these dependencies installations are done, create a "TS config" file. This file is used in TS projects to specify compiler options and root files.
   >> run command "npx tsc --init"
6. Navigate to tsConfig file and change below options and uncomment them:
   "target":"es2020", "mode":"common js", "esModuleInterop":"true", "forceConsistentCasingFileNames":"true", "strict":"true", "resolveJsModule":"true"
7. On the same file add "exclude":["node_modules"], outside of Compiler Options field. (by adding this, we are asking TS do not check imported packages)
8. After all these steps are done we are good to create our project structure
9. After you have created the feature file and implemented the steps, you need to create a "cucumber.json" file in a root directory
   There you need to provide the path of feature file, step defenitions, report options

Note1: after you have created feature file, and implemented the steps, and still see the warning that steps were not impmlemented in feature file. execute below steps
  >> "CTRL+," (Show settings)
  >> Search for Cucumber
  >> Click on "Edit in settings.json"
  >> add "cucumber.feature":[the paths that you have provided for feature file] (in cucumber.json file)
  >> add "cucumber.glue":[the path that you have provided for steps defenition] (in cucumber.json file)

Note2: If you have provided Hooks in different folder directory, do not forget to link it in cucumber.json file where steps were linked. "require":["src/tests/steps/**/*.ts", "utils/*.ts"]

Note3: if you would like to run specific tags/ project : you need to configure it cucumberJson file then add the script under package.json.
>> then you need to run it from local terminal: " npm run test:regression" (the script from packagejson)


Note4: the youtube video how to handle multiple frames and windows (tabs)
   https://www.youtube.com/watch?v=JN16nilL8Wg&list=PLZMWkkQEwOPlS6BSWWqaAIrSNf_Gw4MQ1&index=8


Note5: If you are going to use authentication you need to install otplib : www.npmjs.com/packages/otplib

Note6: if you would like to add some files/ folders to git ignore
>> First open gitInore file and add the file name there
>> then navigate to terminal and write below comments
    git rm -r {file which was added to git ignore}
    git status  (you will see changes which were midified)
    git add --all . 
    git commit -m "adding file to git ignore"
    git push


Note7: for testing email functionality we are going to use imap library.
1. you need to have email address: jesicatestemail@gmail.com/ Test@123
2. Navigate to that email >> settings >> Forwarding POP/IMAP tab
   >> make sure : enable IMAP, Auto-Exponge off- wait for the client to update the server, Archive the message (i think deleting message will be the good one), do not limit the number of messages in imap folder options should be checked in
3. navigate to Visual studio Code and install below libraries:
   >> node-imap (https://www.npmjs.com/package/node-imap) >> command: npm i node-imap
   >> mime-lib (https://www.npmjs.com/package/mime-lib) >> command: npm i mime-lib
   >> cheerio (https://www.npmjs.com/package/cheerio) >> command: npm i cheerio
   >> quoted-printable (https://www.npmjs.com/package/quoted-printable) >> npm i quoted-printable