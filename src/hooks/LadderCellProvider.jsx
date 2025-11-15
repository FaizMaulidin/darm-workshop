import React, { createContext, useContext, useState} from 'react'

const LadderCellContext = createContext()

const LadderCellProvider = ({children}) => {
    const [value, setValue] = useState({
        contact: {
            inputs: {
                I1: {
                    type: "contact",
                    name: "I1",
                    state: false,
                    categ: "inputs",
                    notes: "Arm Busy"
                },
                I2: {
                    type: "contact",
                    name: "I2",
                    state: false,
                    categ: "inputs",
                    notes: "Gripper Opened"
                },
                I3: {
                    type: "contact",
                    name: "I3",
                    state: false,
                    categ: "inputs",
                    notes: "Body Present"
                },
                I4: {
                    type: "contact",
                    name: "I4",
                    state: false,
                    categ: "inputs",
                    notes: "Piston Present"
                },
                I5: {
                    type: "contact",
                    name: "I5",
                    state: false,
                    categ: "inputs",
                    notes: "Spring Present"
                },
                I6: {
                    type: "contact",
                    name: "I6",
                    state: false,
                    categ: "inputs",
                    notes: "Cap Present"
                },
            },
            outputs: {
                Q1: {
                    type: "contact",
                    name: "Q1",
                    state: false,
                    categ: "outputs",
                    notes: "Arm Movements_Q0"
                },
                Q2: {
                    type: "contact",
                    name: "Q2",
                    state: false,
                    categ: "outputs",
                    notes: "Arm Movements_Q1"
                },
                Q3: {
                    type: "contact",
                    name: "Q3",
                    state: false,
                    categ: "outputs",
                    notes: "Arm Movements_Q2"
                },
                Q4: {
                    type: "contact",
                    name: "Q4",
                    state: false,
                    categ: "outputs",
                    notes: "Gripper"
                },
                Q5: {
                    type: "contact",
                    name: "Q5",
                    state: false,
                    categ: "outputs",
                    notes: "Spring Mag Extend"
                },
                Q6: {
                    type: "contact",
                    name: "Q6",
                    state: false,
                    categ: "outputs",
                    notes: "Spring Mag Retract"
                },
                Q7: {
                    type: "contact",
                    name: "Q7",
                    state: false,
                    categ: "outputs",
                    notes: "Feed Cap"
                },
            },
            memory: {
                M1: {
                    type: "contact",
                    name: "M1",
                    state: false,
                    categ: "memory",
                },
                M2: {
                    type: "contact",
                    name: "M2",
                    state: false,
                    categ: "memory",
                },
                M3: {
                    type: "contact",
                    name: "M3",
                    state: false,
                    categ: "memory",
                },
                M4: {
                    type: "contact",
                    name: "M4",
                    state: false,
                    categ: "memory",
                },
                M5: {
                    type: "contact",
                    name: "M5",
                    state: false,
                    categ: "memory",
                },
                M6: {
                    type: "contact",
                    name: "M6",
                    state: false,
                    categ: "memory",
                },
                M7: {
                    type: "contact",
                    name: "M7",
                    state: false,
                    categ: "memory",
                },
                M8: {
                    type: "contact",
                    name: "M8",
                    state: false,
                    categ: "memory",
                },
                M9: {
                    type: "contact",
                    name: "M9",
                    state: false,
                    categ: "memory",
                },
                MA: {
                    type: "contact",
                    name: "MA",
                    state: false,
                    categ: "memory",
                },
                MB: {
                    type: "contact",
                    name: "MB",
                    state: false,
                    categ: "memory",
                },
                MC: {
                    type: "contact",
                    name: "MC",
                    state: false,
                    categ: "memory",
                },
            }
        },
        coil: {
            outputs:{
                Q1: {
                    type: "coil",
                    name: "Q1",
                    state: false,
                    categ: "outputs",
                    notes: "Arm Position_Q2"
                },
                Q2: {
                    type: "coil",
                    name: "Q2",
                    state: false,
                    categ: "outputs",
                    notes: "Arm Position_Q1"
                },
                Q3: {
                    type: "coil",
                    name: "Q3",
                    state: false,
                    categ: "outputs",
                    notes: "Arm Position_Q0"
                },
                Q4: {
                    type: "coil",
                    name: "Q4",
                    state: false,
                    categ: "outputs",
                    notes: "Gripper"
                },
                Q5: {
                    type: "coil",
                    name: "Q5",
                    state: false,
                    categ: "outputs",
                    notes: "Spring Mag Extend"
                },
                Q6: {
                    type: "coil",
                    name: "Q6",
                    state: false,
                    categ: "outputs",
                    notes: "Spring Mag Retract"
                },
                Q7: {
                    type: "coil",
                    name: "Q7",
                    state: false,
                    categ: "outputs",
                    notes: "Feed Cap"
                },
                RQ1: {
                    type: "coil",
                    name: "RQ1",
                    state: false,
                    categ: "outputs",
                    notes: "Arm Position_Q2"
                },
                RQ2: {
                    type: "coil",
                    name: "RQ2",
                    state: false,
                    categ: "outputs",
                    notes: "Arm Position_Q1"
                },
                RQ3: {
                    type: "coil",
                    name: "RQ3",
                    state: false,
                    categ: "outputs",
                    notes: "Arm Position_Q0"
                },
                RQ4: {
                    type: "coil",
                    name: "RQ4",
                    state: false,
                    categ: "outputs",
                    notes: "Gripper"
                },
                RQ5: {
                    type: "coil",
                    name: "RQ5",
                    state: false,
                    categ: "outputs",
                    notes: "Spring Mag Extend"
                },
                RQ6: {
                    type: "coil",
                    name: "RQ6",
                    state: false,
                    categ: "outputs",
                    notes: "Spring Mag Retract"
                },
                RQ7: {
                    type: "coil",
                    name: "RQ7",
                    state: false,
                    categ: "outputs",
                    notes: "Feed Cap"
                },
            },
            memory: {
                M1: {
                    type: "coil",
                    name: "M1",
                    state: false,
                    categ: "memory",
                },
                M2: {
                    type: "coil",
                    name: "M2",
                    state: false,
                    categ: "memory",
                },
                M3: {
                    type: "coil",
                    name: "M3",
                    state: false,
                    categ: "memory",
                },
                M4: {
                    type: "coil",
                    name: "M4",
                    state: false,
                    categ: "memory",
                },
                M5: {
                    type: "coil",
                    name: "M5",
                    state: false,
                    categ: "memory",
                },
                M6: {
                    type: "coil",
                    name: "M6",
                    state: false,
                    categ: "memory",
                },
                M7: {
                    type: "coil",
                    name: "M7",
                    state: false,
                    categ: "memory",
                },
                M8: {
                    type: "coil",
                    name: "M8",
                    state: false,
                    categ: "memory",
                },
                M9: {
                    type: "coil",
                    name: "M9",
                    state: false,
                    categ: "memory",
                },
                MA: {
                    type: "coil",
                    name: "MA",
                    state: false,
                    categ: "memory",
                },
                MB: {
                    type: "coil",
                    name: "MB",
                    state: false,
                    categ: "memory",
                },
                MC: {
                    type: "coil",
                    name: "MC",
                    state: false,
                    categ: "memory",
                },
                RM1: {
                    type: "coil",
                    name: "RM1",
                    state: false,
                    categ: "memory",
                },
                RM2: {
                    type: "coil",
                    name: "RM2",
                    state: false,
                    categ: "memory",
                },
                RM3: {
                    type: "coil",
                    name: "RM3",
                    state: false,
                    categ: "memory",
                },
                RM4: {
                    type: "coil",
                    name: "RM4",
                    state: false,
                    categ: "memory",
                },
                RM5: {
                    type: "coil",
                    name: "RM5",
                    state: false,
                    categ: "memory",
                },
                RM6: {
                    type: "coil",
                    name: "RM6",
                    state: false,
                    categ: "memory",
                },
                RM7: {
                    type: "coil",
                    name: "RM7",
                    state: false,
                    categ: "memory",
                },
                RM8: {
                    type: "coil",
                    name: "RM8",
                    state: false,
                    categ: "memory",
                },
                RM9: {
                    type: "coil",
                    name: "RM9",
                    state: false,
                    categ: "memory",
                },
                RMA: {
                    type: "coil",
                    name: "RMA",
                    state: false,
                    categ: "memory",
                },
                RMB: {
                    type: "coil",
                    name: "RMB",
                    state: false,
                    categ: "memory",
                },
                RMC: {
                    type: "coil",
                    name: "RMC",
                    state: false,
                    categ: "memory",
                }
            }
        },
    })
    
    return (
        <LadderCellContext.Provider value={{value, setValue}}>
            {children}
        </LadderCellContext.Provider>
    )
}

export default LadderCellProvider
export const useLadderCellContext = () => useContext(LadderCellContext)