import { Children, createContext } from "react";

const globalDate = createContext()

import React from 'react'

const dateProvider = ({children}) => {
  return (
    <globalDate.Provider value={{}}>
        {children}

    </globalDate.Provider>
  )
}

export default dateProvider