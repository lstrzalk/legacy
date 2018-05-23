<template>
<div v-bind:style="bgc" class="background">

</div>
</template>
<script>
export default {
    data () {
        const d = {
            currentColor: '#723158',
            bgc:{
                backgroundColor: `#723158AA`
                // backgroundColor: `rgba(31,43,97,.3)`
            }
        }
        return d
    },
    mounted(){
        this.bgc.backgroundColor = `#72AA58AA`
        console.log(this.bgc.backgroundColor)
    },
    name: 'Joystick'
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
    justify-content: flex-start;
    align-items: center;
    .color-changer{
        
    }
}
</style>
