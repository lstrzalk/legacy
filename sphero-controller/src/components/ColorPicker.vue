<template>
<div class="picker" :style="{backgroundColor:color}" :class="{'picked':index===picked }" v-on:click="pickColor()"></div>
</template>
<script>
export default {
    props: ['color', 'index', 'picked'],
    data () {
        return {

        }
    },
    mounted(){
    },
    methods: {
        pickColor: function(){
            this.$emit('change-color', this.index)
        }
    },
    name: 'Color'
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.picker{
    width: 50px;
    height: 50px;
    box-shadow: 0 0 6px 2px rgba($color: #000000, $alpha: .2);
    border-radius: 25px;
}
.picked{
    width: 70px;
    height: 70px;
    border-radius: 35px;
    transition: all 300ms cubic-bezier(0.39, 0.575, 0.565, 1);        
}
</style>
