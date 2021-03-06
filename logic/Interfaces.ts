export interface Variant {
    id: number
    title: string
    salesPrice:SalesPrice[]
    vehicles: Vehicle[]
    actuals: Actuals
    partVolumeVehicle:()=> number | null
    partVolumeForecast:PartVolumeForecast
    validPartVolume: ()=> number | null
    addVehicle:(title: string, volume: number, iRate: number,sopDate:Date,eopDate:Date)=>void
    addSalesPrice:(effectiveDate:Date,reasonCode:ReasonCode,priceChange:number)=>void
    volumeAccounts:()=>IFSAccount[]
    salesAccounts:()=>IFSAccount[]
  }

export interface SalesPrice{
    effectiveDate:Date
    reasonCode:ReasonCode
    priceChange: number

}

export enum ReasonCode {
    BasePrice ,
    LTA ,
    LTAP,
    BL,
    BLP,
    Claim
}

export enum YOYOptions{
    RollOn,
    RollOff,
    Volume
}

export interface Vehicle {
    title:string
    volume: number
    iRate: number
    sop:Date
    eop:Date    
    partVolume:() => number    
    yoyStatus:() => YOYOptions
   

}

export interface Actuals {
    netSales:number | null
    volume:number | null
}

 export interface PartVolumeForecast {
    override:number | null
    forecast:number | null     
}

export interface IFSAccount{
    label:IFSAccountLabel,
    value:number | null

}

export enum IFSAccountLabel{
    Volume_Vehicle,
    Volume_Override,
    Volume_Forecast,
    Volume_Actual,
    Volume,
    Sales,
    Sales_LTA,
    Sales_LTAP,
    Sales_BL,
    Sales_BLP,   
    Sales_Claim,  
    Sales_Var,
    NetSales
}


export interface YOYReport {
    account:IFSAccountLabel,
    forecast:number,
    actual:number,
    variance:()=>number,
    marketGrowth:number,
    mixVolume:()=>number,
    varianceVolume:number,
    varVehicleVolumeRollOn:number,
    varVehicleVolumeRollOff:number,
    varVehicleVolumeVolume:number,
    varTotVehicleVolume:()=>number,
    varIRateRollOn:number,
    varIRateRollOff:number,
    varIRateVolume:number,
    varTotIRateVolume:()=>number,
    varPrice:number,
    varFX:number,
    netNBW:()=>number

}


export interface VehicleVarianceKPI{
    /* total part volume from vehicle volume (irate*volume) */
    partVolumeVariance:number,  
    /* part volume from vehicle volume variance */
    partVolumeVarianceVehicle:number,
    /* part volume from irate variance) */
    partVolumeVarianceIRate:number,

    mixRollOn:number,
    mixRollOff:number,
    mixVolume:number,
  
    /*  absolute variance between fcst and act divided by forecast */
    marketGrowth:number


}

export interface GOMReportVehicleItem{
    title:string,

    forecastVolume:number,
    actualVolume:number,
    volumeVariance:()=>number,

    forecastIRate:number,
    actualIRate:number,
    iRateVariance:()=>number,      

    forecastPartVolume:number,
    actualPartVolume:number,
    partVolumeVariance:()=>number,

    impliedActualIrate:()=>number | null,
    impliedActualPartVolume:()=> number | null,
    marketGrowth:()=>number,    
    betterWorseMarket:()=>number

}

export interface GOMReport{
    /* actual part volume from Variant */
    actualPartVolume:number | null,
    vehicles:GOMReportVehicleItem[],
    //actualPartVolumeFactor:()=>number,
    forecastTotalVehicleVolume:()=>number,
    actualTotalVehicleVolume:()=>number
    varianceTotalVehicleVolume:()=>number,

    forecastAvgIRate:()=>number,
    actualAvgIRate:()=>number,
    AvgIRateVariance:()=>number,
        
    forecastTotalPartVolume:()=>number,
    actualTotalPartVolume:()=>number,
    totalPartVolumeVariance:()=>number,
    
    impliedAvgActualIRate:()=>number,
    
    totalMarketGrowth:()=>number,    
    totalBetterWorseMarket:()=>number

}

