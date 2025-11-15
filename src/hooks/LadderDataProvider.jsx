import React, { createContext, useContext, useEffect, useState} from 'react'

const LadderDataContext = createContext()

const LadderDataProvider = ({children}) => {
    const [value, setValue] = useState(() => {
        const stored = localStorage.getItem("ladderData")
        return stored ? JSON.parse(stored) : {
            horizontal: [],
            vertical: []
        }
    })

    useEffect(() => {
        localStorage.setItem("ladderData", JSON.stringify(value))
    }, [value])

    return (
        <LadderDataContext.Provider value={{value, setValue}}>
            {children}
        </LadderDataContext.Provider>
    )
}

export default LadderDataProvider
export const useLadderDataContext = () => useContext(LadderDataContext)