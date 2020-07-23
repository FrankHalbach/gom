interface Variant {
    id: number
    title: string
    salesPrice:SalesPrice[]
    vehicles: Vehicle[]
    actuals: Actuals
    partVolumeVehicle:()=> number | null
    partVolumeForecast:PartVolumeForecast
    validPartVolume: ()=> number | null
    addVehicle:(title: string, volume: number, iRate: number)=>void
    addSalesPrice:(effectiveDate:Date,reasonCode:ReasonCode,priceChange:number)=>void
  }

interface SalesPrice{
    effectiveDate:Date
    reasonCode:ReasonCode
    priceChange: number

}

enum ReasonCode {
    BasePrice ,
    LTA ,
    LTAP,
    EDD ,
    Other 
}

interface Vehicle {
    title:string
    volume: number
    iRate: number    
    partVolume: () => number;
}

interface Actuals {
    netSales:number | null
    volume:number | null
}

interface PartVolumeForecast {
    override:number | null
    forecast:number | null     
}



export {Variant,SalesPrice,ReasonCode,Vehicle,Actuals,PartVolumeForecast}