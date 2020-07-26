<template>
  <v-tabs fixed-tabs>
    <v-tab>Forecast</v-tab>
    <v-tab>Actual</v-tab>
    <v-tab>GOM/YOY Report</v-tab>
    <v-tab-item>
      <variant-editor :variant="forecast" title="Forecast"></variant-editor>
    </v-tab-item>
    <v-tab-item>
      <variant-editor :variant="actual" title="Actual"></variant-editor>
    </v-tab-item>
    <v-tab-item>
      <v-card>
        <v-card-title primary-title>YOY Report</v-card-title>
        <yoy-report :forecast="forecast" :actual="actual"></yoy-report>
      </v-card>
      <v-card>
        <v-card-title primary-title>GOM Report</v-card-title>
        to be added next
      </v-card>
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
});
</script>
