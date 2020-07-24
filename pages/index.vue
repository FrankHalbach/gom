<template>
  <v-tabs fixed-tabs>
    <v-tab>Forecast</v-tab>
    <v-tab>Actual</v-tab>
    <v-tab-item>
      <variant-editor :variant="forecast" title="Forecast"></variant-editor>
    </v-tab-item>
    <v-tab-item>
      <variant-editor :variant="actual" title="Actual"></variant-editor>
    </v-tab-item>
  </v-tabs>
</template>

<script lang="ts">
import Vue from "vue";
import { forecast, actual } from "~/static/launchData";

export default Vue.extend({
  data: () => ({
    forecast: forecast,
    actual: actual,
  }),

  methods: {},
});
</script>
