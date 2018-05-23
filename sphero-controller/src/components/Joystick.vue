<template>
<svg id="controller">
    <circle ref="oc" id="outer-circle" ></circle>
    <circle ref="ic" id="inner-circle" ></circle>
</svg>
</template>
<script>
export default {
    data () {
        return {
            model: null
        }
    },
    mounted() {
    window.addEventListener('load', () => {
        const svg = new Svg(this.$el);
        const outerCircle = new Circle(svg.widthCenter(), svg.heightCenter(), svg.determineScreenOrientation()*0.7, 'outer-circle', svg, null, this.$refs.oc);
        const innerCircle = new Circle(svg.widthCenter(), svg.heightCenter(), svg.determineScreenOrientation()*0.3, 'inner-circle', svg, outerCircle, this.$refs.ic);
        svg.appendNewEventListener("mousemove", innerCircle.circleMouseMove, innerCircle);
        svg.appendNewEventListener("mouseup", innerCircle.mouseMoveEnd, innerCircle);
    })
    },
    name: 'Joystick'
}



class Svg{
    constructor(instance){
        this.instance = instance
    }
    appendNewEventListener(e, callback, binding){
        this.instance.addEventListener(e, callback.bind(binding), false);
    }
    svgWidth(){
        return this.instance.clientWidth;
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
    constructor(cx, cy, r, id, svg, parent, instance){
        this.cx = cx;
        this.cy = cy;
        this.r = r;
        this.id = id;
        this.svg = svg;
        this.parent = parent;
        this.offset = window.innerHeight - this.svg.svgHeight();
        this.instance = this.createCircle(instance);
    }
    createCircle(instance){
        let circle = instance;
        circle.setAttributeNS(null, "cx", this.cx);
        circle.setAttributeNS(null, "cy", this.cy);
        circle.setAttributeNS(null, "r", this.r);
        if(this.parent){
            this.appendNewEventListener("touchmove", this.circleTouch, circle);
            this.appendNewEventListener("touchend", this.circleTouchEnd, circle);
            this.appendNewEventListener("mousedown", this.circleMouseMoveStart, circle);
            this.appendNewEventListener("mouseup", this.mouseMoveEnd, circle);
            this.appendNewEventListener("mousemove", this.circleMouseMove, circle);
        }
        circle.id = this.id;
        return circle;
    }
    appendNewEventListener(e, callback, circle){
        circle.addEventListener(e, callback.bind(this), false);
    }
    circleMouseClickOrTouched(x, y){
        let dist = this.getDistance(x, y);
        if(dist <= this.parent.r){
            window.requestAnimationFrame(this.makeStepForward(x, y));
        } else {
            let cos = this.getCos(x, y, this.svg.widthCenter(), this.svg.heightCenter())
            let sin = this.getSin(x, y, this.svg.widthCenter(), this.svg.heightCenter())
            let maxR = this.parent.r;
            window.requestAnimationFrame(this.makeStepForward(cos*maxR + this.svg.widthCenter(), sin * maxR + this.svg.heightCenter()));
        }
    }
    circleTouch(e){
        this.circleMouseClickOrTouched(e.touches[0].clientX, e.touches[0].clientY - this.offset);
    }
    circleMouseMove(e){
        if(this.enableCircleMove){
            this.circleMouseClickOrTouched(e.x, e.y);            
        }
    }
    circleTouchEnd(e){
        let dist = this.getDistance(this.cx, this.cy);
        while(dist > 0){
            window.requestAnimationFrame(this.makeStepBack(dist));
            dist -= 0.1;
        }
        dist = 0;
        window.requestAnimationFrame(this.makeStepBack(dist));
    }

    mouseMoveEnd(e){
        if(this.enableCircleMove){
            this.circleTouchEnd(e);
            this.enableCircleMove = false;
        }
    }

    circleMouseMoveStart(e){
        this.enableCircleMove = true;
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

    makeStepForward(x, y) {
        return function(){
            this.updateCoords(x,y)
        }.bind(this);
    }

    makeStepBack(dist) {
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
// const ns = 'http://www.w3.org/2000/svg';
// const svg = new Svg();
// const outerCircle = new Circle(svg.widthCenter(), svg.heightCenter(), svg.determineScreenOrientation()*0.7, 'outer-circle', svg, null);
// const innerCircle = new Circle(svg.widthCenter(), svg.heightCenter(), svg.determineScreenOrientation()*0.3, 'inner-circle', svg, outerCircle);
// svg.appendNewEventListener("mousemove", innerCircle.circleMouseMove, innerCircle);
// svg.appendNewEventListener("mouseup", innerCircle.mouseMoveEnd, innerCircle);
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#controller{
    width: 100%;
    height: 100%;
    #outer-circle{
        fill: #5F5B6B;
        fill-opacity: .3;
        stroke: #5F5B6B;
        stroke-width: 3;
    }
    #inner-circle{
        fill: #52154E;
        fill-opacity: .3;
        stroke: #52154E;
        stroke-width: 2;
    }
}
</style>
