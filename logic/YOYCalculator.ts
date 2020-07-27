/* 
This calculator holds the business logic for the variances and growth over markets caclculation between two forecast.
input will be two variants (forecast, actual) 
*/

import { IFSAccountLabel, Variant, YOYReport, IFSAccount, VehicleVarianceKPI } from '~/logic/Interfaces'
import { calcVehicleKPIs } from '~/logic/VehicleVarianceCalculator'
import { actual } from '~/static/launchData'

// todo : add FX and override fall-back in case of no vehicles assigned. do we need other?
export const calcYOYReport = (forecast: Variant, actual: Variant): YOYReport[] => {

    const report = [] as YOYReport[]

    const vehKPI = calcVehicleKPIs(forecast, actual)

    const sales = createVarAccount(IFSAccountLabel.Sales, forecast, actual, vehKPI)
    const sales_lta = createVarAccount(IFSAccountLabel.Sales_LTA, forecast, actual, vehKPI)
    const sales_ltap = createVarAccount(IFSAccountLabel.Sales_LTAP, forecast, actual, vehKPI)
    const sales_bl = createVarAccount(IFSAccountLabel.Sales_BL, forecast, actual, vehKPI)
    const sales_blp = createVarAccount(IFSAccountLabel.Sales_BLP, forecast, actual, vehKPI)
    const sales_claim = createVarAccount(IFSAccountLabel.Sales_Claim, forecast, actual, vehKPI)
    const sales_var = createVarAccount(IFSAccountLabel.Sales_Var, forecast, actual, vehKPI)
    const netSales = createVarAccount(IFSAccountLabel.NetSales, forecast, actual, vehKPI)

    report.push(sales, sales_lta, sales_ltap, sales_bl, sales_blp, sales_claim, sales_var, netSales)

    return report

}


//Todo: business logic hard to understand, shoudl refactor to make intend clearer
const createVarAccount = (account: IFSAccountLabel, fcst: Variant, act: Variant, vehKPI: VehicleVarianceKPI): YOYReport => {
    //volume variant function = forecast price * (actual_volume - forecast_volume)

    const acc = {} as YOYReport

    acc.account = account
    acc.forecast = fcst.salesAccounts().find(a => a.label == account)?.value ?? 0
    acc.actual = act.salesAccounts().find(a => a.label == account)?.value ?? 0
    acc.variance = () => acc.actual - acc.forecast
    acc.varTotVehicleVolume = () => acc.varVehicleVolumeRollOn + acc.varVehicleVolumeRollOff + acc.varVehicleVolumeVolume
    acc.varTotIRateVolume = () => acc.varIRateRollOn + acc.varIRateRollOff + acc.varIRateVolume
    acc.varPrice = calcPriceVariance(fcst, act, account)

    const actVol = act.validPartVolume()
    const fcstVol = fcst.validPartVolume()
    if (!fcstVol) return acc // in case we have no volume just return empty
      
    
    
    if(acc.forecast==0)
        acc.varianceVolume=0
    else
        acc.varianceVolume = ((actVol ?? 0) - fcstVol)*(acc.forecast/fcstVol)
       
    

    acc.varVehicleVolumeRollOn = vehKPI.mixRollOn * vehKPI.partVolumeVarianceVehicle / vehKPI.partVolumeVariance * acc.varianceVolume
    acc.varVehicleVolumeRollOff = vehKPI.mixRollOff * vehKPI.partVolumeVarianceVehicle / vehKPI.partVolumeVariance * acc.varianceVolume
    acc.varVehicleVolumeVolume = vehKPI.mixVolume * vehKPI.partVolumeVarianceVehicle / vehKPI.partVolumeVariance * acc.varianceVolume

    acc.varIRateRollOn = vehKPI.mixRollOn * (vehKPI.partVolumeVarianceIRate / vehKPI.partVolumeVariance) * acc.varianceVolume
    acc.varIRateRollOff = vehKPI.mixRollOff * (vehKPI.partVolumeVarianceIRate / vehKPI.partVolumeVariance) * acc.varianceVolume
    acc.varIRateVolume = vehKPI.mixVolume * (vehKPI.partVolumeVarianceIRate / vehKPI.partVolumeVariance) * acc.varianceVolume
    
    return acc

}



const calcPriceVariance = (forecast: Variant, actual: Variant, salesAccount: IFSAccountLabel): number => {

    const fcstVol = forecast.validPartVolume()
    const actVol = actual.validPartVolume()

    if (!fcstVol || !actVol) return 0

    const avgPriceFcst = (forecast.salesAccounts().find(a => a.label == salesAccount)?.value ?? 0) / fcstVol
    const avgPriceAct = (actual.salesAccounts().find(a => a.label == salesAccount)?.value ?? 0) / actVol

    return (avgPriceAct - avgPriceFcst) * actVol

}