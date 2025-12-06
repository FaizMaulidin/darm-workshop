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
                    M1:  { type: "contact", name: "M1",  state: false, categ: "memory" },
                    M2:  { type: "contact", name: "M2",  state: false, categ: "memory" },
                    M3:  { type: "contact", name: "M3",  state: false, categ: "memory" },
                    M4:  { type: "contact", name: "M4",  state: false, categ: "memory" },
                    M5:  { type: "contact", name: "M5",  state: false, categ: "memory" },
                    M6:  { type: "contact", name: "M6",  state: false, categ: "memory" },
                    M7:  { type: "contact", name: "M7",  state: false, categ: "memory" },
                    M8:  { type: "contact", name: "M8",  state: false, categ: "memory" },
                    M9:  { type: "contact", name: "M9",  state: false, categ: "memory" },
                    M10: { type: "contact", name: "M10", state: false, categ: "memory" },
                    M11: { type: "contact", name: "M11", state: false, categ: "memory" },
                    M12: { type: "contact", name: "M12", state: false, categ: "memory" },
                    M13: { type: "contact", name: "M13", state: false, categ: "memory" },
                    M14: { type: "contact", name: "M14", state: false, categ: "memory" },
                    M15: { type: "contact", name: "M15", state: false, categ: "memory" },
                    M16: { type: "contact", name: "M16", state: false, categ: "memory" },
                    M17: { type: "contact", name: "M17", state: false, categ: "memory" },
                    M18: { type: "contact", name: "M18", state: false, categ: "memory" },
                    M19: { type: "contact", name: "M19", state: false, categ: "memory" },
                    M20: { type: "contact", name: "M20", state: false, categ: "memory" },
                    M21: { type: "contact", name: "M21", state: false, categ: "memory" },
                    M22: { type: "contact", name: "M22", state: false, categ: "memory" },
                    M23: { type: "contact", name: "M23", state: false, categ: "memory" },
                    M24: { type: "contact", name: "M24", state: false, categ: "memory" },
                    M25: { type: "contact", name: "M25", state: false, categ: "memory" },
                    M26: { type: "contact", name: "M26", state: false, categ: "memory" },
                    M27: { type: "contact", name: "M27", state: false, categ: "memory" },
                    M28: { type: "contact", name: "M28", state: false, categ: "memory" },

                    M29:  { type: "contact", name: "M29",  state: false, categ: "memory" },
                    M30:  { type: "contact", name: "M30",  state: false, categ: "memory" },
                    M31:  { type: "contact", name: "M31",  state: false, categ: "memory" },
                    M32:  { type: "contact", name: "M32",  state: false, categ: "memory" },
                    M33:  { type: "contact", name: "M33",  state: false, categ: "memory" },
                    M34:  { type: "contact", name: "M34",  state: false, categ: "memory" },
                    M35:  { type: "contact", name: "M35",  state: false, categ: "memory" },
                    M36:  { type: "contact", name: "M36",  state: false, categ: "memory" },
                    M37:  { type: "contact", name: "M37",  state: false, categ: "memory" },
                    M38: { type: "contact", name: "M38", state: false, categ: "memory" },
                    M39: { type: "contact", name: "M39", state: false, categ: "memory" },
                    M40: { type: "contact", name: "M40", state: false, categ: "memory" },
                    M41: { type: "contact", name: "M41", state: false, categ: "memory" },
                    M42: { type: "contact", name: "M42", state: false, categ: "memory" },
                    M43: { type: "contact", name: "M43", state: false, categ: "memory" },
                    M44: { type: "contact", name: "M44", state: false, categ: "memory" },
                    M45: { type: "contact", name: "M45", state: false, categ: "memory" },
                    M46: { type: "contact", name: "M46", state: false, categ: "memory" },
                    M47: { type: "contact", name: "M47", state: false, categ: "memory" },
                    M48: { type: "contact", name: "M48", state: false, categ: "memory" },
                    M49: { type: "contact", name: "M49", state: false, categ: "memory" },
                    M50: { type: "contact", name: "M50", state: false, categ: "memory" },
                    M51: { type: "contact", name: "M51", state: false, categ: "memory" },
                    M52: { type: "contact", name: "M52", state: false, categ: "memory" },
                    M53: { type: "contact", name: "M53", state: false, categ: "memory" },
                    M54: { type: "contact", name: "M54", state: false, categ: "memory" },
                    M55: { type: "contact", name: "M55", state: false, categ: "memory" },
                    M56: { type: "contact", name: "M56", state: false, categ: "memory" },
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
                    M1:  { type: "coil", name: "M1",  state: false, categ: "memory" },
                    M2:  { type: "coil", name: "M2",  state: false, categ: "memory" },
                    M3:  { type: "coil", name: "M3",  state: false, categ: "memory" },
                    M4:  { type: "coil", name: "M4",  state: false, categ: "memory" },
                    M5:  { type: "coil", name: "M5",  state: false, categ: "memory" },
                    M6:  { type: "coil", name: "M6",  state: false, categ: "memory" },
                    M7:  { type: "coil", name: "M7",  state: false, categ: "memory" },
                    M8:  { type: "coil", name: "M8",  state: false, categ: "memory" },
                    M9:  { type: "coil", name: "M9",  state: false, categ: "memory" },
                    M10: { type: "coil", name: "M10", state: false, categ: "memory" },
                    M11: { type: "coil", name: "M11", state: false, categ: "memory" },
                    M12: { type: "coil", name: "M12", state: false, categ: "memory" },
                    M13: { type: "coil", name: "M13", state: false, categ: "memory" },
                    M14: { type: "coil", name: "M14", state: false, categ: "memory" },
                    M15: { type: "coil", name: "M15", state: false, categ: "memory" },
                    M16: { type: "coil", name: "M16", state: false, categ: "memory" },
                    M17: { type: "coil", name: "M17", state: false, categ: "memory" },
                    M18: { type: "coil", name: "M18", state: false, categ: "memory" },
                    M19: { type: "coil", name: "M19", state: false, categ: "memory" },
                    M20: { type: "coil", name: "M20", state: false, categ: "memory" },
                    M21: { type: "coil", name: "M21", state: false, categ: "memory" },
                    M22: { type: "coil", name: "M22", state: false, categ: "memory" },
                    M23: { type: "coil", name: "M23", state: false, categ: "memory" },
                    M24: { type: "coil", name: "M24", state: false, categ: "memory" },
                    M25: { type: "coil", name: "M25", state: false, categ: "memory" },
                    M26: { type: "coil", name: "M26", state: false, categ: "memory" },
                    M27: { type: "coil", name: "M27", state: false, categ: "memory" },
                    M28: { type: "coil", name: "M28", state: false, categ: "memory" },

                    M29:  { type: "coil", name: "M29",  state: false, categ: "memory" },
                    M30:  { type: "coil", name: "M30",  state: false, categ: "memory" },
                    M31:  { type: "coil", name: "M31",  state: false, categ: "memory" },
                    M32:  { type: "coil", name: "M32",  state: false, categ: "memory" },
                    M33:  { type: "coil", name: "M33",  state: false, categ: "memory" },
                    M34:  { type: "coil", name: "M34",  state: false, categ: "memory" },
                    M35:  { type: "coil", name: "M35",  state: false, categ: "memory" },
                    M36:  { type: "coil", name: "M36",  state: false, categ: "memory" },
                    M37:  { type: "coil", name: "M37",  state: false, categ: "memory" },
                    M38: { type: "coil", name: "M38", state: false, categ: "memory" },
                    M39: { type: "coil", name: "M39", state: false, categ: "memory" },
                    M40: { type: "coil", name: "M40", state: false, categ: "memory" },
                    M41: { type: "coil", name: "M41", state: false, categ: "memory" },
                    M42: { type: "coil", name: "M42", state: false, categ: "memory" },
                    M43: { type: "coil", name: "M43", state: false, categ: "memory" },
                    M44: { type: "coil", name: "M44", state: false, categ: "memory" },
                    M45: { type: "coil", name: "M45", state: false, categ: "memory" },
                    M46: { type: "coil", name: "M46", state: false, categ: "memory" },
                    M47: { type: "coil", name: "M47", state: false, categ: "memory" },
                    M48: { type: "coil", name: "M48", state: false, categ: "memory" },
                    M49: { type: "coil", name: "M49", state: false, categ: "memory" },
                    M50: { type: "coil", name: "M50", state: false, categ: "memory" },
                    M51: { type: "coil", name: "M51", state: false, categ: "memory" },
                    M52: { type: "coil", name: "M52", state: false, categ: "memory" },
                    M53: { type: "coil", name: "M53", state: false, categ: "memory" },
                    M54: { type: "coil", name: "M54", state: false, categ: "memory" },
                    M55: { type: "coil", name: "M55", state: false, categ: "memory" },
                    M56: { type: "coil", name: "M56", state: false, categ: "memory" },

                    RM1:  { type: "coil", name: "RM1",  state: false, categ: "memory" },
                    RM2:  { type: "coil", name: "RM2",  state: false, categ: "memory" },
                    RM3:  { type: "coil", name: "RM3",  state: false, categ: "memory" },
                    RM4:  { type: "coil", name: "RM4",  state: false, categ: "memory" },
                    RM5:  { type: "coil", name: "RM5",  state: false, categ: "memory" },
                    RM6:  { type: "coil", name: "RM6",  state: false, categ: "memory" },
                    RM7:  { type: "coil", name: "RM7",  state: false, categ: "memory" },
                    RM8:  { type: "coil", name: "RM8",  state: false, categ: "memory" },
                    RM9:  { type: "coil", name: "RM9",  state: false, categ: "memory" },
                    RM10: { type: "coil", name: "RM10", state: false, categ: "memory" },
                    RM11: { type: "coil", name: "RM11", state: false, categ: "memory" },
                    RM12: { type: "coil", name: "RM12", state: false, categ: "memory" },
                    RM13: { type: "coil", name: "RM13", state: false, categ: "memory" },
                    RM14: { type: "coil", name: "RM14", state: false, categ: "memory" },
                    RM15: { type: "coil", name: "RM15", state: false, categ: "memory" },
                    RM16: { type: "coil", name: "RM16", state: false, categ: "memory" },
                    RM17: { type: "coil", name: "RM17", state: false, categ: "memory" },
                    RM18: { type: "coil", name: "RM18", state: false, categ: "memory" },
                    RM19: { type: "coil", name: "RM19", state: false, categ: "memory" },
                    RM20: { type: "coil", name: "RM20", state: false, categ: "memory" },
                    RM21: { type: "coil", name: "RM21", state: false, categ: "memory" },
                    RM22: { type: "coil", name: "RM22", state: false, categ: "memory" },
                    RM23: { type: "coil", name: "RM23", state: false, categ: "memory" },
                    RM24: { type: "coil", name: "RM24", state: false, categ: "memory" },
                    RM25: { type: "coil", name: "RM25", state: false, categ: "memory" },
                    RM26: { type: "coil", name: "RM26", state: false, categ: "memory" },
                    RM27: { type: "coil", name: "RM27", state: false, categ: "memory" },
                    RM28: { type: "coil", name: "RM28", state: false, categ: "memory" },

                    RM29:  { type: "coil", name: "RM29",  state: false, categ: "memory" },
                    RM30:  { type: "coil", name: "RM30",  state: false, categ: "memory" },
                    RM31:  { type: "coil", name: "RM31",  state: false, categ: "memory" },
                    RM32:  { type: "coil", name: "RM32",  state: false, categ: "memory" },
                    RM33:  { type: "coil", name: "RM33",  state: false, categ: "memory" },
                    RM34:  { type: "coil", name: "RM34",  state: false, categ: "memory" },
                    RM35:  { type: "coil", name: "RM35",  state: false, categ: "memory" },
                    RM36:  { type: "coil", name: "RM36",  state: false, categ: "memory" },
                    RM37:  { type: "coil", name: "RM37",  state: false, categ: "memory" },
                    RM38:  { type: "coil", name: "RM38",  state: false, categ: "memory" },
                    RM39:  { type: "coil", name: "RM39",  state: false, categ: "memory" },
                    RM40: { type: "coil", name: "RM40", state: false, categ: "memory" },
                    RM41: { type: "coil", name: "RM41", state: false, categ: "memory" },
                    RM42: { type: "coil", name: "RM42", state: false, categ: "memory" },
                    RM43: { type: "coil", name: "RM43", state: false, categ: "memory" },
                    RM44: { type: "coil", name: "RM44", state: false, categ: "memory" },
                    RM45: { type: "coil", name: "RM45", state: false, categ: "memory" },
                    RM46: { type: "coil", name: "RM46", state: false, categ: "memory" },
                    RM47: { type: "coil", name: "RM47", state: false, categ: "memory" },
                    RM48: { type: "coil", name: "RM48", state: false, categ: "memory" },
                    RM49: { type: "coil", name: "RM49", state: false, categ: "memory" },
                    RM50: { type: "coil", name: "RM50", state: false, categ: "memory" },
                    RM51: { type: "coil", name: "RM51", state: false, categ: "memory" },
                    RM52: { type: "coil", name: "RM52", state: false, categ: "memory" },
                    RM53: { type: "coil", name: "RM53", state: false, categ: "memory" },
                    RM54: { type: "coil", name: "RM54", state: false, categ: "memory" },
                    RM55: { type: "coil", name: "RM55", state: false, categ: "memory" },
                    RM56: { type: "coil", name: "RM56", state: false, categ: "memory" },
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