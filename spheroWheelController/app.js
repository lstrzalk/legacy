// 'user strict';
// window.addEventListener("load", function() { window. scrollTo(0, 0); });

// class Svg{
//     constructor(){
//         this.instance = this.getInstance();
//         if (this.instance.requestFullscreen) {
//             this.instance.requestFullscreen();
//         } else if (this.instance.webkitRequestFullscreen) {
//             this.instance.webkitRequestFullscreen();
//         } else if (this.instance.mozRequestFullScreen) {
//             this.instance.mozRequestFullScreen();
//         } else if (this.instance.msRequestFullscreen) {
//             this.instance.msRequestFullscreen();
//         }
//     }
//     appendNewEventListener(e, callback, binding){
//         this.instance.addEventListener(e, callback.bind(binding), false);
//     }
//     svgWidth(){
//         return this.instance.clientWidth;
//     }
//     getInstance(){
//         return document.getElementById("controller");
//     }
//     svgHeight(){
//         return this.instance.clientHeight;
//     }
//     addElement(element){
//         this.instance.appendChild(element);
//     }
//     heightCenter(){
//         return this.svgHeight()/2;
//     }
//     widthCenter(){
//         return this.svgWidth()/2;
//     }

//     determineScreenOrientation(){
//         return this.svgWidth() > this.svgHeight() ? this.heightCenter() : this.widthCenter();
//     }
// }
// class Circle{
//     constructor(cx, cy, r, id, svg, parent){
//         this.cx = cx;
//         this.cy = cy;
//         this.r = r;
//         this.id = id;
//         this.svg = svg;
//         this.parent = parent;
//         this.offset = window.innerHeight - this.svg.svgHeight();
//         this.instance = this.createCircle();
//     }
//     createCircle(){
//         let circle = document.createElementNS(ns, "circle");
//         circle.setAttributeNS(null, "cx", this.cx);
//         circle.setAttributeNS(null, "cy", this.cy);
//         circle.setAttributeNS(null, "r", this.r);
//         if(this.parent){
//             this.appendNewEventListener("touchmove", this.circleTouch, circle);
//             this.appendNewEventListener("touchend", this.circleTouchEnd, circle);
//             this.appendNewEventListener("mousedown", this.circleMouseMoveStart, circle);
//             this.appendNewEventListener("mouseup", this.mouseMoveEnd, circle);
//             this.appendNewEventListener("mousemove", this.circleMouseMove, circle);
//         }
//         circle.id = this.id;
//         svg.addElement(circle);
//         return document.getElementById(this.id);
//     }
//     appendNewEventListener(e, callback, circle){
//         circle.addEventListener(e, callback.bind(this), false);
//     }
//     circleMouseClickOrTouched(x, y){
//         let dist = this.getDistance(x, y);
//         if(dist <= this.parent.r){
//             window.requestAnimationFrame(this.makeStepForward(x, y));
//         } else {
//             let cos = this.getCos(x, y, this.svg.widthCenter(), this.svg.heightCenter())
//             let sin = this.getSin(x, y, this.svg.widthCenter(), this.svg.heightCenter())
//             let maxR = this.parent.r;
//             window.requestAnimationFrame(this.makeStepForward(cos*maxR + this.svg.widthCenter(), sin * maxR + this.svg.heightCenter()));
//         }
//     }
//     circleTouch(e){
//         this.circleMouseClickOrTouched(e.touches[0].clientX, e.touches[0].clientY - this.offset);
//     }
//     circleMouseMove(e){
//         if(this.enableCircleMove){
//             this.circleMouseClickOrTouched(e.x, e.y);            
//         }
//     }
//     circleTouchEnd(e){
//         let dist = this.getDistance(this.cx, this.cy);
//         while(dist > 0){
//             window.requestAnimationFrame(this.makeStepBack(dist));
//             dist -= 0.1;
//         }
//         dist = 0;
//         window.requestAnimationFrame(this.makeStepBack(dist));
//     }

//     mouseMoveEnd(e){
//         if(this.enableCircleMove){
//             this.circleTouchEnd(e);
//             this.enableCircleMove = false;
//         }
//     }

//     circleMouseMoveStart(e){
//         this.enableCircleMove = true;
//     }
//     getDistance(cx, cy){
//         let diffX = this.svg.widthCenter() - cx;
//         let diffY = this.svg.heightCenter() - cy;
//         let distSquare = Math.pow(diffX, 2) + Math.pow(diffY, 2);
//         return Math.sqrt( distSquare );
//     }
//     getCos(x1, y1, x2, y2 ){
//         return Math.cos(Math.atan2(y1 - y2, x1 - x2));
//     }
//     getSin(x1, y1, x2, y2 ){
//         return Math.sin(Math.atan2(y1 - y2, x1 - x2));
//     }

//     makeStepForward(x, y) {
//         return function(){
//             this.updateCoords(x,y)
//         }.bind(this);
//     }

//     makeStepBack(dist) {
//         return function(){
//             this.updateCoords((dist * this.getCos(this.cx, this.cy, this.svg.widthCenter(), this.svg.heightCenter())) + this.svg.widthCenter(),
//             (dist * this.getSin(this.cx, this.cy, this.svg.widthCenter(), this.svg.heightCenter())) + this.svg.heightCenter());
//         }.bind(this);
//     }
//     setAttr(attr, value){
//         this.instance.setAttributeNS(null, attr, value);
//     }
//     updateCx(cx){
//         this.cx = cx;
//         this.setAttr("cx", this.cx);
//     }
//     updateCy(cy){
//         this.cy = cy;
//         this.setAttr("cy", this.cy);        
//     }
//     setR(r){
//         this.r = r;
//     }
//     updateCoords(cx, cy){
//         this.updateCx(cx);
//         this.updateCy(cy);
//     }
// }
// const ns = 'http://www.w3.org/2000/svg';
// const svg = new Svg();
// const outerCircle = new Circle(svg.widthCenter(), svg.heightCenter(), svg.determineScreenOrientation()*0.7, 'outer-circle', svg, null);
// const innerCircle = new Circle(svg.widthCenter(), svg.heightCenter(), svg.determineScreenOrientation()*0.3, 'inner-circle', svg, outerCircle);
// svg.appendNewEventListener("mousemove", innerCircle.circleMouseMove, innerCircle);
// svg.appendNewEventListener("mouseup", innerCircle.mouseMoveEnd, innerCircle);

if ('LinearAccelerationSensor' in window && 'Gyroscope' in window) {
    document.getElementById('moApi').innerHTML = 'Generic Sensor API';
    
    let lastReadingTimestamp;
    let accelerometer = new LinearAccelerationSensor();
    accelerometer.addEventListener('reading', e => {
      if (lastReadingTimestamp) {
        intervalHandler(Math.round(accelerometer.timestamp - lastReadingTimestamp));
      }
      lastReadingTimestamp = accelerometer.timestamp
      accelerationHandler(accelerometer, 'moAccel');
    });
    accelerometer.start();
    
    if ('GravitySensor' in window) {
      let gravity = new GravitySensor();
      gravity.addEventListener('reading', e => accelerationHandler(gravity, 'moAccelGrav'));
      gravity.start();
    }
    
    let gyroscope = new Gyroscope();
    gyroscope.addEventListener('reading', e => rotationHandler({
      alpha: gyroscope.x,
      beta: gyroscope.y,
      gamma: gyroscope.z
    }));
    gyroscope.start();
    
  } else if ('DeviceMotionEvent' in window) {
    document.getElementById('moApi').innerHTML = 'Device Motion API';
    
    var onDeviceMotion = function (eventData) {
      accelerationHandler(eventData.acceleration, 'moAccel');
      accelerationHandler(eventData.accelerationIncludingGravity, 'moAccelGrav');
      rotationHandler(eventData.rotationRate);
      intervalHandler(eventData.interval);
    }
    
    window.addEventListener('devicemotion', onDeviceMotion, false);
  } else {
    document.getElementById('moApi').innerHTML = 'No Accelerometer & Gyroscope API available';
  }
  
  function accelerationHandler(acceleration, targetId) {
    var info, xyz = "[X, Y, Z]";
  
    info = xyz.replace("X", acceleration.x && acceleration.x.toFixed(3));
    info = info.replace("Y", acceleration.y && acceleration.y.toFixed(3));
    info = info.replace("Z", acceleration.z && acceleration.z.toFixed(3));
    document.getElementById(targetId).innerHTML = info;
  }
  
  function rotationHandler(rotation) {
    var info, xyz = "[X, Y, Z]";
  
    info = xyz.replace("X", rotation.alpha && rotation.alpha.toFixed(3));
    info = info.replace("Y", rotation.beta && rotation.beta.toFixed(3));
    info = info.replace("Z", rotation.gamma && rotation.gamma.toFixed(3));
    document.getElementById("moRotation").innerHTML = info;
  }
  
  function intervalHandler(interval) {
    document.getElementById("moInterval").innerHTML = interval;
  }