<template>
     <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Vehicle</th>
            <th class="text-left">Volume - Forecst</th>
            <th class="text-left">Volume - Actual </th>
            <th class="text-left">Volume - Variance</th>            
            <th class="text-left">IRate - Forecast</th>            
            <th class="text-left">IRate - Actual</th>
            <th class="text-left">IRate - Variance</th>
            <th class="text-left">Part Volume - Forecast</th>            
            <th class="text-left">Part Volume - Actual</th>
            <th class="text-left">Part Volume - Variance</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="v in report.vehicles" :key="v.title">
            <td>{{ v.title }}</td>
            <td>{{ formatNbr(v.forecastVolume) }}</td>
            <td>{{ formatNbr(v.actualVolume) }}</td>
            <td>{{ formatNbr(v.volumeVariance()) }}</td>

            <td>{{ formatNbr(v.forecastIRate) }} %</td>
            <td>{{ formatNbr(v.actualIRate) }} %</td>
            <td>{{ formatNbr(v.iRateVariance()) }} %</td>

            <td>{{ formatNbr(v.forecastPartVolume()) }}</td>
            <td>{{ formatNbr(v.actualPartVolume()) }}</td>
            <td>{{ formatNbr(v.partVolumeVariance()) }}</td>
            
          </tr>
        </tbody>
      </template>
    </v-simple-table>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue"
import { Variant,GOMReport} from '~/logic/Interfaces'
import { calcYOYReport } from '~/logic/GOMCalculator'
export default Vue.extend({
    name: "GOM-Report",
    props: {
    forecast: {
      type: Object,
      required: true,
    } as PropOptions<Variant>,
    actual: {
      type: Object,
      required: true,
    } as PropOptions<Variant>
  },
   computed: {
    report(): GOMReport {
      return calcYOYReport(this.forecast, this.actual);
    }    
  },
  methods: {
    formatNbr(value: number, digits: number | null) {
      return value?.toLocaleString(undefined, {
        minimumFractionDigits: digits ?? 0,
        maximumFractionDigits: digits ?? 0,
      });
    }
  }
})
</script>