/* GOM caclulator

    Assumptions:

    Current approach to this KPI is to compare the part volume variance on a particular vehicle.
    GOM = (IRate act - IRate fcst) x actual vehicle volume.
    Markt Growth = SUM(Vehicle act) - SUM(vehicle fcst)

    Caveat: Actuals!
    Actuals come in as number by part, we don't know actual vehicle volume or actual irate.
    So if the users enteres actual part volume (same applied to override or fcst) we need to back  into the IRate based on the given vehicle volume.


*/

import { Vehicle, Variant, GOMReport, GOMReportVehicleItem } from '~/logic/Interfaces'
import { getUniqueVehicleTitles } from '~/logic/Vehicle'

export const calcYOYReport = (forecast: Variant, actual: Variant): GOMReport => {

    const report = {} as GOMReport

    //load actgual volume - night be null
    report.actualPartVolume = actual.validPartVolume()
    report.vehicles = [] as GOMReportVehicleItem[]

    //ratio between report actual part volume from operations volume_actul and calculated actual from vehicle volume x irate
    const factor = (): number | null => (report.actualPartVolume ?? 0) / report.vehicles.map(v => v.actualPartVolume).reduce((a, b) => a + b)   

    const vehicleTitles = getUniqueVehicleTitles(forecast.vehicles, actual.vehicles)

    vehicleTitles.forEach(title => {
        let fcst = forecast.vehicles.find(n => n.title == title) ?? null   //assumes name exist only 1 time!
        let act = actual.vehicles.find(n => n.title == title) ?? null    //assumes name exist only 1 time!    
        const vehicle: GOMReportVehicleItem = createItem(title, fcst, act, factor)

        report.vehicles.push(vehicle)

    });


    

    report.forecastTotalVehicleVolume = () => report.vehicles.map(v => v.forecastVolume).reduce((a, b) => a + b,0)
    report.actualTotalVehicleVolume = () => report.vehicles.map(v => v.actualVolume).reduce((a, b) => a + b, 0)
    report.varianceTotalVehicleVolume = () => report.actualTotalVehicleVolume() - report.forecastTotalVehicleVolume()

    report.actualTotalPartVolume = () => report.vehicles.map(v => v.actualPartVolume).reduce((a, b) => a + b, 0) //* (factor() ?? 1)
    report.forecastTotalPartVolume = () => report.vehicles.map(v => v.forecastPartVolume).reduce((a, b) => a + b, 0) 
    report.totalPartVolumeVariance = () => (report.actualPartVolume ?? report.actualTotalPartVolume()) - report.forecastTotalPartVolume() 

    report.forecastAvgIRate = () => report.forecastTotalPartVolume() / report.forecastTotalVehicleVolume() * 100
    report.actualAvgIRate = () => report.actualTotalPartVolume() / report.actualTotalVehicleVolume() * 100
    report.AvgIRateVariance = () => report.actualAvgIRate() - report.forecastAvgIRate()

    report.impliedAvgActualIRate = () => (factor() ?? 1) * report.actualAvgIRate()    

    report.totalMarketGrowth = () => (report.actualTotalVehicleVolume() - report.forecastTotalVehicleVolume()) / report.forecastTotalVehicleVolume() * 100    
    report.totalBetterWorseMarket = () => (report.impliedAvgActualIRate() ?? report.actualAvgIRate()) - report.forecastAvgIRate()

    return report

}


const createItem = (title: string, forecast: Vehicle | null, actual: Vehicle | null, actualPartVolumeFactor: () => number | null): GOMReportVehicleItem => {
    const item = {} as GOMReportVehicleItem


    

    item.title = title

    item.forecastVolume = forecast?.volume ?? 0
    item.actualVolume = actual?.volume ?? 0
    item.volumeVariance = () => item.actualVolume - item.forecastVolume

    item.forecastIRate = forecast?.iRate ?? 0
    item.actualIRate = actual?.iRate ?? 0
    item.iRateVariance = () => item.actualIRate - item.forecastIRate

    item.forecastPartVolume = forecast?.partVolume() ?? 0    
    item.actualPartVolume = actual?.partVolume() ?? 0    


    item.impliedActualIrate = () => {
        const factor = actualPartVolumeFactor()
        if (factor)
            return factor * item.actualIRate
        return null
    }

    item.impliedActualPartVolume=()=>(item.impliedActualIrate() ?? 0 )/100*item.actualVolume

    item.partVolumeVariance = () => (item.impliedActualPartVolume() ?? item.actualPartVolume) - item.forecastPartVolume

    item.marketGrowth = () => (item.actualVolume - item.forecastVolume) / item.forecastVolume * 100

    item.betterWorseMarket = () => (item.impliedActualIrate() ?? item.actualIRate) - item.forecastIRate

    return item
}
