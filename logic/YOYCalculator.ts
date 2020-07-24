import { YOYOptions, Vehicle  } from '~/logic/Interfaces'

//from SOP
const rollOnPeriodDays:number = 365
//before EoP
const rollOffPeriodDays:number = 365

const rollOnDate :Date= new Date()
const rollOffDate:Date= new Date()

rollOnDate.setDate(rollOnDate.getDate() - rollOnPeriodDays); 
rollOffDate.setDate(rollOffDate.getDate() + rollOffPeriodDays)

//logic
const calcYOYStatus=(vehicle:Vehicle):YOYOptions => {
  
    if(vehicle.sop>rollOnDate)
        return YOYOptions.RollOn
   
    if(vehicle.eop<rollOffDate)
        return YOYOptions.RollOff
    
        return YOYOptions.Volume
}

export { calcYOYStatus }