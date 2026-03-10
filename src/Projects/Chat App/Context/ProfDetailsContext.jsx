import React from 'react'

export const profDetailsContext=React.createContext()
export function ProfDetailsProvider({children})
{
  
  return (
    <profDetailsContext.Provider value={{}}>
      {children}
    </profDetailsContext.Provider>
  )
} 

