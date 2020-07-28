<template>
  <v-container fluid>
    <v-row>
      <v-text-field
        dense
        readonly
        label="Part Volume Variance"
        :value="formatNbr(vehicleKPI.partVolumeVariance,2)"
        type="number"
      ></v-text-field>
      <v-text-field
        dense
        readonly
        label="Part Volume Variance - Vehicle Volume"
        :value="formatNbr(vehicleKPI.partVolumeVarianceVehicle,2)"
        type="number"
      ></v-text-field>
      <v-text-field
        dense
        readonly
        label="Part Volume Variance - IRate"
        :value="formatNbr(vehicleKPI.partVolumeVarianceIRate,2)"
        type="number"
      ></v-text-field>
      <v-text-field
        dense
        readonly
        label="Mix RollOn"
        :value="formatNbr(vehicleKPI.mixRollOn,2)"
        type="number"
      ></v-text-field>
      <v-text-field
        dense
        readonly
        label="Mix RollOff"
        :value="formatNbr(vehicleKPI.mixRollOff,2)"
        type="number"
      ></v-text-field>
      <v-text-field
        dense
        readonly
        label="Mix Volume"
        :value="formatNbr(vehicleKPI.mixVolume,2)"
        type="number"
      ></v-text-field>
    </v-row>

    <v-checkbox label="Show Variance Details" v-model="checked"></v-checkbox>

    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Account</th>
            <th class="text-left">Forecast</th>
            <th class="text-left">Actual</th>
            <th class="text-left">Variance</th>
            <th class="text-left">Variance Volume</th>
            <th v-if="checked" class="text-left">Variance Volume - Vehicle - RollOn</th>
            <th v-if="checked" class="text-left">Variance Volume - Vehicle - RollOff</th>
            <th v-if="checked" class="text-left">Variance Volume - Vehicle - Volume</th>
            <th class="text-left">Variance Volume - Vehicle - Total</th>
            <th v-if="checked" class="text-left">Variance Volume - IRate - RollOn</th>
            <th v-if="checked" class="text-left">Variance Volume - IRate - RollOff</th>
            <th v-if="checked" class="text-left">Variance Volume - IRate - Volume</th>
            <th class="text-left">Variance Volume - IRate - Total</th>
            <th class="text-left">Variance Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="acc in report" :key="acc.label">
            <td>{{ getAccountLabel(acc.account) }}</td>
            <td>{{ formatNbr(acc.forecast) }}</td>
            <td>{{ formatNbr(acc.actual) }}</td>
            <td>{{ formatNbr(acc.variance()) }}</td>
            <td>{{ formatNbr(acc.varianceVolume) }}</td>
            <td v-if="checked">{{ formatNbr(acc.varVehicleVolumeRollOn) }}</td>
            <td v-if="checked">{{ formatNbr(acc.varVehicleVolumeRollOff) }}</td>
            <td v-if="checked">{{ formatNbr(acc.varVehicleVolumeVolume) }}</td>
            <td>{{ formatNbr(acc.varTotVehicleVolume()) }}</td>
            <td v-if="checked">{{ formatNbr(acc.varIRateRollOn) }}</td>
            <td v-if="checked">{{ formatNbr(acc.varIRateRollOff) }}</td>
            <td v-if="checked">{{ formatNbr(acc.varIRateVolume) }}</td>
            <td>{{ formatNbr(acc.varTotIRateVolume()) }}</td>
            <td>{{ formatNbr(acc.varPrice) }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import {
  Variant,
  YOYReport,
  IFSAccountLabel,
  VehicleVarianceKPI,
} from "~/logic/Interfaces";
import { calcVehicleKPIs } from "~/logic/VehicleVarianceCalculator";
import { calcYOYReport } from "~/logic/YOYCalculator";

export default Vue.extend({
  name: "YOY-Report",
  props: {
    forecast: {
      type: Object,
      required: true,
    } as PropOptions<Variant>,
    actual: {
      type: Object,
      required: true,
    } as PropOptions<Variant>,
  },
  data: () => ({
    checked: true,
  }),
  computed: {
    report(): YOYReport[] {
      return calcYOYReport(this.forecast, this.actual);
    },
    vehicleKPI(): VehicleVarianceKPI {
      return calcVehicleKPIs(this.forecast, this.actual);
    },
  },
  methods: {
    formatNbr(value: number, digits: number | null) {
      return value?.toLocaleString(undefined, {
        minimumFractionDigits: digits ?? 0,
        maximumFractionDigits: digits ?? 0,
      });
    },
    getAccountLabel(acc: IFSAccountLabel): String {
      return IFSAccountLabel[acc];
    },
  },
});
</script>