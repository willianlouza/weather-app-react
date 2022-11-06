import React from 'react'
import SearchBar from './components/SearchBar'
import axios from "axios";
import ITransformedWeather from './model/ITrasformedWeather';
import capitalizeLetters from './utils/capitalizeLetters';
import humidityIcon from './assets/humidity.png'
import windIcon from './assets/wind.png'
import getDate from './utils/getDate';
import Background from './components/Background';

const api = import.meta.env.VITE_API;
const key = import.meta.env.VITE_KEY;

interface IProps { }
interface IState {
  weather: ITransformedWeather | null;
}

export default class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      weather: null
    }
    this.updateWeather = this.updateWeather.bind(this);
  }
  componentDidMount(): void {
    this.updateWeather("rio+de+janeiro,br");
  }
  async updateWeather(params: string): Promise<void> {
    try {
      let query = `${api}q=${params}&units=metric&appid=${key}&lang=pt_br`;
      let result = await (await axios.get(query)).data;
      let date = getDate(result.dt, result.timezone);
      let isDay = ((parseInt(date.hour) > 18 || parseInt(date.hour) < 6)) ? false : true;
      let transformedWeather: ITransformedWeather = {
        city: result.name,
        country: result.sys.country,
        description: capitalizeLetters(result.weather[0].description),
        icon: `http://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`,
        humidity: result.main.humidity,
        temp: result.main.temp.toFixed(),
        wind: result.wind.speed,
        isDay: isDay,
        date: date
      }
      this.setState({ weather: transformedWeather });
      console.log(transformedWeather)
      console.log(result)
      console.log(transformedWeather.date)
    } catch (err) {
      console.log(err)
    }

  }
  render(): React.ReactNode {
    return (
      <div className='w-screen min-h-screen flex'>
        <Background src='' />
        <div className='flex flex-1 place-items-end justify-center box-border pb-32'>
          <div className='flex flex-nowrap place-items-center justify-evenly w-full h-36 px-24 md:bg-green-300 sm:bg-red-500'>
            <h1 className=''>{this.state.weather?.temp}<sup><small>ºc</small></sup></h1>
            <div className='flex flex-col'>
              <h1 className='text-7xl'>{this.state.weather?.city}</h1>
            </div>
          </div>
        </div>

        <SearchBar onSubmit={(params) => { this.updateWeather(params) }} />
      </div>
    )
  }
}
