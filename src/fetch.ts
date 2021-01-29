import axios from 'axios';
import { DateTime } from 'luxon';
import { CustomersUsageParams, EnergyType, REQUEST_METHOD, ShellRequest, ShellResponse, Usages } from "./shellTypes";

async function getCustomerUsage(requestParams: CustomersUsageParams, sessionId: string) {
  const requestData: ShellRequest = {
    method: REQUEST_METHOD.CUSTOMERS_USAGE,
    params: requestParams,
    "id": 2
  };

  const res = await axios.post<ShellResponse>("https://www.shellenergy.co.uk/json-rpc", requestData, {
    headers: {
      "content-type": "application/json",
      "x-requested-with": "XMLHttpRequest",
      cookie: `uissid=${sessionId}`
    }
  });
  return res.data;
}

function simplifyData(data: ShellResponse) {
  const usages: Usages = data.result.data.meters[0].usages;;
  const unit = data.result.data.meters[0].units;
  if (!usages)
    throw new Error('No data available for date or energy type');

  const periods = Object.keys(usages);
  return periods.flatMap((period) => {
    return usages[period].map(({ value, year, month, day, time, monetarySpend, energyType }) => {
      return { year, month, day, time, energyType, value, unit, monetarySpend };
    });
  });
}

export async function fetchData({ sessionId, date, customerId }: { sessionId: string; date: string; customerId: number }) {
  const dateToFetch = DateTime.fromISO(date);
  const energyTypes: EnergyType[] = ['gas', 'electricity'];

  const data = await Promise.all((energyTypes).map((energyType) => {
    const params: CustomersUsageParams = [
      customerId,
      "halfhourly",
      energyType,
      dateToFetch.toISODate(),
      dateToFetch.toISODate(),
      false
    ];
    return getCustomerUsage(params, sessionId);
  }));

  const [gasData, electricityData] = data.map(simplifyData);
  return { gasData, electricityData }
}