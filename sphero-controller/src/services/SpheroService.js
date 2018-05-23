export default class SpheroService {
  constructor(){
    console.log("init")
    this.commands= {
      colors: ["setLed_red", "setLed_blue", "setLed_green", "setLed_white", "setLed_black"],
      move:[]
    },
    this.socket = new WebSocket('ws://localhost:8080')
    this.socket.onmessage = function(msg){
      console.log(msg.data)
    }
  }
  sendCommand(command, subCommand){
    this.socket.send(this.commands[command][subCommand])
  }
  // METHOD FOR CHANGE WINNER IN SERVER
  // invitation(){
  // }
}