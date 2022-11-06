import React from 'react'
import SearchBar from './components/SearchBar'
import axios from "axios";
import ITransformedWeather from './model/ITrasformedWeather';
import capitalizeLetters from './utils/capitalizeLetters';
import humidityIcon from './assets/humidity.png'
import windIcon from './assets/wind.png'
import getDate from './utils/getDate';

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
      let isDay = ((parseInt(date.hour) > 18 || parseInt(date.hour) < 6))? false : true;
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
      <div className={`h-screen w-screen bg-gradient-to-b flex flex-col place-content-center ${this.state.weather?.isDay ? 'from-sky-400 to-sky-200' : 'from-gray-900 via-sky-900 to-sky-800'}  py-6`}>
        <SearchBar onSubmit={(params) => { this.updateWeather(params) }} />
        <div className='container flex mx-auto place-items-center'>
          <div className='w-full flex flex-col place-items-center'>
            <h1 className='font-bold'>{this.state.weather?.city}, {this.state.weather?.country}</h1>
            <h1 className='text-9xl my-5 font-bold'>{this.state.weather?.temp}º</h1>
            <h3>{this.state.weather?.description}</h3>
            <img className='w-36 drop-shadow-md' src={this.state.weather?.icon} />
            <div className='w-full flex justify-evenly my-10'>
              <div className='flex place-items-center'>
                <img src={windIcon} className="w-10 h-10 mr-4" />
                <span>{this.state.weather?.wind}m/s</span>
              </div>
              <div className='flex place-items-center'>
                <img src={humidityIcon} className="w-10 h-10 mr-4" />
                <span>{this.state.weather?.humidity}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
