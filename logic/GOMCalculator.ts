/* GOM caclulator

    Assumptions:

    Current approach to this KPI is to compare the part volume variance on a particular vehicle.
    GOM = (IRate act - IRate fcst) x actual vehicle volume.
    Markt Growth = SUM(Vehicle act) - SUM(vehicle fcst)

    Caveat: Actuals!
    Actuals come in as number by part, we don't know actual vehicle volume or actual irate.
    So if the users enteres actual part volume (same applied to override or fcst) we need to back  into the IRate based on the given vehicle volume.


*/

import { Vehicle, Variant,GOMReport, GOMReportVehicleItem} from '~/logic/Interfaces'
import { getUniqueVehicleTitles } from '~/logic/Vehicle'

export const calcYOYReport = (forecast: Variant, actual: Variant): GOMReport => {

const report = {} as GOMReport

//load actgual volume - night be null
report.actualPartVolume=actual.actuals.volume
report.vehicles=[] as GOMReportVehicleItem[]

const vehicleTitles = getUniqueVehicleTitles(forecast.vehicles,actual.vehicles)

vehicleTitles.forEach(title => {
    let fcst = forecast.vehicles.find(n => n.title == title) ?? null   //assumes name exist only 1 time!
    let act = actual.vehicles.find(n => n.title == title) ?? null    //assumes name exist only 1 time!    
    const vehicle:GOMReportVehicleItem=createItem(title,fcst,act)
    
    report.vehicles.push(vehicle)
    
});


return report

}


const createItem=(title:string,forecast:Vehicle | null, actual:Vehicle | null):GOMReportVehicleItem=>{
    const item = {} as GOMReportVehicleItem
    item.title=title 
    
    item.forecastVolume=forecast?.volume ?? 0
    item.actualVolume=actual?.volume ?? 0
    item.volumeVariance= ()=> item.actualVolume-item.forecastVolume

    item.forecastIRate=forecast?.iRate ?? 0
    item.actualIRate=actual?.iRate ?? 0 
    item.iRateVariance = ()=>item.actualIRate-item.forecastIRate

    item.forecastPartVolume=()=>item.forecastVolume*item.forecastIRate        
    item.actualPartVolume=()=>item.actualVolume*item.actualIRate
    item.partVolumeVariance=()=>item.actualPartVolume()-item.forecastPartVolume()
        
    item.impliedActualIrate=()=>0
    item.yoyBWMarket=()=>0

    return item
}
