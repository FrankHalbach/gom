import { Variant, VehicleVarianceKPI, IFSAccountLabel, YOYOptions, Vehicle } from '~/logic/Interfaces'
import { getUniqueVehicleTitles } from '~/logic/Vehicle'

export const calcVehicleKPIs = (forecast: Variant, actual: Variant): VehicleVarianceKPI => {

    const kpi = { partVolumeVariance: 0, partVolumeVarianceVehicle: 0, partVolumeVarianceIRate: 0, mixRollOn: 0, mixRollOff: 0, mixVolume: 0 , marketGrowth:0} as VehicleVarianceKPI

    const fcstVol = forecast.volumeAccounts().find(a => a.label == IFSAccountLabel.Volume_Vehicle)?.value ?? 0
    const actVol = actual.volumeAccounts().find(a => a.label == IFSAccountLabel.Volume_Vehicle)?.value ?? 0
    kpi.partVolumeVariance = actVol - fcstVol
 
    if (forecast.vehicles.length == 0 || actual.vehicles.length == 0)
        return kpi // return empty  

    // todo: need mix for act and fcst?
    const totPartVolume = actual.vehicles.map(v => v.partVolume()).reduce((a, b) => a + b, 0)
    const mixVolume = actual.vehicles.filter(v => v.yoyStatus() == YOYOptions.Volume).map(a => a.partVolume()).reduce((a, b) => a + b, 0)
    const mixRON = actual.vehicles.filter(v => v.yoyStatus() == YOYOptions.RollOn).map(a => a.partVolume()).reduce((a, b) => a + b, 0)
    const mixROFF = actual.vehicles.filter(v => v.yoyStatus() == YOYOptions.RollOff).map(a => a.partVolume()).reduce((a, b) => a + b, 0)
    //todo need function to filter or return 0 if not vehicels.

    kpi.mixVolume = mixVolume / totPartVolume
    kpi.mixRollOn = mixRON / totPartVolume
    kpi.mixRollOff = mixROFF / totPartVolume

    // need to go by title to identify vehicle for comparission!
    // need to handle each vehicle in act and forecast. so if vehicle exist in forecast but not actual, variance shoudl go to volume, some other way arround
    // strategy: join fcst&actu vehicle names and run calc for each name, save total


    const names = getUniqueVehicleTitles(actual.vehicles,forecast.vehicles)

    let partVolVehVar = 0
    let partIRateVehVar = 0

    names.forEach(name => {
        let fcst = forecast.vehicles.find(n => n.title == name) ?? null   //assumes name exist only 1 time!
        let act = actual.vehicles.find(n => n.title == name) ?? null    //assumes name exist only 1 time!
        partVolVehVar += calcVehiclePartVolumeVariance(fcst, act)
        partIRateVehVar += calcVehicleIRateVariance(fcst, act)
    });

    kpi.partVolumeVarianceVehicle = partVolVehVar
    kpi.partVolumeVarianceIRate = partIRateVehVar


 
    kpi.marketGrowth = calcMarketGrowth(forecast.vehicles,actual.vehicles)  //calc market growth



    return kpi


}

const calcMarketGrowth=(forecast:Vehicle[],actual:Vehicle[]):number=>{
    if(forecast.length==0 || actual.length==0) return 0;

    const fcstVol=forecast.map(v=>v.volume).reduce((a,b)=>a+b,0)
    const actVol=actual.map(v=>v.volume).reduce((a,b)=>a+b,0)

    const growth= (actVol-fcstVol)/fcstVol
    return growth
}

const calcVehiclePartVolumeVariance = (forecast: Vehicle | null, actual: Vehicle | null): number => {

    if (!forecast && !actual)
        return 0

    if (!forecast && actual)
        return actual.partVolume()

    if (forecast && !actual)
        return -forecast.partVolume()

    if (actual && forecast)
        return (actual.volume - forecast.volume) * forecast.iRate / 100

    return 0

}


const calcVehicleIRateVariance = (forecast: Vehicle | null, actual: Vehicle | null): number => {

    if (!forecast || !actual)
        return 0
    
    return actual.volume * (actual.iRate - forecast.iRate) / 100
    
}