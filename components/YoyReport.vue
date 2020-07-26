<template>
  <v-container fluid>
    <v-row>
        <v-text-field
          dense
          readonly
          label="Part Volume Variance"
          :value="vehicleKPI.partVolumeVariance"
          type="number"
        ></v-text-field>  
        <v-text-field
          dense
          readonly
          label="Mix Vehicle Volume"
          :value="vehicleKPI.partVolumeVarianceVehicle"
          type="number"
        ></v-text-field>
        <v-text-field
          dense
          readonly
          label="Mix Irate"
          :value="vehicleKPI.partVolumeVarianceIRate"
          type="number"
        ></v-text-field>
        <v-text-field dense readonly label="Mix RollOn" :value="vehicleKPI.mixRollOn" type="number"></v-text-field>
        <v-text-field
          dense
          readonly
          label="Mix RollOff"
          :value="vehicleKPI.mixRollOff"
          type="number"
        ></v-text-field>
        <v-text-field dense readonly label="Mix Volume" :value="vehicleKPI.mixVolume" type="number"></v-text-field>    
    </v-row>

    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Account</th>
            <th class="text-left">Forecast</th>
            <th class="text-left">Actual</th>
            <th class="text-left">Variance</th>
            <th class="text-left">Variance Vehicle Volume - RollOn</th>
            <th class="text-left">Variance Vehicle Volume - RollOff</th>
            <th class="text-left">Variance Vehicle Volume - Volume</th>
            <th class="text-left">Variance Vehicle Volume - Total</th>
            <th class="text-left">Variance IRate - RollOn</th>
            <th class="text-left">Variance IRate - RollOff</th>
            <th class="text-left">Variance IRate - Volume</th>
            <th class="text-left">Variance IRate - Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="acc in report" :key="acc.label">
            <td>{{ getAccountLabel(acc.account) }}</td>
            <td>{{ formatNbr(acc.forecast) }}</td>
            <td>{{ formatNbr(acc.actual) }}</td>
            <td>{{ formatNbr(acc.variance()) }}</td>
            <td>{{ formatNbr(acc.varVehicleVolumeRollOn) }}</td>
            <td>{{ formatNbr(acc.varVehicleVolumeRollOff) }}</td>
            <td>{{ formatNbr(acc.varVehicleVolumeVolume) }}</td>
            <td>{{ formatNbr(acc.varTotVehicleVolume()) }}</td>
            <td>{{ formatNbr(acc.varIRateRollOn) }}</td>
            <td>{{ formatNbr(acc.varIRateRollOff) }}</td>
            <td>{{ formatNbr(acc.varIRateVolume) }}</td>
            <td>{{ formatNbr(acc.varTotIRateVolume()) }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import { Variant,YOYReport,IFSAccountLabel, VehicleVarianceKPI } from "~/logic/Interfaces";
import { calcVehicleKPIs } from "~/logic/VehicleVarianceCalculator";
import { calcYOYReport } from "~/logic/YOYCalculator";

export default Vue.extend({
  name: "GOM-YOY-Report",
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
  computed: {
    report(): YOYReport[] {
      return calcYOYReport(this.forecast, this.actual);
    },
    vehicleKPI(): VehicleVarianceKPI {
      return calcVehicleKPIs(this.forecast, this.actual);
    },
  },
  methods: {
    formatNbr(value: number) {
      return value?.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    },
    getAccountLabel(acc: IFSAccountLabel): String {
      return IFSAccountLabel[acc];
    },
  },
});
</script>