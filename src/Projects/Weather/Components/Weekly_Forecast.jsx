import React from 'react'
import roundValue from './Utils/RoundValue'

function Weekly_Forecast({index,forecastday}) {
  const day=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
  return (
    <>
      <div className='flex justify-between mr-5 mt-2 items-center'>
        <p className='w-20'>{index==0?"Today":day[new Date(forecastday.date).getDay()]}</p>
        <img className='w-10 h-10'src={forecastday.day.condition.icon} alt="icon"/>
        <div className='w-40 flex justify-between items-center'>
          <div>{roundValue(forecastday.day.mintemp_c)}&deg;</div>
          <div className='w-15 h-2 rounded bg-[orange] text-center'></div>
          <div>{roundValue(forecastday.day.maxtemp_c)}&deg;</div>
        </div>
      </div>
    </>
  )
}

export default Weekly_Forecast