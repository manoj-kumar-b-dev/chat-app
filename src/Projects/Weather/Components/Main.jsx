import React from 'react'
import '../Styles/main.css'
import '../Styles/general.css'
import Today_Forecast from './Today_Forecast'
import Weekly_Forecast from './Weekly_Forecast'
import fetchWeatherData from './fetchWeatherData'

function Main() {
  const [location,setLocation] =React.useState(null);
  const locationInput=React.useRef("");
  const apiKey="0a7d519654a44c5a818100810251411";  
  const [weatherForecast,setWeatherForecast]=React.useState(null);
  const [errorMessage,setError]=React.useState(false);

//fetch user current or nearest location

  React.useEffect(()=>
  {
    navigator.geolocation.getCurrentPosition(position=>
    {
      let lat=position.coords.latitude;
      let lon=position.coords.longitude;
      console.log(lat)
      lat && fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`).then(result=>result.json()).then(data=>
      {
        setLocation(false || data.address.county || data.address.state_district)
      })
  },
    error=>console.log("Location Access Denied",error))
  },[])
console.log(location)
//fetch weather data using weatherapi
  React.useEffect(()=>
  {
    location && fetchWeatherData(apiKey,location).then((data=>
    {
      setWeatherForecast(data)
      setError("")
    }
    )).catch(error=>setError(error))
  },[location])

  const todayForecast=weatherForecast?.forecast.forecastday[0].hour.map((hourlyForecast,index)=><Today_Forecast key={index} {...hourlyForecast} />)

  const weeklyForecast=weatherForecast?.forecast.forecastday.map((forecastday,index)=>
  {
    return  <Weekly_Forecast key={index} index={index} forecastday={forecastday}/>
  })
  function addLocation()
  {
   setLocation(locationInput.current.value);
   
  }

  return (
    <main className='flex justify-center items-center h-full '>
      <div className='w-115 h-full bg-linear-to-r from-[rgba(27,145,213,0.83)] to-[rgba(13,45,141,1)] rounded-lg overflow-y-auto '>

          <div className='flex ml-8 w-100 h-20 mt-5 items-center gap-3 '>
            <input required onKeyUp={e=>e.key==="Enter"?addLocation():'null'} className='!placeholder-[white] border-2 shadow-md  rounded-xl border-[rgba(40,145,238,1)] h-12 text-[17px] w-60 pl-5 outline-none' ref={locationInput} type="text" placeholder='Enter location' />
            <button type='submit' onClick={addLocation} className='border-2 rounded-xl h-11 cursor-pointer w-15 shadow-lg  border-[rgba(40,145,238,1)] text-2xl'>+</button>
          </div>

           {errorMessage?<p className='!text-[red] text-lg ml-9'>{errorMessage.message}</p>:null}

        <div className='mt-8 ml-8'>
          <section className=''>
            <div>
              <p className='text-xl'>{ weatherForecast?.location.name}</p>
              {weatherForecast ?<p className=' mt-5 text-6xl relative'>{Math.round(weatherForecast?.current?.temp_c)}&deg;C</p>:""}
            </div>
    
            <div className='flex gap-2 mt-2'>
              <img className='w-10 h-10' src={weatherForecast?.current.condition.icon} alt="" />
              <span className='mt-2 text-lg tracking-[1px] '>{weatherForecast?.current.condition.text}</span>
            </div>
            <p className='w-25 h-9 mt-3 rounded-3xl pl-6 pt-[5px] bg-[black] aqi shadow-lg'>AQI {Math.round(weatherForecast?weatherForecast.current.air_quality.pm2_5:"")}</p>
          </section>

          <section className='mt-12 pl-6 text-[17px] border-1 w-95 h-45  pt-2 rounded-lg container overflow-x-scroll  overflow-y-hidden  py-32 today-forecast '>
              <p>24-hour forecast</p>  
              <div className='flex gap-3'>
               {todayForecast}
              </div> 
          </section>

          <section className='mt-10 text-[17px] border-1 w-95 h-55 pl-4 pt-2 rounded-lg container'>
            <p>3-day forecast</p>
            {weeklyForecast}
          </section>
        </div>
        
      </div>
    </main>
  )
  /*
  future development
  day and night theme
  wind speed and humidity 
  mobile and pc layout(media frame)

  */
}

export default Main