<template>
  <v-form>
    <v-container>
      <v-row no-gutters>
        <v-col cols="12" md="4">
          <v-select
            v-model="salesPrice.reasonCode"
            :items="salesPriceOptions"
            label="ReasonCode"
            item-text="title"
            item-value="id"
          ></v-select>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            label="Price Change"
            v-model="salesPrice.priceChange"
            :min="0"
            :max="10000"
            type="number"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-btn small  color="error" @click="$emit('delete',$event)"> delete</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import { SalesPrice, ReasonCode } from "../logic/Interfaces";

export default Vue.extend({
  name: "SalesPriceEditor",
  props: {
    salesPrice: {
      type: Object,
      required: true,
    } as PropOptions<SalesPrice>,
  },
  computed: {
    salesPriceOptions() {
      const keys = Object.keys(ReasonCode).filter(
        (k) => typeof ReasonCode[k as any] === "number"
      ); // ["A", "B"]
      const values = keys.map((key) => ({
        id: ReasonCode[key as any],
        title: key,
      }));
      return values;
    },
  },
  data: () => ({
    menu: false,
  })  
  
});
</script>

<style>
</style>