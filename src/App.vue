<template>
  <v-app>
    <v-app-bar height="90px" color="transparent">
      <v-app-bar-title class="white--text mr-15"> Geo DB </v-app-bar-title>
      
      <div id="box"></div>

      <v-spacer />

      <v-btn class="mr-10" elevation="0" exact :to="{ name: 'Home' }">Home</v-btn>
      <v-btn class="mr-10" elevation="0" :to="{ name: 'CountryList' }">Countries</v-btn>
      <v-btn class="mr-10" elevation="0" :to="{ name: 'CityList' }">Cities</v-btn>

      <v-spacer />
    </v-app-bar>

    <v-main>
      <router-view :key="$route.fullPath" />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    
  }),
};
</script>

<style>
#app {
  background:black url(http://fc01.deviantart.net/fs71/f/2012/160/b/9/stars_by_paulinemoss-d52un4e.jpg);
  animation: stars 205s linear alternate;
}

#box {
  background:url(https://cdn.rawgit.com/ManzDev/cursos-assets/gh-pages/css3/earth-2.jpg);
  background-size:cover;
  border:2px solid #000;
  border-radius:50%;
  width:80px;
  height:80px;
  animation: movimiento 10s linear 0s infinite;
  margin:6em auto;
  transform:rotateX(6deg) rotateY(6deg) rotateZ(6deg);
}


@keyframes movimiento {
  0% { background-position:0 0 }
  100% { background-position:355px 0 }
}

@keyframes stars {
  0% { background-position:0 0 }
  100% { background-position:0 100% }
}
</style>
