const path= require('path')
const customSdk = require("@fwehn/custom_sdk"),
  Lame = require("@suldashi/lame"),
  Speaker = require("speaker"),
  Axios = require("axios"),
  fs = require("fs")

var configRadioPath =path.join(`${__dirname}`,"../savefiles/configRadio.json"),
  configSongPath= path.join(`${__dirname}`,"../savefiles/configSongs.json"),
  saveFilePath = path.join(`${__dirname}`,"../savefiles/stateRadio.json")
  


var controller = new AbortController(),
  speaker,
  stationList,
  currentStation = {
    currentTrack: ""
  }, stream, decoder 

function init(){

  fs.readFile(configRadioPath, (err,data)=>{
    if(err){
      fs.writeFile(configSongPath,JSON.stringify({stations: []}), err => { if(err) customSdk.fail(err)})
    
  }
    else{
      let obj= JSON.parse(data)
      names= obj.stations.map((value)=>{return value.name})
      customSdk.getSlotHandler()("radiostations",names,true)
    
}
fs.readFile(configSongPath, (err,data)=>{
  if(err){
    fs.writeFile(configSongPath,JSON.stringify({songs: []}),err => { if(err) customSdk.fail(err)}) 
  }
  else{
    let obj= JSON.parse(data)
    names= obj.songs.map((value)=>{return value.name + " von " + value.artist})
    customSdk.getSlotHandler()("songs",names,true)
}
})
})

  
  fs.access(saveFilePath,fs.constants.F_OK, err=>{
      if(err){
      fs.writeFile(saveFilePath,JSON.stringify({}),err => { if(err) customSdk.fail(err)}) 
  }
  })
  
}


function play(station) {
  speaker=new Speaker()
  decoder= new Lame.Decoder()
  if(!isPlayingBool()){
  if (station) {
    customSdk.say(customSdk.generateAnswer([station.name]))
    currentStation = station
    controller = new AbortController()
    return Axios.get(station.url, {
      responseType: 'stream',
      signal: controller.signal
    })
      .then(function (response) {
        stream = response.data
        stream
          .pipe(decoder)
          .pipe(speaker)
      })
      .then(getInfo)
      .then(saveActive)
    
      
  } else
    customSdk.fail("config missing",customSdk.generateFailResponse([]))//say("Der gewählte Sender ist leider nicht verfügbar")
} else
customSdk.fail("already playing",customSdk.generateFailResponse([], index=1))
}

function next() {
  fs.readFile(saveFilePath, (_, rawStation) => {
    fs.readFile(configRadioPath, (err, rawList) => {
      if(err){ 
        customSdk.fail("config missing",customSdk.generateFailResponse([]))
        return
      }
      stationList = JSON.parse(rawList).stations
      let i = stationList.findIndex(obj => { return obj.name == JSON.parse(rawStation).name })
      if (i != stationList.length - 1) {
        play(stationList[i + 1])
        
      }
      else {
        play(stationList[0])
        
      }
    })
  })
}

/*
function nextSync() {
  rawStation=fs.readFileSync(saveFilePath)
  rawList=fs.readFileSync(configPath)
  stationList = JSON.parse(rawList).stations
  let i = stationList.findIndex(obj => { return obj.name == JSON.parse(rawStation).name })
  if (i != stationList.length - 1) {
    play(stationList[i + 1])
      customSdk.say("Spiele " + stationList[i + 1].name + " ab")
  }
  else {
    play(stationList[0])
      customSdk.say("Spiele " + stationList[0].name + " ab")
  }
    
  
}*/



function stop() {
  if (isPlayingBool()) {
    decoder.end()
    speaker.end()
    stream.destroy()
    return controller.abort("CONNECTION CLOSED")
  }
  else{
    customSdk.fail("nothing is playing",customSdk.generateFailResponse([]))
  }
}

function isPlayingBool() { 
  if(stream)
  if(stream === undefined) return false; else if(stream.destroyed) return false; else return true }

function isPlaying(stationName) {
  fs.readFile(saveFilePath, (err, raw) => {
    let data = JSON.parse(raw)
    return data.name == stationName.toLowerCase()
  })
}

function getNames(modus){
  if(modus==0){
    getSongNames().then(songNames => {
      customSdk.say(customSdk.generateAnswer([customSdk.generateEnum(songNames)]))

   }, reject =>{
     customSdk.fail(reject, customSdk.generateFailResponse([], index = 1))
   })
  }
  else{
    getStationNames().then(stationNames => {
       customSdk.say(customSdk.generateAnswer([customSdk.generateEnum(stationNames)]))
       
    }, reject =>{
      customSdk.fail(reject, customSdk.generateFailResponse([], index = 0))
    })
    
   
  }
    
}

function getStationNames() {
  return new Promise((resolve,reject) =>{
    fs.readFile(configRadioPath, (err, raw) => {
    if(err)
      reject(err)
    resolve(JSON.parse(raw).stations.map(station => station.name))
  })
  })
  
}

function getSongNames(){
  return new Promise((resolve,reject) =>{
    fs.readFile(configSongPath, (err, raw) => {
    if(err)
      reject(err)
    resolve(JSON.parse(raw).songs.map(song => song.name+" von "+song.artist))
  })
  })
}

/*function buildAnswer(liste){
  let answer= "Du kannst"
    liste.forEach((element,index, array) => {
      if(index+1==array.length)
        answer+=` und ${element} hören`
      else
        answer+=` ${element}`
    })
}*/

function setActive(name, modus=1) {
 if(modus==0){
   fs.readFile(configSongPath, (err, raw) => {
    if(err){ 
      customSdk.fail(err, customSdk.generateFailResponse([]))
      return
    }
    songlist = JSON.parse(raw).songs
    playSong((songlist.find(song => (song.name.toLowerCase()+" von "+song.artist.toLowerCase() == name.toLowerCase()))))

  })
 }else{
  fs.readFile(configRadioPath, (err, raw) => {
    if(err){ 
      customSdk.fail(err, customSdk.generateFailResponse([]))
      return
    }
    data = JSON.parse(raw)
    stationList = data.stations
    play(stationList.find(station => (station.name.toLowerCase()) == name.toLowerCase()))
  })
 }
}


function getCurrent() {
  getInfo().then((_, res) => {
  fs.readFile(saveFilePath, (_, raw) => {
    data = JSON.parse(raw)
    if(data=={}){
      customSdk.fail(err, customSdk.generateFailResponse([]))
      return
    }
    currentStation.url = data.url
    currentStation.name = data.name
    currentStation.currentTrack=data.currentTrack
    customSdk.say(customSdk.generateAnswer([data.currentTrack,data.name]))
  })
  })

}

function saveActive() {
  fs.writeFile(saveFilePath, JSON.stringify(currentStation), err => { if(err) customSdk.fail(err)})
}

function getInfo() {
  return Axios.get(currentStation.url, {
    headers: { 'Icy-MetaData': '1' },
    responseType: 'stream',
    signal: controller.signal
  })
    .then(function (response) {
      response.data.on('data', data => {
        let startPosition = data.toString().indexOf('StreamTitle=')
        var endPosition = data.toString().indexOf(';', startPosition)
        if (startPosition > -1 && endPosition > startPosition) {
          let titleString = data.toString().substring(startPosition, endPosition)
          let title = titleString.substring(13, titleString.length - 1).split(', ')
          currentStation.currentTrack = title[0]
          if (title[1])
            currentStation.currentTrack += " von " + title[1]
          fs.writeFile(saveFilePath, JSON.stringify(currentStation),err => { if(err) customSdk.fail(err)})
          response.data.destroy()
          

        }
      })
    })
}

function playSong(song){
  if(isPlayingBool()){
    customSdk.fail("already playing", customSdk.generateFailResponse([], index = 1))
    return
  }
    //songlist = data.songs
    speaker=new Speaker()
    decoder= new Lame.Decoder()
    stream = fs.createReadStream(song.path)
              .pipe(decoder)
              .on('format',console.log)
              .pipe(speaker)
}



init()

module.exports = {
  getNames,
  isPlaying,
  stop,
  next,
  getCurrent,
  setActive,
}


/* function switchStation(name)*/

/*var audio =  player.play(stations[0], function(err){
        if (err && !err.killed) throw err
      })
     setTimeout(function(){
         audio.kill()
     }, 30000)
    */

/*
function getInfo(data) {
  let startPosition = data.toString().indexOf('StreamTitle=')
  var endPosition = data.toString().indexOf(';', startPosition)
  if (startPosition > -1 && endPosition > startPosition) {
    let titleString = data.toString().substring(startPosition, endPosition)
    let title = titleString.substring(13, titleString.length - 1).split(', ')
    currentStation.currentTrack=title[0]+" von "+title[1]
    console.log(currentStation.currentTrack)
  }
}*/

/*function saveActive() {
  JSONutil.schreiben(currentStation, saveFilePath)
}function play2() {
  controller = new AbortController()
  if (!currentStation) currentStation = stationList[0] //Falls kein Sender ausgewählt, einfach den ersten aus der Liste spielen

  return Axios.get(currentStation.url, {
    headers: { 'Icy-MetaData': '1' },
    responseType: 'stream',
    signal: controller.signal
  })
    .then(function (response) {
      metaint = parseInt(response.headers['icy-metaint'])
      stream = response.data
      stream
        .pipe(decoder)
        .pipe(speaker)

      stream.on('data', getInfo)
    })
}*/