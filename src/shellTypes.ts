export enum REQUEST_METHOD {
  CUSTOMERS_USAGE = 'customersUsage'
}

export type EnergyType = "gas" | "electricity";

export type CustomersUsageParams = [
  custNumber: number,
  interval: "halfhourly" | "daily" | "monthly",
  type: EnergyType,
  startdate: string,
  enddate: string,
  snaptomonth: boolean
];

export interface ShellRequest {
  method: REQUEST_METHOD;
  params: CustomersUsageParams,
  id: number
}

export interface UsagePeriod {
  startDate: string;
  endDate: string;
}

export interface Hover {
  fillColor: string;
  radius: number;
}

export interface States {
  hover: Hover;
}

export interface Marker {
  fillColor: string;
  states: States;
  radius: number;
}

export interface usage {
  value: number;
  xLabel: string;
  human_readable_date: string;
  year: string;
  month: string;
  day: string;
  time: string;
  monetarySpend: number;
  energyType: string;
  marker: Marker;
  color: string;
  i: number;
  previous: string;
  next: string;
  timeSlot: string;
  type: string;
  complete: boolean;
}

export interface Hover2 {
  fillColor: string;
  radius: number;
}

export interface States2 {
  hover: Hover2;
}

export interface Marker2 {
  fillColor: string;
  states: States2;
  radius: number;
}

export interface Usages {
  [key: string]: usage[];
}

export interface Meter {
  meterSerialNo: string;
  units: string;
  usagePeriod: UsagePeriod;
  minUsage: number;
  maxUsage: number;
  usages: Usages;
}

export interface Next {
  startdate: string;
  enddate: string;
}

export interface Previous {
  startdate: string;
  enddate: string;
}

export interface Links {
  next: Next;
  previous: Previous;
}

export interface TariffRate {
  unitRate: string;
  monetarySpendUnits: string;
  monetarySpendDisplay: boolean;
}

export interface Data {
  granularity: string;
  meters: Meter[];
  _links: Links;
  tariffRate: TariffRate;
  uniqueYears: string[];
}

export interface Result {
  success: boolean;
  code: number;
  error: string;
  data: Data;
}

export interface ShellResponse {
  result: Result;
  id: string;
}

