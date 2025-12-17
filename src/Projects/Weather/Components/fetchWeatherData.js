async function fetchWeatherData(apiKey,location)
{

  const result=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=5&aqi=yes&alerts=no`)

  if(result.ok)
  {
    return await result.json()
  }
  else
  {
    throw new Error( "Location not found. Try another location")
  }
} 
export default fetchWeatherData