
import { Vehicle } from '~/logic/Interfaces'
import { calcYOYStatus } from './YOYStatusCalculator'


export const createVehicle = (title: string, volume: number, iRate: number, sopDate: Date, eopDate: Date):Vehicle => {
    const vehicle = {} as Vehicle;
    
    vehicle.sop = sopDate
    vehicle.eop = eopDate
    vehicle.title = title
    vehicle.volume = volume
    vehicle.iRate = iRate
    vehicle.partVolume = () => vehicle.volume * (vehicle.iRate / 100)
    vehicle.yoyStatus = () => calcYOYStatus(vehicle)    
    
    return vehicle
}

export const getUniqueVehicleTitles=(forecast:Vehicle[],actual:Vehicle[]):string[]=>[...new Set([...actual.map(n => n.title), ...forecast.map(n => n.title)])]