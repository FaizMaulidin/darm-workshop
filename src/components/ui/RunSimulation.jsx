import React, { useEffect, useRef, useState } from 'react'
import {useModelContext} from '../../hooks/ModelProvider'
import {useLadderDataContext} from '../../hooks/LadderDataProvider'
import {useStatusContext} from '../../hooks/StatusProvider'
import {useLadderCellContext} from '../../hooks/LadderCellProvider'

const RunSimulation = ({running, setRunning}) => {
    const modelContext = useModelContext()
    const handlePartsMovement = modelContext?.current?.handlePartsMovement
    const ladderData = useLadderDataContext()
    const ladderCell = useLadderCellContext()
    const statusContext = useStatusContext()
    const [mergedArray, setMergedArray] = useState([])
    const ladderDataHorizontal = useRef([])
    const statusRef = useRef(statusContext.value.status)

    const mergeHV = (h, v) => {
        const newArray = [];
        const maxGroups = Math.max(
          Math.ceil(h.length / 6),
          Math.ceil(v.length / 6)
        );
      
        for (let i = 0; i < maxGroups; i++) {
          newArray.push(h.slice(i * 6, i * 6 + 6));
          newArray.push(v.slice(i * 6, i * 6 + 5));
        }
      
        return newArray;
    }

    const evaluateGrid = (grid) => {
        const stateGrid = grid?.map((row) => {
            return row.map((part) => {
                if (part?.type !== "coil") {
                    if (part?.name === "wired") return 1
                    
                    return part 
                        ? part?.NOpened 
                            ? part?.state ? 1 : 0
                            : part?.state ? 0 : 1
                        : 0
                }
                return part
            })
        })
        const rows = stateGrid?.length;
        const cols = stateGrid?.[0]?.length;
        const powered = Array.from({ length: rows }, () => Array(cols).fill(false));

        const queue = [];

        // Initialize: sources at the leftmost column of odd rows
        for (let r = 0; r < rows; r += 2) {
            if (stateGrid[r][0] === 1) {
            powered[r][0] = true;
            queue.push([r, 0]);
            }
        }

        while (queue.length > 0) {
            const [r, c] = queue.shift();

            if (r % 2 === 0) {
            // Odd row → horizontal wires
            if (c + 1 < cols && (stateGrid[r][c + 1] === 1 || stateGrid[r][c + 1]?.type === "coil") && !powered[r][c + 1]) {
                powered[r][c + 1] = true;
                queue.push([r, c + 1]);
            }
            if (c - 1 >= 0 && (stateGrid[r][c - 1] === 1 || stateGrid[r][c - 1]?.type === "coil") && !powered[r][c - 1]) {
                powered[r][c - 1] = true;
                queue.push([r, c - 1]);
            }

            // Vertical up/down (same col)
            if (r + 1 < rows && stateGrid[r + 1][c] === 1 && !powered[r + 1][c]) {
                powered[r + 1][c] = true;
                queue.push([r + 1, c]);
            }
            if (r - 1 >= 0 && stateGrid[r - 1][c] === 1 && !powered[r - 1][c]) {
                powered[r - 1][c] = true;
                queue.push([r - 1, c]);
            }

            } else {
            // Even row (indented connectors)
            if (stateGrid[r][c] === 1) {
                const colsToCheck = [c, c + 1].filter(x => x < cols);
                for (const cc of colsToCheck) {
                if (r - 1 >= 0 && stateGrid[r - 1][cc] !== 0 && !powered[r - 1][cc]) {
                    powered[r - 1][cc] = true;
                    queue.push([r - 1, cc]);
                }
                if (r + 1 < rows && stateGrid[r + 1][cc] !== 0 && !powered[r + 1][cc]) {
                    powered[r + 1][cc] = true;
                    queue.push([r + 1, cc]);
                }
                }
            }
            }
        }

        // Determine outputs
        for (let r = 0; r < rows; r += 2) {
            const lastVal = stateGrid[r][cols - 1];
            const newState = powered[r][cols - 1]
            if(lastVal?.type){
                const oldHorizontal = structuredClone([...ladderDataHorizontal.current])
                ladderDataHorizontal.current.map((item) => {
                    if(item?.name === lastVal?.name) {
                        if(ladderCell.value[lastVal.type][lastVal.categ]["R"+lastVal.name]?.state){
                            item.state = false
                        } else{
                            item.state = newState
                        }
                    }
                    return item
                })
                ladderCell.setValue(prev => ({
                    ...prev,
                    contact:{
                        ...prev.contact,
                        [lastVal?.categ]: {
                            ...prev.contact[lastVal?.categ],
                            [lastVal?.name]: {
                                ...prev.contact[lastVal?.categ][lastVal?.name],
                                state: newState
                            }
                        }
                    },
                    coil: {
                        ...prev.coil,
                        [lastVal?.categ]: {
                            ...prev.coil[lastVal?.categ],
                            [lastVal?.name]: {
                                ...prev.coil[lastVal?.categ][lastVal?.name],
                                state: newState
                            }
                        }
                    }
                }))
                const cond = JSON.stringify(oldHorizontal) === JSON.stringify(ladderDataHorizontal.current)
                const oldArm = {
                    Q1: oldHorizontal.find(item => item?.name === "Q1" && item?.type === "coil")?.state,
                    Q2: oldHorizontal.find(item => item?.name === "Q2" && item?.type === "coil")?.state,
                    Q3: oldHorizontal.find(item => item?.name === "Q3" && item?.type === "coil")?.state,
                }
                const newArm = {
                    Q1: ladderDataHorizontal.current.find(item => item?.name === "Q1" && item?.type === "coil")?.state,
                    Q2: ladderDataHorizontal.current.find(item => item?.name === "Q2" && item?.type === "coil")?.state,
                    Q3: ladderDataHorizontal.current.find(item => item?.name === "Q3" && item?.type === "coil")?.state,
                }
                if(JSON.stringify(oldArm) !== JSON.stringify(newArm)){
                    simulation()
                }
                if(!cond){
                    setMergedArray(mergeHV(ladderDataHorizontal.current, ladderData.value.vertical))
                }
            }
        }
    }

    const moveParts = () => {
        const outputs = ladderCell.value.coil.outputs
        const status = statusContext.value.status
        if(status.busy) return
        if(outputs.Q4.state && !outputs.RQ4.state && !status.gpOpened && running){
            handlePartsMovement?.openGripper(false, "editor")
        } else if((!outputs.Q4.state || outputs.RQ4.state) && status.gpOpened && running){
            handlePartsMovement?.closeGripper("editor")
        }

        const Q1 = outputs.Q1.state && !outputs.RQ1.state ? 1 : 0
        const Q2 = outputs.Q2.state && !outputs.RQ2.state ? 2 : 0
        const Q3 = outputs.Q3.state && !outputs.RQ3.state ? 4 : 0
        const bitmask = Q1 + Q2 + Q3

        switch (bitmask) {
            case 1:
                handlePartsMovement?.armPosition.getBody()
                break;
            case 2:
                handlePartsMovement?.armPosition.assembleBody("editor")
                break;
            case 3:
                handlePartsMovement?.armPosition.getPiston()
                break;
            case 4:
                handlePartsMovement?.armPosition.assemblePiston("editor")
                break;
            case 5:
                handlePartsMovement?.armPosition.getSpring()
                break;
            case 6:
                handlePartsMovement?.armPosition.getCap()
                break;
            case 7:
                handlePartsMovement?.armPosition.assembleCap("editor")
                break;
            default:
                handlePartsMovement?.armPosition.homePosition()
                break;
        }

        if(outputs.Q5.state && !modelContext.current.partsRef.fsExtended) handlePartsMovement.feedSpring(true)
        if(outputs.Q6.state && modelContext.current.partsRef.fsExtended) handlePartsMovement.unfeedSpring(true)
        if(outputs.Q7.state) handlePartsMovement.feedCap(true)

    }

    const simulation = () => {
        const followStatus = (part, state) => {
            ladderCell.setValue(prev => ({
                ...prev,
                contact: {
                    ...prev.contact,
                    inputs: {
                        ...prev.contact.inputs,
                        [part]: {
                            ...prev.contact.inputs[part],
                            state: state
                        }
                    }
                }
            }))
            ladderDataHorizontal.current.map((item) => {
                if(item?.name === part) {
                    item.state = state
                }
                return item
            })
        }
        
        followStatus('I1', statusRef.current.busy)
        followStatus('I2', statusRef.current.gpOpened)
        followStatus('I3', statusRef.current.bodyPresent)
        followStatus('I4', statusRef.current.pistonPresent)
        followStatus('I5', statusRef.current.springPresent)
        followStatus('I6', statusRef.current.capPresent)
            
    }

    const resetLadder = () => {
        ladderData.setValue(prev => ({
            horizontal: prev.horizontal.map(item => {
                if(!item) return
                if(item?.name === "wired") return item
                return {...item, state: false}
            }),
            vertical: prev.vertical
        }))

        ladderCell.setValue(prev => ({
            contact: {
                inputs: Object.fromEntries(
                    Object.entries(prev.contact.inputs).map(([key, val]) => [
                        key,
                        { ...val, state: false }
                    ])
                ),
                outputs: Object.fromEntries(
                    Object.entries(prev.contact.outputs).map(([key, val]) => [
                        key,
                        { ...val, state: false }
                    ])
                ),
                memory: Object.fromEntries(
                    Object.entries(prev.contact.memory).map(([key, val]) => [
                        key,
                        { ...val, state: false }
                    ])
                )
            },
            coil: {
                outputs: Object.fromEntries(
                    Object.entries(prev.coil.outputs).map(([key, val]) => [
                        key,
                        { ...val, state: false }
                    ])
                ),
                memory: Object.fromEntries(
                    Object.entries(prev.coil.memory).map(([key, val]) => [
                        key,
                        { ...val, state: false }
                    ])
                )
            }
        }))

    }

    useEffect(() => {
        ladderDataHorizontal.current = structuredClone([...ladderData.value.horizontal])
    }, [ladderData.value.horizontal])
    useEffect(() => {
        statusRef.current = statusContext.value.status
    }, [statusContext.value.status])

    useEffect(() => {
        if (!running) return
        let first = true
        const interval = setInterval(() => {
            const oldHorizontal = structuredClone([...ladderDataHorizontal.current])
            simulation()
            if(first) evaluateGrid(mergeHV(ladderDataHorizontal.current, ladderData.value.vertical))
            const newHorizontal = [...ladderDataHorizontal.current]
            const cond = JSON.stringify(oldHorizontal) === JSON.stringify(newHorizontal)
            if (!cond) {
                setMergedArray(mergeHV(ladderDataHorizontal.current, ladderData.value.vertical))
                ladderData.setValue(prev => ({
                    ...prev,
                    horizontal: newHorizontal
                }))
            }
            first = false
        }, 500)

        return () => {
            resetLadder()
            clearInterval(interval)
        }
    }, [running])

    useEffect(() => {
        if(!running) return
        evaluateGrid(mergedArray)
    }, [mergedArray])
    
    useEffect(() => {
        if(!running) return
        moveParts()
    }, [ladderCell.value.coil.outputs])

    return (
        <button className='bg-green-primary px-2 py-1 rounded-xs text-black-primary hover:text-red-primary transition-all duration-300 cursor-pointer' onClick={() => {
            if(running){
                handlePartsMovement.armPosition.homePosition(false, true)
                handlePartsMovement.closeGripper("editor")
                if(modelContext.current.partsRef.fsExtended){
                    handlePartsMovement.unfeedSpring()
                }
                modelContext.current.ladderRun = false
            } else {
                modelContext.current.ladderRun = true
            }
            handlePartsMovement.resetStation()
            setRunning(!running)
        }}>
            {running ? 'Back to Edit' : 'Run Simulation'}
        </button>
    )
}

export default RunSimulation