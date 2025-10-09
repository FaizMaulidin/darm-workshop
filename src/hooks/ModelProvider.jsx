import React, { useRef, createContext, useContext, useState} from 'react'
import gsap from 'gsap'
import * as THREE from 'three'
import {useStatusContext} from "./StatusProvider"

const ModelContext = createContext()

const ModelProvider = ({children}) => {
    const statusContext = useStatusContext()
    const [armPositionStatus, setArmPositionStatus] = useState("Home Position")

    const value = useRef({
        runSimulation: true,
        status: {
            busy: false,
            gpOpened: false,
        },
        partsRef: {
            model: null,
            basePivot: null,
            shoulderPivot: null,
            elbowPivot: null,
            wristPivot: null,
            gripperPivot: null,
            gpRight: null,
            gpLeft: null,
            fsExtended: false,
            fcPusher: null,
            fsPusher: null,
            springFeeder: null,
            springClone: null,
            capFeeder: null,
            capClone: null,
            pistonFeeder: null,
            pistonClone: null,
            bodyFeeder: null,
            bodyClone: null,
            createClone: null,
        },
        handlePartsMovement: {
            openGripper: () => {
                if(value.current.status.gpOpened) return
                const tl = gsap.timeline({onComplete: () => {
                    value.current.status.gpOpened = true
                    statusContext.setValue((prev) => ({status: {...prev.status, gpOpened: true}}))
                }})
                tl
                    .to(value.current.partsRef.gpRight.position, {z: "-=0.005", duration: 0.2})
                    .to(value.current.partsRef.gpLeft.position, {z: "+=0.005", duration: 0.2}, "<")
                return tl
            },
            closeGripper: () => {
                if(!value.current.status.gpOpened) return
                const tl = gsap.timeline({onComplete: () => {
                    value.current.status.gpOpened = false
                    statusContext.setValue((prev) => ({status: {...prev.status, gpOpened: false}}))
                }})
                tl
                    .to(value.current.partsRef.gpRight.position, {z: "+=0.005", duration: 0.2})
                    .to(value.current.partsRef.gpLeft.position, {z: "-=0.005", duration: 0.2}, "<")
                return tl
            },
            feedCap: (explore=false) => {
                value.current.status.busy = true
                const tl = gsap.timeline({onComplete: () => {
                    value.current.status.busy = false
                    statusContext.setValue((prev) => ({status: {...prev.status, capPresent: true}}))
                }})
                tl
                    .add(() => value.current.partsRef.capFeeder.visible = false)
                    .add(() => {
                        const zPos = value.current.partsRef.capClone.position.z
                        if(!explore && !value.current.runSimulation) return
                        if(zPos < 0.165) return
                        gsap.to(value.current.partsRef.capClone.position, {z: "-=0.065", duration: 0.7})
                    })
                    .to(value.current.partsRef.fcPusher.position, {z: "-=0.065", duration: 0.7}, "<")
                    .to(value.current.partsRef.fcPusher.position, {z: "+=0.065", duration: 0.7, delay: 0.5})
                return tl
            },
            feedSpring: (explore=false) => {
                value.current.status.busy = true
                const tl = gsap.timeline({onComplete: () => {
                    value.current.status.busy = false
                    value.current.partsRef.fsExtended = true
                    statusContext.setValue((prev) => ({status: {...prev.status, springPresent: true}}))
                }})
                tl
                    .add(() => value.current.partsRef.springFeeder.visible = false)
                    .add(() => {
                        if(!explore && !value.current.runSimulation) return
                        gsap.to(value.current.partsRef.springClone.position, {z: "-=0.045", duration: 0.7})
                    })
                    .to(value.current.partsRef.fsPusher.position, {z: "-=0.045", duration: 0.7}, "<")
                return tl
            },
            unfeedSpring: (explore=false) => {
                value.current.status.busy = true
                const tl = gsap.timeline({onComplete: () => {
                    value.current.status.busy = false
                    value.current.partsRef.fsExtended = false
                }, onStart: () => {
                    statusContext.setValue((prev) => ({status: {...prev.status, springPresent: false}}))
                }})
                tl.to(value.current.partsRef.fsPusher.position, {z: "+=0.045", duration: 0.7})
                    .add(() => {
                        const isParentModel = value.current.partsRef.springClone.parent == value.current.partsRef.model
                        if(!value.current.runSimulation && !explore) return
                        if(!isParentModel) return
                        gsap.to(value.current.partsRef.springClone.position, {z: "+=0.045", duration: 0.7})
                    }, "<")
                return tl
            },
            armPosition: {
                status: armPositionStatus,
                setStatus: (status) => setArmPositionStatus(status),
                homePosition: () => {
                    value.current.status.busy = true
                    const tl = gsap.timeline({onComplete: () => {
                        value.current.status.busy = false
                        statusContext.setValue((prev) => ({status: {...prev.status, busy: false}}))
                    }, onStart: () => {
                        statusContext.setValue((prev) => ({status: {...prev.status, busy: true}}))
                    }})
                    tl
                        .to(value.current.partsRef.basePivot.rotation, {y: 0, duration: 2})
                        .to(value.current.partsRef.shoulderPivot.rotation, {z: 0, duration: 2}, "<")
                        .to(value.current.partsRef.elbowPivot.rotation, {z: 0, duration: 2}, "<")
                        .to(value.current.partsRef.wristPivot.rotation, {z: 0, duration: 2}, "<")
                        .to(value.current.partsRef.gripperPivot.rotation, {y: 0, duration: 2}, "<")
                    return tl
                },
                getPiston: () => {
                    value.current.status.busy = true
                    const tl = gsap.timeline({onComplete: () => {
                        value.current.status.busy = false
                        statusContext.setValue((prev) => ({status: {...prev.status, busy: false}}))
                    }, onStart: () => {
                        statusContext.setValue((prev) => ({status: {...prev.status, busy: true}}))
                    }})
                    tl
                        .add(() => value.current.partsRef.pistonFeeder.visible = false)
                        .to(value.current.partsRef.basePivot.rotation, {y: 0.445, duration: 2})
                        .to(value.current.partsRef.shoulderPivot.rotation, {z: 1.15, duration: 2}, "<")
                        .to(value.current.partsRef.elbowPivot.rotation, {z: -0.555, duration: 2}, "<")
                        .to(value.current.partsRef.wristPivot.rotation, {z: -0.595, duration: 2}, "<")
                        .to(value.current.partsRef.gripperPivot.rotation, {y: 1.135, duration: 2}, "<")
                    return tl
                },
                getSpring: () => {
                    value.current.status.busy = true
                    const tl = gsap.timeline({onComplete: () => {
                        value.current.status.busy = false
                        statusContext.setValue((prev) => ({status: {...prev.status, busy: false}}))
                    }, onStart: () => {
                        statusContext.setValue((prev) => ({status: {...prev.status, busy: true}}))
                    }})
                    tl
                        .to(value.current.partsRef.basePivot.rotation, {y: 0.405, duration: 2})
                        .to(value.current.partsRef.shoulderPivot.rotation, {z: 1.98, duration: 2}, "<")
                        .to(value.current.partsRef.elbowPivot.rotation, {z: -1.85, duration: 2}, "<")
                        .to(value.current.partsRef.wristPivot.rotation, {z: -0.13, duration: 2}, "<")
                        .to(value.current.partsRef.gripperPivot.rotation, {y: 1.16, duration: 2}, "<")
                    return tl
                },
                getCap: () => {
                    value.current.status.busy = true
                    const tl = gsap.timeline({onComplete: () => {
                        value.current.status.busy = false
                        statusContext.setValue((prev) => ({status: {...prev.status, busy: false}}))
                    }, onStart: () => {
                        statusContext.setValue((prev) => ({status: {...prev.status, busy: true}}))
                    }})
                    tl
                        .to(value.current.partsRef.basePivot.rotation, {y: 0.66, duration: 2})
                        .to(value.current.partsRef.shoulderPivot.rotation, {z: 0.84, duration: 2}, "<")
                        .to(value.current.partsRef.elbowPivot.rotation, {z: -0.03, duration: 2}, "<")
                        .to(value.current.partsRef.wristPivot.rotation, {z: -0.81, duration: 2}, "<")
                        .to(value.current.partsRef.gripperPivot.rotation, {y: -2.25, duration: 2}, "<")
                    return tl
                },
                assemblePiston: () => {
                    value.current.status.busy = true
                    const tl = gsap.timeline({onComplete: () => {
                        value.current.status.busy = false
                        statusContext.setValue((prev) => ({status: {...prev.status, busy: false}}))
                    }, onStart: () => {
                        statusContext.setValue((prev) => ({status: {...prev.status, busy: true}}))
                    }})
                    tl
                        .to(value.current.partsRef.basePivot.rotation, {y: 0.08, duration: 2, delay: 0.2})
                        .to(value.current.partsRef.shoulderPivot.rotation, {z: 1.47, duration: 2}, "<")
                        .to(value.current.partsRef.elbowPivot.rotation, {z: -1.06, duration: 2}, "<")
                        .to(value.current.partsRef.wristPivot.rotation, {z: -0.41, duration: 2}, "<")
                        .to(value.current.partsRef.gripperPivot.rotation, {y: 0, duration: 2}, "<")
                    return tl
                },
                assembleCap: () => {
                    value.current.status.busy = true
                    const tl = gsap.timeline({onComplete: () => {
                        value.current.status.busy = false
                        statusContext.setValue((prev) => ({status: {...prev.status, busy: false}}))
                    }, onStart: () => {
                        statusContext.setValue((prev) => ({status: {...prev.status, busy: true}}))
                    }})
                    tl
                        .to(value.current.partsRef.basePivot.rotation, {y: 0.16, duration: 2})
                        .to(value.current.partsRef.shoulderPivot.rotation, {z: 1.05, duration: 2}, "<")
                        .to(value.current.partsRef.elbowPivot.rotation, {z: -0.395, duration: 2}, "<")
                        .to(value.current.partsRef.wristPivot.rotation, {z: -0.655, duration: 2}, "<")
                        .to(value.current.partsRef.gripperPivot.rotation, {y: 3, duration: 2}, "<")
                        .add(() => value.current.handlePartsMovement.openGripper())
                        .add(() => {
                            if(!value.current.runSimulation) return
                            value.current.partsRef.model.attach(value.current.partsRef.capClone)
                        }, "<")
                        .add(() => {
                            if(!value.current.runSimulation) return
                            gsap.to(value.current.partsRef.capClone.position, {y: "-=0.009", duration: 0.1})
                        }, "<")
                        .to({}, {duration: 0.5})
                        .to(value.current.partsRef.shoulderPivot.rotation, {z: 0.905, duration: 1})
                        .to(value.current.partsRef.wristPivot.rotation, {z: -0.505, duration: 1}, "<")
                        .to(value.current.partsRef.gripperPivot.rotation, {y: 1.4, duration: 1})
                        .to(value.current.partsRef.basePivot.rotation, {y: 0.145, duration: 2}, "<")
                        .to(value.current.partsRef.shoulderPivot.rotation, {z: 1.32, duration: 2}, "<")
                        .to(value.current.partsRef.elbowPivot.rotation, {z: -0.77, duration: 2}, "<")
                        .to(value.current.partsRef.wristPivot.rotation, {z: -0.55, duration: 2}, "<")
                        .add(() => value.current.handlePartsMovement.closeGripper())
                        .add(() => {
                            if(!value.current.runSimulation) return
                            value.current.partsRef.gripperPivot.attach(value.current.partsRef.capClone)
                        }, "<")
                        .to({}, {duration: 0.5})
                        .to(value.current.partsRef.shoulderPivot.rotation, {z: 0.905, duration: 1})
                        .to(value.current.partsRef.elbowPivot.rotation, {z: -0.395, duration: 1}, "<")
                        .to(value.current.partsRef.wristPivot.rotation, {z: -0.505, duration: 1}, "<")

                        .to(value.current.partsRef.basePivot.rotation, {y: 0.082, duration: 2})
                        .to(value.current.partsRef.shoulderPivot.rotation, {z: 1.785, duration: 2}, "<")
                        .to(value.current.partsRef.elbowPivot.rotation, {z: -1.535, duration: 2}, "<")
                        .to(value.current.partsRef.wristPivot.rotation, {z: -0.25, duration: 2}, "<")
                        .to(value.current.partsRef.gripperPivot.rotation, {y: 1.8, duration: 2}, "<")
                        .add(() => {
                            if(!value.current.runSimulation) return 
                            gsap.to(value.current.partsRef.springClone.position, {y: "-=0.002", duration: 2})
                        }, "<")
                        .to(value.current.partsRef.gripperPivot.rotation, {y: 1.2, duration: 0.5})
                    return tl
                }
            },
            fullSimulation: () => {
                const tl = gsap.timeline({onComplete: () => value.current.status.busy = false, repeat: -1, onRepeat: () => {
                    value.current.partsRef.springFeeder.visible = true
                    value.current.partsRef.capFeeder.visible = true
                    value.current.partsRef.pistonFeeder.visible = true

                    value.current.partsRef.model.remove(value.current.partsRef.pistonClone)
                    value.current.partsRef.model.remove(value.current.partsRef.springClone)
                    value.current.partsRef.model.remove(value.current.partsRef.capClone)

                    value.current.partsRef.createClone()

                    statusContext.setValue({
                        status: {
                            busy: false,
                            gpOpened: false,
                            capPresent: false,
                            springPresent: false,
                            pistonPresent: true,
                            bodyPresent: false,
                        }
                    })
                }, onUpdate: () => {
                    if(!value.current.runSimulation) tl.kill()
                }})

                tl
                    .to({}, {duration: 1})
                    .add(() => value.current.handlePartsMovement.openGripper())
                    .add(value.current.handlePartsMovement.armPosition.getPiston())
                    .add(() => value.current.partsRef.gripperPivot.attach(value.current.partsRef.pistonClone))
                    .add(() => value.current.handlePartsMovement.closeGripper())
                    .to({}, {duration: 0.5})
                    .add(() => statusContext.setValue((prev) => ({status: {...prev.status, pistonPresent: false}})))
                    .add(value.current.handlePartsMovement.armPosition.homePosition())
                    .add(value.current.handlePartsMovement.armPosition.assemblePiston())
                    .add(() => value.current.handlePartsMovement.openGripper())
                    .add(() => value.current.partsRef.model.attach(value.current.partsRef.pistonClone), "<")
                    .add(() => gsap.to(value.current.partsRef.pistonClone.position, {y: "-=0.017", duration: 0.1}), "<") 
                    .to({}, {duration: 0.5})
                    .add(value.current.handlePartsMovement.armPosition.homePosition())
                    .add(() => value.current.handlePartsMovement.feedSpring())
                    .to({}, {duration: 0.7})
                    .add(value.current.handlePartsMovement.armPosition.getSpring())
                    .add(() => value.current.handlePartsMovement.closeGripper())
                    .add(() => value.current.partsRef.gripperPivot.attach(value.current.partsRef.springClone))
                    .to({}, {duration: 0.5})
                    .add(() => statusContext.setValue((prev) => ({status: {...prev.status, springPresent: false}})))
                    .add(value.current.handlePartsMovement.armPosition.homePosition())
                    .add(() => value.current.handlePartsMovement.unfeedSpring())
                    .to({}, {duration: 0.7})
                    .add(value.current.handlePartsMovement.armPosition.assemblePiston())
                    .add(() => value.current.handlePartsMovement.openGripper())
                    .add(() => value.current.partsRef.model.attach(value.current.partsRef.springClone), "<")
                    .add(() => gsap.to(value.current.partsRef.springClone.position, {y: "-=0.011", duration: 0.1}), "<")
                    .to({}, {duration: 0.5})
                    .add(value.current.handlePartsMovement.armPosition.homePosition())
                    .add(() => value.current.handlePartsMovement.feedCap())
                    .to({}, {duration: 2})
                    .add(value.current.handlePartsMovement.armPosition.getCap())
                    .add(() => value.current.handlePartsMovement.closeGripper())
                    .add(() => value.current.partsRef.gripperPivot.attach(value.current.partsRef.capClone))
                    .to({}, {duration: 0.5})
                    .add(() => statusContext.setValue((prev) => ({status: {...prev.status, capPresent: false}})))
                    .add(value.current.handlePartsMovement.armPosition.homePosition())
                    .add(value.current.handlePartsMovement.armPosition.assembleCap())
                    .add(() => value.current.handlePartsMovement.openGripper())
                    .add(() => value.current.partsRef.model.attach(value.current.partsRef.capClone), "<")
                    .to({}, {duration: 0.5})
                    .add(value.current.handlePartsMovement.armPosition.homePosition())
                    .add(() => value.current.handlePartsMovement.closeGripper())
                    .to({}, {duration: 0.5})
                return tl
            }
        }
    })

    return (
        <ModelContext.Provider value={value}>
            {children}
        </ModelContext.Provider>
    )
}

export default ModelProvider
export const useModelContext = () => useContext(ModelContext)