<template>
  <v-container>
    <h1 class="display-2 mt-5 mb-10">Regions</h1>
    <div v-if="loading" />

    <div v-else-if="regions && regions.length > 0">
      <v-list>
        <v-list-item
          :to="{
            name: 'ShowRegion',
            params: { countryId: countryId, regionCode: region.isoCode },
          }"
          v-for="(region, index) in regions"
          :key="index"
        >
          <v-list-item-content>
            {{ region.name }}
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-pagination
        class="mt-5"
        :total-visible="10"
        v-model="page"
        circle
        :length="Math.ceil(info.totalCount / 10)"
      />
    </div>

    <div v-else>Not found information</div>
  </v-container>
</template>

<script>
import http from "../plugins/options";
export default {
  props: ["countryId", "timeout"],

  data: () => ({
    loading: false,
    regions: null,
    info: null,
    links: null,
    page: 1,
  }),
  mounted() {
    this.loading = true;
    setTimeout(this.loadRegion, this.timeout || 2000);
  },
  watch: {
    page() {
      this.loadRegion();
    },
  },
  methods: {
    loadRegion() {
      this.loading = true;
      http
        .get(`countries/${this.countryId}/regions`, {
          params: {
            limit: 10,
            offset: (this.page - 1) * 10,
          },
        })
        .then((response) => {
          this.regions = response.data.data;
          this.links = response.data.links;
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