const customSdk = require("@fwehn/custom_sdk"), fs= require("fs"), path= require("path")
saveFilePath = path.join(`${__dirname}`,"../savefiles/lists.json"),
configFilePath = path.join(`${__dirname}`,"../savefiles/list_items.json")
var lists = {}

function init() {
    fs.readFile(configFilePath, (err, rawData) => {
        if(err){
            console.log(err)
            }
        else{
            let data =JSON.parse(rawData)
            customSdk.getSlotHandler()("list_items", data.items )
        }
    
    })

    fs.readFile(saveFilePath, (err, data) => {
        if(err){
            fs.writeFile(saveFilePath, JSON.stringify({ lists: {"_":[]} }), error => {
                if (error)
                 customSdk.fail(err)
                return
              })
            }
        else{
            lists=JSON.parse(data)
            customSdk.getSlotHandler()("list_names", Object.keys(lists) , true)
        }
    
    })
}

//TODO: Testen und zu Discord hinzufügen


function newList(name=`Liste ${Object.keys(lists).length}`, args=[]){
    lists[name]= args
    customSdk.getSlotHandler()("list_names", name)
    customSdk.say(customSdk.generateAnswer([name]))
}

function editList(name, item){
    let list = lists[name]
        if(list){
            if(Array.isArray(item))
                list.push(...item)
            else 
                list.push(item)
        }else
            newList(name, item)
    customSdk.say(customSdk.generateAnswer())
}
/*
function renameList(name, newName){
    checkList(name, ()=>{
        lists[newName]=lists[name]
        deleteList(name)
    }) 
}*/

function checkList(name, callback){
    if(lists[name] !== undefined)
        callback()
    else
        customSdk.fail("NoSuchElement",customSdk.generateFailResponse([name]))
}

function exportList(name){
    checkList(name, ()=>{
        customSdk.say(customSdk.generateAnswer())
        let message
        if(!lists[name])
            message = customSdk.generateAnswer([name], index = 2)
        else
            message= customSdk.generateAnswer([name, customSdk.generateEnum(lists[name])], index = 1)
        customSdk.publishMQTT("bot", message)
    })
        
}

function deleteList(name){
    checkList(name, ()=>{
        customSdk.say(customSdk.generateAnswer([name]))
        delete lists[name]
    })
}

function removeItem(name, item){
    checkList(name, () =>{
        lists[name]=lists[name].filter(it => it != item)
        customSdk.say(customSdk.generateAnswer([item,name]))
    })
}

function saveLists(){
    fs.writeFile(saveFilePath, JSON.stringify(lists), err => { if(err) customSdk.fail(err, customSdk.generateFailResponse()) })
    customSdk.say(customSdk.generateAnswer())
}



init()

module.exports = {
    saveLists, newList, deleteList, exportList, editList, removeItem
}