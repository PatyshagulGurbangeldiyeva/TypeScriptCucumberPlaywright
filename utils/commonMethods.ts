import {faker} from '@faker-js/faker';
import basePage from './basePage';
import path from 'path';
import fsExtra from 'fs-extra';
import {promisify} from 'util';


const copyAsync=promisify(fsExtra.copy);
const removeAsync=promisify(fsExtra.remove);
const renameAsync=promisify(fsExtra.rename);
const moveAsync=promisify(fsExtra.move);
const mkdirAsync=promisify(fsExtra.mkdir);
const sleepAsync=promisify(setTimeout);

export default class commonMethods extends basePage{


    public async getTwoDigitFutureYear():Promise<string>{
        const futureDate=faker.date.future();
        const yy:string=futureDate.getFullYear().toString().slice(-2);
        console.log("random future year from faker library: "+yy);
        return yy;
    }

    public async getTwiDigitMotnh():Promise<string>{
        const futureDate=faker.date.future();
        const month=(futureDate.getMonth()+1).toString(); // Months are zero based, so Januar is 0
        console.log("random month: "+month);
        return month;
    }

    public async getZipCode(){
        const zipCode=faker.location.zipCode();
        console.log("random zip code: "+zipCode);
        return zipCode;
    }

    public async getTodayDate():Promise <string>{
        const today:Date=new Date();
        const year:number=today.getFullYear();
        const month:number=today.getMonth()+1;  // Months are zero based, so Januar is 0
        const day:number=today.getDate();
        const todayDateString:string=year+"-"+month.toString().padStart(2,'0')+"-"+day.toString().padStart(2,'0');
        return todayDateString;

    }

    public async getCurrentTime():Promise <string>{
        const today:Date=new Date();
        const hours:number=today.getHours();
        const minutes: number=today.getMinutes();
        const seconds:number=today.getSeconds();
        const timeString=hours.toString().padStart(2,'0')+"-"+minutes.toString().padStart(2,'0')+"-"+seconds.toString().padStart(2,'0');
        return timeString;
    }


    public async compareArrays<T>(arr1:T[], arr2:T[]):Promise<boolean>{
        if(arr1.length!==arr2.length){
            console.log("the length of arrays are not matching");
            return false;
        }

        for (let i=0; i<arr1.length;i++){
            if (arr1[i]!==arr2[i]){
                console.log("the option order is not matching");
                return false;
            }
        }

        return true;
    }

    public async moveFiles(src:any, dest:any){
        try{
            await fsExtra.ensureDir(path.dirname(dest)); // ensure dir directory exists
            await fsExtra.move(src, dest);
            console.log('failed test video saved at: ${dest}');
        }catch(err){
            console.error('falied to move video file: ${err}');
        }
    }

    public async removeFile(videPath:any){
        await removeAsync();
    }

    public async copyFile(source:any, dest:any){
        await copyAsync(source, dest);
    }

    public async mkDir(path:any, recursive:boolean){
        await mkdirAsync(path,{recursive:recursive});
    }

    public async clearDirectory(dirPath:string){
        await fsExtra.emptyDir(dirPath);
    }

    public async parseStringToBoolean(value:string):Promise<boolean>{
        const trimValue=value.trim().toLocaleLowerCase();
        if(trimValue=="true"|| trimValue=="1"|| trimValue=="yes"){
            return true;
        }else{
            return false;
        }
    }

    public async sortDescending(array:any[]):Promise<any[]>{
        return new Promise((resolve)=>{
            const sortedArray=array.sort((a,b)=> b.localCompare(a));
            resolve(sortedArray);
        })
    }

}
