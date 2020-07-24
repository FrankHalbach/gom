/*
This function caclulates the valid volume for a period
*/
export const validPartVolume = (actual: number | null, forecast: number | null, override: number | null, vehicle: number | null) => {
    if (Number(actual)) return actual
    if (Number(forecast)) return forecast
    if (Number(override)) return override
    return vehicle ?? 0
}