
import { createVariant } from '~/logic/Variant'
import { ReasonCode,Variant } from '~/logic/Interfaces'

let forecast: Variant = createVariant(1, "Variant A");
let actual: Variant = createVariant(1, "Variant A");

forecast.addVehicle("Vehicle A", 1000, 5, new Date(2019,1,1), new Date(2024,12,1));
forecast.addVehicle("Vehicle B", 1500, 10,new Date(2019,12,1),new Date(2025,1,1));
forecast.addVehicle("Vehicle C", 500, 50,new Date(2016,1,1),new Date(2020,12,1));

forecast.addSalesPrice(new Date(2019, 1, 1), ReasonCode.BasePrice, 100);
forecast.addSalesPrice(new Date(2020, 1, 1), ReasonCode.LTA, -2);
forecast.addSalesPrice(new Date(2020, 2, 1), ReasonCode.LTAP, -1);

actual.addVehicle("Vehicle A", 1050, 7,new Date(2019,1,1),new Date(2024,12,1));
actual.addVehicle("Vehicle B", 1560, 10,new Date(2019,12,1),new Date(2025,1,1));
actual.addVehicle("Vehicle C", 490, 55,new Date(2016,1,1),new Date(2020,12,1));

actual.addSalesPrice(new Date(2019, 1, 1), ReasonCode.BasePrice, 100);
actual.addSalesPrice(new Date(2020, 1, 1), ReasonCode.LTA, -2);

export {forecast,actual}