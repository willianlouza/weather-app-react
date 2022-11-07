import { DateFormat } from './../utils/getDate';
export default interface ITransformedWeather{
  city: string;
  country: string;
  description: string;
  icon: string;
  temp: string;
  humidity: number;
  wind: number;
  date: DateFormat;
  isDay: boolean;
}