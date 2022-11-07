import React from 'react'
import SearchBar from './components/SearchBar'
import axios from "axios";
import ITransformedWeather from './model/ITransformedWeather';
import capitalizeLetters from './utils/capitalizeLetters';
import humidityIcon from './assets/humidity.png'
import windIcon from './assets/wind.png'
import getDate, { DateFormat } from './utils/getDate';
import Background from './components/Background';
import BlurryCard from './components/BlurryCard';
import { getBackground, findDescription } from "./components/BackgroundImages"

const api = import.meta.env.VITE_API;
const key = import.meta.env.VITE_KEY;

interface IProps { }
interface IState {
  weather: ITransformedWeather | null;
  background: string;
}

export default class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      weather: null,
      background: ""
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
      let date: DateFormat = getDate(result.dt, result.timezone);
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
      let bg = getBackground(isDay, findDescription(result.weather[0].id));
      this.setState({ weather: transformedWeather, background: bg });
    } catch (err) {
      console.log(err)
    }

  }
  render(): React.ReactNode {
    return (
      <div className='w-screen min-h-screen flex'>
        <Background src={this.state.background} />
        <SearchBar onSubmit={(params) => { this.updateWeather(params) }} />
        <div className='flex flex-1 justify-evenly box-border place-items-center bg-red pt-20'>
          <div className='flex flex-col h-full flex-nowrap place-items-center justify-evenly w-full'>
            <div className='flex flex-col place-items-center my-2'>
              <h1 className='text-7xl text-center'>{this.state.weather?.city}</h1>
              <span className='text-xl font-light mt-4'>{this.state.weather?.date.hour}:{this.state.weather?.date.minute} - {this.state.weather?.date.week} {this.state.weather?.date.day} {this.state.weather?.date.month} {this.state.weather?.date.year}</span>
            </div>
            <BlurryCard className='flex-col place-content-center p-8' color='rgba(0,0,0,0.2)'>
              <div className='text-center flex flex-col place-content-center justify-center my-2'>
                <div className='relative'>
                  <h1 className='text-9xl'>{this.state.weather?.temp}</h1>
                  <h2 className='absolute top-0 right-0 text-3xl'>ºC</h2>
                </div>
                <div className='flex flex-nowrap w-full justify-center place-content-center'>
                  <div className='flex flex-nowrap place-items-center'>
                    <img src={humidityIcon} className="w-6 h-6" />
                    <span className='ml-2 text-xl font-light'>{this.state.weather?.humidity}%</span>
                  </div>
                  <div className='ml-4 flex flex-nowrap place-items-center'>
                    <img src={windIcon} className="w-6 h-6" />
                    <span className='ml-2 text-xl font-light'>{this.state.weather?.wind} m/s</span>
                  </div>
                </div>
              </div>
              <div className='flex flex-col place-items-center my-2'>
                <img src={this.state.weather?.icon} />
                <span>{this.state.weather?.description}</span>
              </div>
            </BlurryCard>
          </div>
        </div>
      </div>
    )
  }
}
