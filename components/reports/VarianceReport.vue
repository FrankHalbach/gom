<template>
  <v-container fluid>
    <v-row>
      <v-text-field
        dense
        readonly
        label="Part Volume Variance"
        :value="$formatNbr(vehicleKPI.partVolumeVariance,2)"
        type="number"
      ></v-text-field>
      <v-text-field
        dense
        readonly
        label="Part Volume Variance - Vehicle Volume"
        :value="$formatNbr(vehicleKPI.partVolumeVarianceVehicle,2)"
        type="number"
      ></v-text-field>
      <v-text-field
        dense
        readonly
        label="Part Volume Variance - IRate"
        :value="$formatNbr(vehicleKPI.partVolumeVarianceIRate,2)"
        type="number"
      ></v-text-field>
      <v-text-field
        dense
        readonly
        label="Mix RollOn"
        :value="$formatNbr(vehicleKPI.mixRollOn,2)"
        type="number"
      ></v-text-field>
      <v-text-field
        dense
        readonly
        label="Mix RollOff"
        :value="$formatNbr(vehicleKPI.mixRollOff,2)"
        type="number"
      ></v-text-field>
      <v-text-field
        dense
        readonly
        label="Mix Volume"
        :value="$formatNbr(vehicleKPI.mixVolume,2)"
        type="number"
      ></v-text-field>
    </v-row>

    <v-checkbox label="Show Variance Details" v-model="showDetails"></v-checkbox>

    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Account</th>
            <th class="text-left">Forecast</th>
            <th class="text-left">Actual</th>
            <th class="text-left">Variance</th>
            <th class="text-left">Variance Volume <tool-tip :value="toolTipVarianceVolume"></tool-tip></th>
            <th class="text-left">Variance Volume - Vehicle - Market Growth <tool-tip :value="toolTipMarketGrowth"></tool-tip></th>
            <th class="text-left">Variance Volume - Vehicle - Market Mix <tool-tip :value="toolTipMix"></tool-tip></th>
            <th v-if="showDetails" class="text-left">Variance Volume - Vehicle - RollOn</th>
            <th v-if="showDetails" class="text-left">Variance Volume - Vehicle - RollOff</th>
            <th v-if="showDetails" class="text-left">Variance Volume - Vehicle - Volume</th>
            <th class="text-left">Variance Volume - Vehicle - Total <tool-tip :value="toolTipVarianceVehicleVolume"></tool-tip></th>
            <th v-if="showDetails" class="text-left">Variance Volume - IRate - RollOn</th>
            <th v-if="showDetails" class="text-left">Variance Volume - IRate - RollOff</th>
            <th v-if="showDetails" class="text-left">Variance Volume - IRate - Volume</th>
            <th class="text-left">Variance Volume - IRate - Total<tool-tip :value="toolTipIRate"></tool-tip></th>
            <th class="text-left">Variance Price <tool-tip :value="toolTipPrice"></tool-tip></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="acc in report" :key="acc.label">
            <td>{{ $getAccountLabel(acc.account) }}</td>
            <td>{{ $formatNbr(acc.forecast) }}</td>
            <td>{{ $formatNbr(acc.actual) }}</td>
            <td>{{ $formatNbr(acc.variance()) }}</td>
            <td>{{ $formatNbr(acc.varianceVolume) }}</td>
            <td>{{ $formatNbr(acc.marketGrowth) }}</td>
            <td>{{ $formatNbr(acc.mixVolume()) }}</td>
            <td v-if="showDetails">{{ $formatNbr(acc.varVehicleVolumeRollOn) }}</td>
            <td v-if="showDetails">{{ $formatNbr(acc.varVehicleVolumeRollOff) }}</td>
            <td v-if="showDetails">{{ $formatNbr(acc.varVehicleVolumeVolume) }}</td>
            <td>{{ $formatNbr(acc.varTotVehicleVolume()) }}</td>
            <td v-if="showDetails">{{ $formatNbr(acc.varIRateRollOn) }}</td>
            <td v-if="showDetails">{{ $formatNbr(acc.varIRateRollOff) }}</td>
            <td v-if="showDetails">{{ $formatNbr(acc.varIRateVolume) }}</td>
            <td>{{ $formatNbr(acc.varTotIRateVolume()) }}</td>
            <td>{{ $formatNbr(acc.varPrice) }}</td>
          </tr>
          <tr>
            <td>b/(w) fcst %</td>
            <td></td>
            <td></td>
            <td>{{$formatNbr(netSalesItem.variance()/netSalesItem.forecast*100,1)}}%</td>
            <td>{{$formatNbr(netSalesItem.varianceVolume/netSalesItem.forecast*100,1)}}%</td>
            <td>{{$formatNbr(netSalesItem.marketGrowth/netSalesItem.forecast*100,1)}}%</td>
            <td>{{$formatNbr(netSalesItem.mixVolume()/netSalesItem.forecast*100,1)}}%</td>
            <td v-if="showDetails">{{$formatNbr(netSalesItem.varVehicleVolumeRollOn/netSalesItem.forecast*100,1)}}%</td>
            <td v-if="showDetails">{{$formatNbr(netSalesItem.varVehicleVolumeRollOff/netSalesItem.forecast*100,1)}}%</td>
            <td v-if="showDetails">{{$formatNbr(netSalesItem.varVehicleVolumeVolume/netSalesItem.forecast*100,1)}}%</td>
            <td>{{$formatNbr(netSalesItem.varTotVehicleVolume()/netSalesItem.forecast*100,1)}}%</td>
            <td v-if="showDetails">{{$formatNbr(netSalesItem.varIRateRollOn/netSalesItem.forecast*100,1)}}%</td>
            <td v-if="showDetails">{{$formatNbr(netSalesItem.varIRateRollOn/netSalesItem.forecast*100,1)}}%</td>
            <td v-if="showDetails">{{$formatNbr(netSalesItem.varIRateRollOn/netSalesItem.forecast*100,1)}}%</td>
            <td>{{$formatNbr(netSalesItem.varTotIRateVolume()/netSalesItem.forecast*100,1)}}%</td>
            <td>{{$formatNbr(netSalesItem.varPrice/netSalesItem.forecast*100,1)}}%</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <br />
    <p>Net NBW: {{$formatNbr(netSalesItem.netNBW())}}</p>
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
  name: "Variance-Report",
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
    showDetails: false,
    toolTipVarianceVolume:['Volume Variance driven by change in Part Volume','function() = (Actual Part Volume - Forecast Part Volume) * Forecast Price'],
    toolTipIRate: [
      "Volume Variance driven by change in IRate",
      "for each vehicle => function() = (Actual IRate - Forecast IRate) * Actual Vehicle Volume * Forecast Price",      
    ],
    toolTipMix:['Volume Variance driven by Vehicle Mix','function() = Volume Variance Vehicle Total - Variance Volume Market Growth '],
    toolTipMarketGrowth:['Volume Variance driven by change in Vehicle Volume','function() = Vehicle Market Growth % * Forecast'],
    toolTipVarianceVehicleVolume:['Volume Variance driven by change in Part Volume derived from Vehicle Volume)',
    'for each vehicle => function() = (Actual Vehicle Volume - Forecast Vehicle Volume) * Forecast IRate * Forecast Price '],
    toolTipPrice:['Price Variance','function() = (Actual Price - Forecast Price) * Actual Volume']
  }),
  computed: {
    report(): YOYReport[] {
      return calcYOYReport(this.forecast, this.actual);
    },
    vehicleKPI(): VehicleVarianceKPI {
      return calcVehicleKPIs(this.forecast, this.actual);
    },
    netSalesItem(): YOYReport | undefined {
      return this.report.find((r) => r.account == IFSAccountLabel.NetSales);
    },
  },
  methods: {
    getVarianceInPercent(varAccount: string): number {
      const item = this.netSalesItem;
      if (!item) return 0;
      return (this as any).$formatNbr((item.variance() / item.actual) * 100, 1);
    },
  },
});
</script>