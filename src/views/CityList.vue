<template>
  <v-container>
    <h1 class="display-2 mt-5 mb-10">Cities</h1>

    <div v-if="loading" />

    <div v-else-if="cities">
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
        v-model="page"
        circle
        :length="Math.ceil(info.totalCount / 11)"
      />
    </div>

    <div v-else>Not found information</div>
  </v-container>
</template>

<script>
import http from "../plugins/options";
export default {
  data: () => ({
    loading: false,
    cities: null,
    info: null,
    page: 1,
  }),
  mounted() {
    this.loadCities();
  },
  watch: {
    page() {
      this.loadCities();
    },
  },
  methods: {
    loadCities() {
      this.loading = true;
      http
        .get(`cities`, {
          params: {
            limit: 10,
            offset: (this.page - 1) * 10,
          },
        })
        .then((response) => {
          this.cities = response.data.data;
          this.info = response.data.metadata;
        })
        .catch(function (error) {
          console.error(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style>
</style>