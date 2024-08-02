import * as mime from 'mime-lib';
import * as cheerio from 'cheerio'
import * as quotedPrintable from 'quoted-printable';


var Imap=require ("node-imap");
var inspect=require('util').inspect;



export class emailUtils {



    


    async deleteAllEmails(){

        const imap = new Imap({            
            user: 'jesicatestemail@gmail.com',
            password: 'Test@123',
            host: 'imap.gmail.com',
            port: 993,
            tls: true
            
        });
    

    function openInbox(cb:any){
        Imap.openInbox("INBOX", true, cb);
    }

    return new Promise <number> ((resolve, reject)=>{
        imap.once('ready', function(){
            openInbox(function(err:any, _box:any){
                if (err){
                    imap.end();
                    return reject(err);
                }

                imap.search(['ALL'], function (err1:any, results:any){
                    if (err1){
                        imap.end();
                        return reject(err1);
                    }

                    console.log("result length from email util class: "+results.length);

                    if (results.length===0){
                        console.log("message from email utils class: nothing to delete from email");
                        imap.end();
                        return resolve(0);
                    }

                    const f=imap.fetch(results, {bodies:['HEADER.FIELDS(FROM TO SUBJECT DATE'], markSeen:true});

                    f.on('message', function(msg:any, seqno:number){
                        msg.on('body', function(stream:any, info:any){
                            console.log(' Message#%d', seqno);
                            console.log('Body: %s', inspect(info));
                        });

                        msg.once('attributes', function(attributes:any){
                            imap.addFlags(attributes.uid, '\\Deleted', function(err2:any){
                                if (err2){
                                    console.log("Error making messages as delete: "+err2);
                                }
                            });
                        });
                    });


                    f.once('error', function(err:any){
                        console.log("Fetch error: "+err);
                        imap.end();
                        return reject(err);
                    });

                    f.once('end', function(){
                        imap.expunge(function(err2:any){
                            if (err2){
                                console.log("error for expunging msg: "+err2);
                                imap.end();
                                return reject(err2);
                            }

                            console.log(" all emails are deleted");
                            imap.end();
                            return resolve(results.length);
                        });
                    });
                });
            });
        });

        imap.once('error', function(err:any){
            console.log('IMAP error: '+ err);
            return reject(err);
        });

        imap.once('end', function(){
            console.log("connection ended");
        });

        imap.connect();
    });
}

async readEmailBody(subject:string, mail:any, pwd:any,  mailhost:any){
    var imap=new Imap({
        user:mail,
        password:pwd,
        host:mailhost,
        port:993,
        tls:true

    });

    imap.connect();

    function openInbox(cb:any){
        imap.openBox("INBOX", false, cb);
    }

    function findAttachmentParts(struct:string|any[], attachments:any[]){
        attachments=attachments||[];
        for (var i=0, len=struct.length, r;i<len; i++){
            if(Array.isArray(struct[i])){
                findAttachmentParts(struct[i], attachments);
            }else{
                if(struct[i].disposition && ['inline', 'attachment'].indexOf(struct[i].disposition.type.toLowerCase())>-1){
                    attachments.push(struct[i]);
                }
            }
        }
        return attachments;
    }

    var otp=new Promise<string>((resolve, _reject)=>{
        imap.once('ready', async function(){
            openInbox(async function(err:any, _box:any){
                if(err) throw err;
                var q=await imap.seq.search(['ALL',['TEXT',subject]], async function (err1:any, results:any){
                    if (err1)
                        throw err1;
                    var f=imap.seq.fetch(results[results.length-1],{
                        bodies:['TEXT'],
                        struct:true,
                        markSeen:true
                    });

                    f.on('message', async function(msg:any, _seqno:any){
                        msg.on('body', async function (stream:any, _info:any){
                            var buffer='', count=0;
                            stream.on('data', async function(chunk:any){
                                count+=chunk.length;
                                buffer+=chunk.toString('utf8');
                            });

                            stream.on('end', async function(_chunk:any){
                                resolve(buffer);
                            });
                        });

                        msg.once('end', function(){
                            imap.seq.setFlags(results, "DELETED", function(err:any){
                                if(!err){
                                    console.log("D=msg from email utils: email is deleted");
                                }else{
                                    console.log(JSON.stringify(err, null,2));
                                }
                            });
                            imap.end();
                        });
                    });
                     f.once('error', function(err2:string){
                        console.log('Fetch error: '+err2);
                     });
                });
            });
        });
    });

    imap.once('error', function (err:any){
        console.log(err);
    });

    return otp;
}


async getBodyText(buffer:any){
    return await quotedPrintable.decode(buffer);
}



























}