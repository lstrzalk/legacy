'user strict';
class Svg{
    constructor(){
        this.instance = this.getInstance();
    }
    svgWidth(){
        return this.instance.clientWidth;
    }
    getInstance(){
        return document.getElementById("controller");
    }
    svgHeight(){
        return this.instance.clientHeight;
    }
    addElement(element){
        this.instance.appendChild(element);
    }
    heightCenter(){
        return this.svgHeight()/2;
    }
    widthCenter(){
        return this.svgWidth()/2;
    }

    determineScreenOrientation(){
        return this.svgWidth() > this.svgHeight() ? this.heightCenter() : this.widthCenter();
    }
}
class Circle{
    constructor(cx, cy, r, id, svg, parent){
        this.cx = cx;
        this.cy = cy;
        this.r = r;
        this.id = id;
        this.svg = svg;
        this.parent = parent;
        this.instance = this.createCircle();
    }
    createCircle(){
        let circle = document.createElementNS(ns, "circle");
        circle.setAttributeNS(null, "cx", this.cx);
        circle.setAttributeNS(null, "cy", this.cy);
        circle.setAttributeNS(null, "r", this.r);
        if(this.parent){
            this.appendNewEventListener("touchmove", this.circleMouseClickOrTouched, circle);
            this.appendNewEventListener("touchend", this.circleMouseMoveEndOrTouchEnd, circle);
            // this.appendNewEventListener("mousemoveend", this.circleMouseMoveEndOrTouchEnd, circle);
            // this.appendNewEventListener("mousemove", this.circleMouseClickOrTouched, circle);
        }
        circle.id = this.id;
        svg.addElement(circle);
        return document.getElementById(this.id);
    }
    appendNewEventListener(e, callback, circle){
        circle.addEventListener(e, callback.bind(this), false);
    }
    circleMouseClickOrTouched(e){
        let dist = this.getDistance(e.touches[0].clientX, e.touches[0].clientY);
        if(dist <= this.parent.r){
            this.updateCoords(e.touches[0].clientX, e.touches[0].clientY);
        } else {
            let cos = this.getCos(e.touches[0].clientX, e.touches[0].clientY, this.svg.widthCenter(), this.svg.heightCenter())
            let sin = this.getSin(e.touches[0].clientX, e.touches[0].clientY, this.svg.widthCenter(), this.svg.heightCenter())
            let maxR = this.parent.r;
            this.updateCoords(cos*maxR + this.svg.widthCenter(), sin * maxR + this.svg.heightCenter());
        }
    }
    circleMouseMoveEndOrTouchEnd(e){
        let dist = this.getDistance(this.cx, this.cy);
        while(dist > 0){
            window.requestAnimationFrame(this.makeStep(dist));
            dist -= 0.1;
        }
        dist = 0;
        window.requestAnimationFrame(this.makeStep(dist));
    }
    getDistance(cx, cy){
        let diffX = this.svg.widthCenter() - cx;
        let diffY = this.svg.heightCenter() - cy;
        let distSquare = Math.pow(diffX, 2) + Math.pow(diffY, 2);
        return Math.sqrt( distSquare );
    }
    getCos(x1, y1, x2, y2 ){
        return Math.cos(Math.atan2(y1 - y2, x1 - x2));
    }
    getSin(x1, y1, x2, y2 ){
        return Math.sin(Math.atan2(y1 - y2, x1 - x2));
    }
    makeStep(dist) {
        return function(){
            this.updateCoords((dist * this.getCos(this.cx, this.cy, this.svg.widthCenter(), this.svg.heightCenter())) + this.svg.widthCenter(),
            (dist * this.getSin(this.cx, this.cy, this.svg.widthCenter(), this.svg.heightCenter())) + this.svg.heightCenter());
        }.bind(this);
    }
    setAttr(attr, value){
        this.instance.setAttributeNS(null, attr, value);
    }
    updateCx(cx){
        this.cx = cx;
        this.setAttr("cx", this.cx);
    }
    updateCy(cy){
        this.cy = cy;
        this.setAttr("cy", this.cy);        
    }
    setR(r){
        this.r = r;
    }
    updateCoords(cx, cy){
        this.updateCx(cx);
        this.updateCy(cy);
    }
}
const ns = 'http://www.w3.org/2000/svg';
const svg = new Svg();
const outerCircle = new Circle(svg.widthCenter(), svg.heightCenter(), svg.determineScreenOrientation()*0.7, 'outer-circle', svg, null);
const innerCircle = new Circle(svg.widthCenter(), svg.heightCenter(), svg.determineScreenOrientation()*0.3, 'inner-circle', svg, outerCircle);