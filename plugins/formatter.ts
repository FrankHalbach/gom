import Vue from 'vue'
import { IFSAccountLabel } from '~/logic/Interfaces'

declare module 'vue/types/vue' {
  interface Vue {
    $myInjectedFunction(message: string): void,
    $formatNbr(value: number, digits: number | null): string,
    $roundNumber(number: number, precision: number): number,
    $getISODate(d: Date): string,
    $getAccountLabel(label: IFSAccountLabel): String
  }
}

Vue.prototype.$myInjectedFunction = (message: string) => console.log(message)
Vue.prototype.$formatNbr = (value: number, digits: number | null) => value?.toLocaleString(undefined, { minimumFractionDigits: digits ?? 0, maximumFractionDigits: digits ?? 0, })

Vue.prototype.$roundNumber = (number: number, precision: number): number => {
  const p = Math.pow(10, precision)
  return Math.round(number * p + Number.EPSILON) / p
}

Vue.prototype.$getISODate = (d: string) => new Date(d).toISOString().slice(0, 10)
Vue.prototype.$getAccountLabel = (label: IFSAccountLabel) => IFSAccountLabel[label]

