
const customSdk = require("@fwehn/custom_sdk");
fs= require('fs'),
path=require("path"),
stateTimer=path.join(`${__dirname}`,"../savefiles/stateTimer.json"),
stateAlarm=path.join(`${__dirname}`,"../savefiles/stateAlarm.json")
var timer, 
current=0, 
length,
timerObj={},
savedAlarms,
lastChange=new Date(),
tmp

//function to check if savefiles exist
//if they do not empty files are generated
function init(){
    fs.access(stateTimer,fs.constants.F_OK, err=>{
        if(err){
        fs.writeFile(stateTimer,JSON.stringify({}),error=>{if (error) {
            customSdk.fail(error)
          }
        })
    }
    })
    fs.access(stateAlarm,fs.constants.F_OK, err=>{
        if(err){
        tmp={
            alarms: []
          }
        fs.writeFile(stateAlarm,JSON.stringify(tmp),error=>{if (error) {
            customSdk.fail(error)
          }
        }) 
    }
    })
    try{ getRepeatingAlarm()}catch{getRepeatingAlarm()}
   
    
}

function getTime(){
    let time = new Date()
    let answer = customSdk.generateAnswer([time.getHours(), time.getMinutes()])
    customSdk.say(answer)
}

//function for timer
function timerfun(){
    current+=1
    if(length<=current){
        clearInterval(timer)
        customSdk.getVariable("alarm_sound").then(sound => customSdk.say(sound))
    }
    timerObj.remaining=length-current

    if(current%10==0) saveTimer()
}

//function to start timer
function startTimer(minutes, seconds = 0){
    timerObj.length={"minutes": minutes, "seconds":seconds}
    length=minutes*60+seconds
    timerObj.remaining=length
    
    let answer = customSdk.generateAnswer([minutes, seconds.toString()])
    customSdk.say(answer)
    saveTimer()
    timer=setInterval(timerfun, 1000)
}


//function to stop timer
function stopTimer(){
    clearInterval(timer)  
}

//function to get remaining time
function getTimer(){
    fs.readFile(stateTimer, (err, data) =>{
        data= JSON.parse(data)
        var minutes=Math.floor(data.remaining/60)
        var seconds=(data.remaining)-minutes*60
        if(seconds < 1) seconds = 1
        let answer = customSdk.generateAnswer([minutes, seconds])
        customSdk.say(answer)
    })
    
}

//function to save timer
function saveTimer(){
    fs.writeFile(stateTimer,JSON.stringify(timerObj),error=>{if (error) {
        customSdk.fail(error, customSdk.generateFailResponse([],index = 0))
      }
    })
}

//function to generate a new alarm
function newAlarm(hour,minutes,name="alarm",repeat){
    let alarm={name: name,hour: hour, minutes: minutes}
    if(repeat){
        alarm.repeat=repeat
        getRepeatingAlarm()
    }
    saveAlarm(alarm)
    let answer = customSdk.generateAnswer([hour, minutes]);
    customSdk.say(answer) 
    if(!repeat){
        setAlarm(alarm)
    }
}

//function to set an alarm
function setAlarm(alarmObj){
    if(!alarmObj.repeat)
    setTimeout(()=>{
        customSdk.getVariable("alarm_sound").then(sound => customSdk.say(sound))
        removeAlarm(alarmObj)

    },calculateAlarm(alarmObj))
    else{
        let weekIndices
        if(alarmObj.repeat==7)
            weekIndices=[1,2,3,4,5]
        else 
            weekIndices=alarmObj.repeat
    if (weekIndices.includes(new Date().getDay())){
        setTimeout(()=>{
            customSdk.getVariable("alarm_sound").then(sound => customSdk.say(sound))
        },calculateAlarm(alarmObj))
    }
    }
    
}

//function to calculate interval until alarmtime is reached
function calculateAlarm(alarmobj){
    let currentTime={
        currentHours:new Date().getHours(),
        currentMinutes:new Date().getMinutes()
    }
    let hoursTilAlarm
    if(currentTime.currentHours>alarmobj.hour){
        hoursTilAlarm=(24+alarmobj.hour-currentTime.currentHours)
        
    }else
        hoursTilAlarm=(alarmobj.hour-currentTime.currentHours) 

    return hoursTilAlarm*3600000+(alarmobj.minutes-currentTime.currentMinutes)*60000
}

//function to save alarm to savefile
function saveAlarm(alarmobj){
    fs.readFile(stateAlarm, 'utf8',(err,data)=>{
        if(err)
            {

                customSdk.fail(err, customSdk.generateFailResponse([],index = 1))
                return
            }
        let obj=JSON.parse(data)
        obj.alarms.push(alarmobj)
        fs.writeFile(stateAlarm,JSON.stringify(obj),(err)=>{
            if(err)
                customSdk.fail(err, customSdk.generateFailResponse([], index = 0))
        })
    })
}

//function to delete alarm from savefile
function removeAlarm(alarmobj){  
    fs.readFile(stateAlarm,'utf-8', (err,data)=>{
        if(err)
            {
                customSdk.fail(err, customSdk.generateFailResponse([],index = 1))
                return
            }
        let obj=JSON.parse(data)
        obj.alarms=obj.alarms.filter(elem=>{ if(elem.name=="alarm")
            return JSON.stringify(elem)!=JSON.stringify(alarmobj)
            else if (obj.repeat && elem.repeat) return obj.repeat != elem.repeat
            else
            return alarmobj.name != elem.name
        })
        let newData= JSON.stringify(obj)
        fs.writeFile(stateAlarm,newData,(err)=>{
            if(err)
                customSdk.fail(err, customSdk.generateFailResponse([],index = 0))
        })
    })
}
function deleteAlarm(hour, minutes, repeat){
    let alarmobj={hour: hour, minutes: minutes}
        if(repeat)
            alarmobj.repeat=repeat  
    removeAlarm(alarmobj)
    customSdk.say(customSdk.generateAnswer())
}
//function to snooze an alarm
function snooze(interval=5){
    setTimeout(()=>{
        customSdk.getVariable("alarm_sound").then(sound => customSdk.say(sound))
    },(60000*interval))

}

function getAlarm(){
    fs.readFile(stateAlarm, (err, data)=>{
        let alarms= JSON.parse(data).map(it => { if(it.repeat) return  it.repeat + it.hours.toString() + it.minutes.toString();  else return it.hours.toString() + it.minutes.toString() })
        customSdk.say(customSdk.generateAnswer([customSdk.generateEnum(alarms)]))
    })
}

//function to watch savefile and set repeating alarms
function getRepeatingAlarm() {
    fs.watch(stateAlarm, (eventtype, _) => {
        if (eventtype == "change") {
            let timestamp=new Date()
            if ((timestamp - lastChange) > 3000) {
                lastChange = timestamp
                fs.readFile(stateAlarm,'utf8', (err, data) => {
                    if(err){
                        customSdk.fail(err, customSdk.generateFailResponse([],index = 1))
                        return 
                    }
                    else{
                    try{
                    tmp = JSON.parse(data)
                    if(JSON.stringify(savedAlarms)!=data){
                    
                    savedAlarms = tmp
                    savedAlarms.alarms.forEach(it=>{if(it.repeat) setAlarm(it)}) 
                    }
                    }catch(err){
                        console.log(err)
                }
                }
                })
            }
        }
    })
}

//wirft komischen fehler, vllt retry bis es funktioniert?
/*
function setRepeatingAlarm(alarmobj){
    let weekIndices=[]
    week.forEach((element,index) =>{ if(alarmobj.repeat.includes(element)) weekIndices.push(index)})
    if (weekIndices.includes(new Date().getDay())){
        setTimeout(()=>{
            //customSdk.say("Aufwachen")
            console.log("aufwachen")
    
        },calculateAlarm(alarmobj))
    }
        
}*/

init()

module.exports = {
    getTime, 
    startTimer,
    stopTimer,
    getTimer,
    newAlarm,
    getAlarm,
    deleteAlarm,
    snooze
}