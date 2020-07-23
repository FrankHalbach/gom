import { Variant, SalesPrice, Vehicle, ReasonCode, Actuals, PartVolumeForecast } from './Interfaces';



function createVariant(id: number, title: string): Variant {
    const variant = {} as Variant;
    variant.id = id
    variant.title = title
    variant.salesPrice = [] as SalesPrice[]
    variant.vehicles = [] as Vehicle[]
    variant.actuals={} as Actuals
    variant.partVolumeForecast={} as PartVolumeForecast    
    variant.partVolumeVehicle=()=>variant.vehicles.map(v=>v.partVolume()).reduce((a,b) => a + b )  
    

    variant.addVehicle = (title: string, volume: number, iRate: number) => {
        const vehicle = {} as Vehicle;
        vehicle.title = title
        vehicle.volume = volume
        vehicle.iRate = iRate
        vehicle.partVolume =() => vehicle.volume*(vehicle.iRate/100)        

        variant.vehicles.push(vehicle)
    }


    variant.addSalesPrice = (effectiveDate: Date, reasonCode: ReasonCode, priceChange: number) => {
        const sp = {} as SalesPrice
        sp.effectiveDate = effectiveDate
        sp.reasonCode = reasonCode
        sp.priceChange = priceChange
        variant.salesPrice.push(sp)
    }

       
                    
    variant.validPartVolume =() => {
        const actual = variant.actuals.volume
        const forecast= variant.partVolumeForecast.forecast
        const override= variant.partVolumeForecast.override
        const vehicle = variant.vehicles.map(v=>v.partVolume()).reduce((a,b) => a + b )   

        if(Number(actual)) return actual
        if(Number(forecast)) return forecast
        if(Number(override)) return override
        return vehicle ?? 0        
    }

   

    return variant;
}




export { createVariant }
