import { Variant, SalesPrice, Vehicle, ReasonCode, Actuals, PartVolumeForecast } from './Interfaces';
import { calcYOYStatus } from './YOYStatusCalculator'
import { calcVolumeAccounts, calcSalesAccounts } from '~/logic/VariantAccountCalculator'
import { validPartVolume } from '~/logic/ValidPartVolumeCaculator'


function createVariant(id: number, title: string): Variant {
    const variant = {} as Variant;
    variant.id = id
    variant.title = title
    variant.salesPrice = [] as SalesPrice[]
    variant.vehicles = [] as Vehicle[]
    variant.actuals = {} as Actuals
    variant.partVolumeForecast = {} as PartVolumeForecast
    variant.partVolumeVehicle = () => variant.vehicles.map(v => v.partVolume()).reduce((a, b) => a + b,0)
    variant.volumeAccounts = () => calcVolumeAccounts(variant)
    variant.salesAccounts = () => calcSalesAccounts(variant)


    variant.addVehicle = (title: string, volume: number, iRate: number, sopDate: Date, eopDate: Date) => {
        const vehicle = {} as Vehicle;
        vehicle.sop = sopDate
        vehicle.eop = eopDate
        vehicle.title = title
        vehicle.volume = volume
        vehicle.iRate = iRate
        vehicle.partVolume = () => vehicle.volume * (vehicle.iRate / 100)
        vehicle.yoyStatus = () => calcYOYStatus(vehicle)
        variant.vehicles.push(vehicle)
    }


    variant.addSalesPrice = (effectiveDate: Date, reasonCode: ReasonCode, priceChange: number) => {
        const sp = {} as SalesPrice
        sp.effectiveDate = effectiveDate
        sp.reasonCode = reasonCode
        sp.priceChange = priceChange
        variant.salesPrice.push(sp)
    }



    variant.validPartVolume = () => {
        const actual = variant.actuals.volume
        const forecast = variant.partVolumeForecast.forecast
        const override = variant.partVolumeForecast.override
        const vehicle = variant.vehicles.map(v => v.partVolume()).reduce((a, b) => a + b,0)
        return validPartVolume(actual,forecast,override,vehicle)        
    }



    return variant;
}




export { createVariant }
