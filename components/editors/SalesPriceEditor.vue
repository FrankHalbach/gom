<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" md="2">
          <v-select 
            dense
            v-model="salesPrice.reasonCode"
            :items="salesPriceOptions"
            label="ReasonCode"
            item-text="title"
            item-value="id"
          ></v-select>
        </v-col>
        <v-col cols="12" md="2">
          <v-text-field
            dense
            label="Price Change"
            v-model.number="salesPrice.priceChange"
            :min="-10000"
            :max="10000"
            type="number"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="2">
          <v-btn small  color="error" @click="$emit('delete',$event)"> delete</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import { SalesPrice, ReasonCode } from "~/logic/Interfaces";

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
      ); 
      const values = keys.map((key) => ({
        id: ReasonCode[key as any],
        title: key,
      }));
      return values;
    },
  } 
});
</script>

<style>
</style>