export default class SpheroService {
    constructor(){
        this.sendFirstRequest();  
    }
    sendFirstRequest = function(){
        let xhr = new XMLHttpRequest();
        xhr.open('GET', '/spheroController/config', true);
        let self = this;
        xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            let json = xhr.responseText;
            self.config = JSON.parse(json);
        }
        }
        xhr.send(null);
    }
    sendLastRequest = function(){
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/game/end', true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        //send result to server
        xhr.send(JSON.stringify({result: 0, group: this.group, nick: this.nick, age: this.age}));
        xhr.onreadystatechange = function() {
           if (xhr.readyState == XMLHttpRequest.DONE) {
              window.location.replace(xhr.responseText);
           }
        }
    }
  }