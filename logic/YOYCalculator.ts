/* 
This calculator holds the business logic for the variances and growth over markets caclculation between two forecast.
input will be two variants (forecast, actual) 

*/

import { IFSAccountLabel, Variant,YOYReport, IFSAccount, VehicleVarianceKPI } from '~/logic/Interfaces'
import { calcVehicleKPIs } from '~/logic/VehicleVarianceCalculator'

export const calcYOYReport=(forecast:Variant,actual:Variant):YOYReport[]=>{

    const report = [] as YOYReport[]

    const vehKPI =  calcVehicleKPIs(forecast,actual)
      
    report.push(createVarAccount(IFSAccountLabel.Volume,forecast.volumeAccounts(),actual.volumeAccounts(),vehKPI))
    report.push(createVarAccount(IFSAccountLabel.Sales,forecast.salesAccounts(),actual.salesAccounts(),vehKPI))
    report.push(createVarAccount(IFSAccountLabel.Sales_LTA,forecast.salesAccounts(),actual.salesAccounts(),vehKPI))
    report.push(createVarAccount(IFSAccountLabel.Sales_LTAP,forecast.salesAccounts(),actual.salesAccounts(),vehKPI))
    report.push(createVarAccount(IFSAccountLabel.Sales_BL,forecast.salesAccounts(),actual.salesAccounts(),vehKPI))
    report.push(createVarAccount(IFSAccountLabel.Sales_BLP,forecast.salesAccounts(),actual.salesAccounts(),vehKPI))
    report.push(createVarAccount(IFSAccountLabel.Sales_Claim,forecast.salesAccounts(),actual.salesAccounts(),vehKPI))
    report.push(createVarAccount(IFSAccountLabel.Sales_Var,forecast.salesAccounts(),actual.salesAccounts(),vehKPI))
    report.push(createVarAccount(IFSAccountLabel.NetSales,forecast.salesAccounts(),actual.salesAccounts(),vehKPI))


    return report

}



const createVarAccount=(account:IFSAccountLabel,fcst:IFSAccount[],act:IFSAccount[], vehKPI:VehicleVarianceKPI):YOYReport=>{    
    
    const acc = {} as YOYReport

    acc.account = account
    acc.forecast = fcst.find(a=>a.label==account)?.value?? 0
    acc.actual = act.find(a=>a.label==account)?.value?? 0 
    acc.variance = () => acc.actual-acc.forecast

    acc.varVehicleVolumeRollOn = vehKPI.mixRollOn *  vehKPI.partVolumeVarianceVehicle / vehKPI.partVolumeVariance * acc.variance(),
    acc.varVehicleVolumeRollOff = vehKPI.mixRollOff * vehKPI.partVolumeVarianceVehicle / vehKPI.partVolumeVariance * acc.variance(),
    acc.varVehicleVolumeVolume = vehKPI.mixVolume * vehKPI.partVolumeVarianceVehicle / vehKPI.partVolumeVariance * acc.variance(),
    acc.varTotVehicleVolume = () => acc.varVehicleVolumeRollOn+acc.varVehicleVolumeRollOff+acc.varVehicleVolumeVolume

    acc.varIRateRollOn = vehKPI.mixRollOn * vehKPI.partVolumeVarianceIRate / vehKPI.partVolumeVariance * acc.variance(),
    acc.varIRateRollOff = vehKPI.mixRollOff * vehKPI.partVolumeVarianceIRate / vehKPI.partVolumeVariance * acc.variance(),
    acc.varIRateVolume = vehKPI.mixVolume * vehKPI.partVolumeVarianceIRate / vehKPI.partVolumeVariance * acc.variance(),
    acc.varTotIRateVolume = () => acc.varIRateRollOn+acc.varIRateRollOff+acc.varIRateVolume

    return acc
 
}