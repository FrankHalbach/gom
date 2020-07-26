/* 
    Purpose of this caclulator is to calculate the volume and sales accounts
    inputs: Variant, Accounts
*/

import { IFSAccount, IFSAccountLabel, Variant, ReasonCode } from '~/logic/Interfaces'
import { validPartVolume } from '~/logic/ValidPartVolumeCaculator'


export const calcVolumeAccounts = (variant: Variant): IFSAccount[] => {

    const volumeAccounts = [] as IFSAccount[]

    const actual = variant.actuals.volume
    const forecast = variant.partVolumeForecast.forecast
    const override = variant.partVolumeForecast.override
    const vehicle =variant.vehicles.map(v => v.partVolume()).reduce((a, b) => a + b,0)
    const volume = validPartVolume(actual, forecast, override, vehicle)

    volumeAccounts.push(
        { label: IFSAccountLabel.Volume_Vehicle, value: vehicle },
        { label: IFSAccountLabel.Volume_Override, value: override },
        { label: IFSAccountLabel.Volume_Forecast, value: forecast },
        { label: IFSAccountLabel.Volume_Actual, value: actual },
        { label: IFSAccountLabel.Volume, value: volume }
    )
    return volumeAccounts;
}



export const calcSalesAccounts = (variant: Variant): IFSAccount[] => {
    const salesAccounts = [] as IFSAccount[];
    
    const volume = variant.validPartVolume() ?? 0
    const actualSales = variant.actuals.netSales;
    
    //calc sales by reason code
    const sales: number = getPriceSum(variant, ReasonCode.BasePrice) * volume
    const salesLTA: number = getPriceSum(variant, ReasonCode.LTA) * volume
    const salesLTAP: number = getPriceSum(variant, ReasonCode.LTAP) * volume
    const salesBL: number = getPriceSum(variant, ReasonCode.BL) * volume
    const salesBLP: number = getPriceSum(variant, ReasonCode.BLP) * volume
    const salesClaim: number = getPriceSum(variant, ReasonCode.Claim) * volume
 
    //netsales - all reason codes
    const netSales:number = getPriceSum(variant) * volume

    let salesVar:number = 0
    let finalNetSales:number = netSales
    
    //if we have actuals we need to handle variances between cacluated actuals and "actual"
    if(actualSales){
        salesVar=actualSales-netSales
        finalNetSales = actualSales ?? netSales
    }

    //insert in resultset
    salesAccounts.push({ label: IFSAccountLabel.Sales, value: sales })
    salesAccounts.push({ label: IFSAccountLabel.Sales_LTA, value: salesLTA })
    salesAccounts.push({ label: IFSAccountLabel.Sales_LTAP, value: salesLTAP })
    salesAccounts.push({ label: IFSAccountLabel.Sales_BL, value: salesBL })
    salesAccounts.push({ label: IFSAccountLabel.Sales_BLP, value: salesBLP })
    salesAccounts.push({ label: IFSAccountLabel.Sales_Claim, value: salesClaim })    
    salesAccounts.push({ label:IFSAccountLabel.Sales_Var, value: salesVar})
    salesAccounts.push({ label: IFSAccountLabel.NetSales, value: finalNetSales})
  

   
    return salesAccounts

}

const getPriceSum = (variant: Variant, reasonCode?: ReasonCode): number => {

    const prices = reasonCode ? variant.salesPrice.filter(s => s.reasonCode == reasonCode) : variant.salesPrice

    if (prices.length == 0)
        return 0

    return prices.map(p => p.priceChange)?.reduce((a, b) => a + b,0)
}