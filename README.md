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
4. We are going to add 7 dependencies from terminal
   >>  typescript: "typescript -D" (language that we are using)
   >> ts-node: "ts-node -D"
   >> @cucumber/cucumber: "npm i @cucumber/cucumber -D" (to run cucumber project)
   >> playwright: "npm i -D playwright" (browser)
   >> @playwright/test: "npm i -D @playwright/test" (running)
   >> cucumber-html-reporter: "npm i -D cucumber-html-reporter" (cucumber reporter)
   >> dot-env:  "npm i dotenv -D" (env file)
   >> @faker-js/faker: "npm i @faker-js/faker" or "npm i -D @faker-js/faker" (this library used to get some data like fname, lname and etc)
   >> log4js: "npm i log4js" or "npm i -D log4js" we will use it to generate logs (this is optional)
5. 
