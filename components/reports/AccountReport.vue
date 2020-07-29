<template>
  <v-simple-table dense>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Account</th>
          <th class="text-left">Value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="acc in accounts" :key="acc.label">
          <td>{{ $getAccountLabel(acc.label) }}</td>
          <td>{{ $formatNbr(acc.value) }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue"
import { Variant, IFSAccountLabel, IFSAccount } from "~/logic/Interfaces"
import { calcVolumeAccounts } from "~/logic/VariantAccountCalculator"

export default Vue.extend({
  name: "AccountReport",
  props: {
    variant: {
      type: Object,
      required: true,
    } as PropOptions<Variant>,
  },
  computed: {
    accounts(): IFSAccount[] {
      const volAccs= (this.variant as Variant).volumeAccounts()
      const salesAccs=(this.variant as Variant).salesAccounts()
      return volAccs.concat(salesAccs)
    }
  }  
});
</script>