<template>
  <v-container>
      <div style="display: flex; align-items: center; gap:10px">
            <div>                
                <v-text-field dark color="white" v-model="filter.name" label="Name"/>
            </div>            
            <v-btn color="white" @click="loadCities();loadCountriesTimeout()" >Filter</v-btn>          
      </div>

      <h3 v-if="cities || countries" class="white--text display-2 mb-10 mt-5">Results</h3>

    <div v-if="loadingCity"/>  

    <div v-else-if="cities && cities.length > 0">
      <h3 class="white--text display-1 mt-5 mb-10">Cities: </h3>
      <v-card>
        <v-list>
          <v-list-item
            :to="{
              name: 'ShowCity',
              params: { cityId: city.id },
            }"
            v-for="(city, index) in cities"
            :key="index"
          >
            <v-list-item-content>
              {{ city.name }}
            </v-list-item-content>
          </v-list-item>
        </v-list>

      </v-card>

      <v-pagination
        class="mt-5"
        :total-visible="7"
        v-model="pageCity"
        circle
        :length="Math.ceil((infoCities.totalCount) / 10)"
      />
    </div>

    <div v-if="loadingCountry"></div>
    <div v-else-if="countries.length > 0 && !loadingCountry">
      <h3 class="white--text display-1 mt-5 mb-10">Countries:</h3>
      <v-card>
        <v-list>
          <v-list-item
            :to="{
              name: 'ShowCountry',
              params: { countryId: country.code },
            }"
            v-for="(country, index) in countries"
            :key="index"
          >
            <v-list-item-content>
              {{ country.name }}
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>

      <v-pagination
        class="mt-5"
        :total-visible="10"
        v-model="pageCountry"
        circle
        :length="Math.ceil(infoCountries.totalCount / 10)"
      />
    </div>


  </v-container>
</template>

<script>
import http from "../plugins/options";
export default {
  props: ["timeout"],
  data: () => ({
    loadingCity: false,
    loadingCountry: true,
    cities: null,
    countries: null,
    infoCities: null,
    infoCountries: null,
    filter: {
      name: '',         
    },
    pageCity: 1,
    pageCountry: 1,
  }),
  watch: {
    pageCity() {
      this.loadCities();
    },
    pageCountry() {
      this.loadCountries();
    },
  },
  methods: {
    loadCities() {
      this.loadingCity = true;
      http
        .get(`cities`, {
          params: {
            namePrefix: this.filter.name,
            limit: 10,
            offset: (this.pageCity - 1) * 10,
          },
        })
        .then((response) => {
          this.cities = response.data.data;
          this.infoCities = response.data.metadata;
        })
        .catch(function (error) {
          console.error(error);
        })
        .finally(() => {
          this.loadingCity = false;
        });
    },
    loadCountries() {
      this.loadingCountry = true;
      http
        .get(`countries`, {
          params: {
            namePrefix: this.filter.name,
            limit: 10,
            offset: (this.pageCountry - 1) * 10,
          },
        })
        .then((response) => {
          this.countries = response.data.data;
          this.infoCountries = response.data.metadata;
        })
        .catch(function (error) {
          console.error(error);
        })
        .finally(() => {
          this.loadingCountry = false;
        });
    },
    loadCountriesTimeout(){
      setTimeout(this.loadCountries, this.timeout || 2000);
    },
  }
}

</script>

