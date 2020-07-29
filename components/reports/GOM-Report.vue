<template>
  <v-simple-table dense>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Vehicle</th>
          <th class="text-left">Volume - Forecst</th>
          <th class="text-left">Volume - Actual</th>
          <th class="text-left">Volume - Variance</th>
          <th class="text-left">IRate - Forecast</th>
          <th class="text-left">IRate - Actual</th>
          <th class="text-left">IRate - Variance</th>
          <th class="text-left">Implied IRate</th>
          <th class="text-left">Part Volume - Forecast</th>
          <th class="text-left">Part Volume - Actual</th>
          <th class="text-left">Part Volume - Variance</th>
          <th class="text-left">Market Growth</th>
          <th class="text-left">b/(w) Market</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="v in report.vehicles" :key="v.title">
          <td>{{ v.title }}</td>
          <td>{{ $formatNbr(v.forecastVolume) }}</td>
          <td>{{ $formatNbr(v.actualVolume) }}</td>
          <td>{{ $formatNbr(v.volumeVariance()) }}</td>
          <td>{{ $formatNbr(v.forecastIRate,1) }} %</td>
          <td>{{ $formatNbr(v.actualIRate,1) }} %</td>
          <td>{{ $formatNbr(v.iRateVariance(),1) }} %</td>
          <td>{{ $formatNbr(v.impliedActualIrate(),1) }} %</td>
          <td>{{ $formatNbr(v.forecastPartVolume) }}</td>
          <td>{{ $formatNbr(v.actualPartVolume) }}</td>
          <td>{{ $formatNbr(v.partVolumeVariance()) }}</td>
          <td>{{ $formatNbr(v.marketGrowth(),1) }}%</td>
          <td>{{ $formatNbr(v.betterWorseMarket(),1) }}%</td>
        </tr>

        <!-- totals -->
        <tr>
          <td>Total</td>
          <td>{{$formatNbr(report.forecastTotalVehicleVolume())}}</td>
          <td>{{$formatNbr(report.actualTotalVehicleVolume())}}</td>
          <td>{{$formatNbr(report.varianceTotalVehicleVolume())}}</td>
          <td>{{$formatNbr(report.forecastAvgIRate(),1)}}%</td>
          <td>{{$formatNbr(report.actualAvgIRate(),1)}}%</td>
          <td>{{$formatNbr(report.AvgIRateVariance(),1)}}%</td>
          <td>{{$formatNbr(report.impliedAvgActualIRate(),1)}}%</td>
          <td>{{$formatNbr(report.forecastTotalPartVolume())}}</td>
          <td>{{$formatNbr(report.actualTotalPartVolume())}}</td>
          <td>{{$formatNbr(report.totalPartVolumeVariance())}}</td>
          <td>{{$formatNbr(report.totalMarketGrowth(),1)}}%</td>
          <td>{{$formatNbr(report.totalBetterWorseMarket(),1)}}%</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue"
import { Variant, GOMReport } from "~/logic/Interfaces"
import { calcYOYReport } from "~/logic/GOMCalculator"
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
    } as PropOptions<Variant>,
  },
  computed: {
    report(): GOMReport {      
      return calcYOYReport(this.forecast, this.actual);
    },
  }  
});
</script>