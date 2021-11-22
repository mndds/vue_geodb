<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-title> Geo DB </v-app-bar-title>

      <v-spacer />

      <v-btn elevation="0" exact :to="{ name: 'Home' }">Home</v-btn>
      <v-btn elevation="0" :to="{ name: 'CountryList' }">Countries</v-btn>
      <v-btn elevation="0" :to="{ name: 'CityList' }">Cities</v-btn>

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
    //
  }),
};
</script>
