import React, { createContext, useContext, useState} from 'react'

const StatusContext = createContext()

const StatusProvider = ({children}) => {
    const [value, setValue] = useState({
        status: {
            busy: false,
            gpOpened: false,
            capPresent: false,
            springPresent: false,
            pistonPresent: true,
            bodyPresent: true,
        },
    })
    
    return (
        <StatusContext.Provider value={{value, setValue}}>
            {children}
        </StatusContext.Provider>
    )
}

export default StatusProvider
export const useStatusContext = () => useContext(StatusContext)