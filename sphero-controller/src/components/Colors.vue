<template>
<div :style="bgc" class="background">
    <color-picker v-for="(color, index) in colors" :color="color" :index="index" :picked="pickedColor" @change-color="changeColor"></color-picker>
</div>
</template>
<script>
import ColorPicker from './ColorPicker'
import SpheroService from '../services/SpheroService'
export default {
    data () {
        const d = {
            colors: ["#A62639", "#59C3C3", "#9FD356", "#F1DAC4", "#0A100D"],
            pickedColor: 0,
            bgc:{
                backgroundColor: `#A62639AA`
            },
            socket: new SpheroService()
        }
        return d
    },
    mounted(){
         this.setBackgroundColor()
    },
    methods:{
        setBackgroundColor: function(){
            this.bgc.backgroundColor = `${this.colors[this.pickedColor]}44`
        },
        changeColor: function(colorIndex){
            this.pickedColor=colorIndex;
            this.setBackgroundColor()
            this.socket.sendCommand("colors", this.pickedColor)
        }
    },
    name: 'Colors',
    components: {
        ColorPicker
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.background{
    height: 100%;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    align-items: center;
    transition: all 300ms cubic-bezier(0.39, 0.575, 0.565, 1);
}
</style>
