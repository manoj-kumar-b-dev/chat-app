import React from 'react'
import roundValue from './Utils/RoundValue'

function Today_Forecast(props) {
 
  return (
   <>
    <div className='flex flex-col gap-2 mt-3 '>
      <p className='mb-2'>{roundValue(props.temp_c)}&deg;</p>
      <div className='flex flex-col gap-1'>
        <img className='w-[30px] h-[30px]' src={props.condition.icon} alt="icon" />
        <p className=''>{props.time.split(" ")[1]}</p>
      </div>
    </div>
   </>
  )
}

export default Today_Forecast