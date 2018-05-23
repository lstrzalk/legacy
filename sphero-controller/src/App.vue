<template>
  <v-app >
    <v-toolbar :dark="true" tabs>
      <v-toolbar-title>Sphero Controller</v-toolbar-title>
      <v-tabs v-model="model" slot="extension" grow>
        <v-tab :href="'#joystick'">Joystick</v-tab>
        <!-- <v-tab :href="'#rotation'">Rotation</v-tab> -->
        <v-tab :href="'#colors'">Colors</v-tab>
      </v-tabs>
    </v-toolbar>
    <v-tabs-items :class="'tabs'" v-model="model">
      <v-tab-item :class="'tab'" :id="'joystick'">
        <joystick></joystick>
      </v-tab-item>
      <!-- <v-tab-item :class="'tab'" :id="'rotation'">
        <totation></totation>
      </v-tab-item> -->
      <v-tab-item :class="'tab'" :id="'colors'">
        <colors></colors>
      </v-tab-item>
    </v-tabs-items>

    <v-footer :fixed="true" :dark="true" app>
      <span>&copy; 2018</span>
      <v-spacer></v-spacer>
      <span>Łukasz Strzałka</span>
    </v-footer>
    <socket-service></socket-service>    
  </v-app>
</template>

<script>
import Rotation from './components/Rotation'
import Joystick from './components/Joystick'
import Colors from './components/Colors'
import AppService from './services/AppService'

export default {
  data () {
    return {
      model: null,
      serverApp: new AppService()
    }
  },
  name: 'App',
  components: {
    Rotation,
    Joystick,
    Colors
  }
}
</script>

<style lang="scss" scoped>
  .tabs{
    height: 100%;
    width: 100%;
    .tab{
      height: 100%;
      width: 100%;
    }
  }
</style>
