import React, { useRef, createContext, useContext} from 'react'
import gsap from 'gsap'
import * as THREE from 'three'
import {useStatusContext} from "./StatusProvider"

const ModelContext = createContext()

const ModelProvider = ({children}) => {
    const statusContext = useStatusContext()

    const value = useRef({
        runSimulation: true,
        ladderRun: false,
        mode: "",
        status: {
            busy: false,
            gpOpened: false,
            armStatus: ""
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
            openGripper: (lastStep=false, mode="simulation") => {
                if(value.current.status.gpOpened) return
                const tl = gsap.timeline({onComplete: () => {
                    statusContext.setValue((prev) => ({status: {...prev.status, gpOpened: true}}))
                    if(!lastStep){
                        value.current.partsRef.model.attach(value.current.partsRef.bodyClone)
                        value.current.partsRef.model.attach(value.current.partsRef.pistonClone)
                        value.current.partsRef.model.attach(value.current.partsRef.springClone)
                        value.current.partsRef.model.attach(value.current.partsRef.capClone)
                    }
                }, 
                onStart: () => {
                    value.current.status.gpOpened = true
                }, onUpdate: () => {
                    if(mode !== value.current.mode) tl.kill()
                }})
                tl
                    .to(value.current.partsRef.gpRight.position, {z: "-=0.005", duration: 0.2})
                    .to(value.current.partsRef.gpLeft.position, {z: "+=0.005", duration: 0.2}, "<")
                return tl
            },
            closeGripper: (mode="simulation") => {
                if(!value.current.status.gpOpened) return
                const tl = gsap.timeline({onComplete: () => {
                    value.current.status.gpOpened = false
                    statusContext.setValue((prev) => ({status: {...prev.status, gpOpened: false}}))

                    const position = {
                        posGripper: new THREE.Vector3(),
                        posBody: new THREE.Vector3(),
                        posPiston: new THREE.Vector3(),
                        posSpring: new THREE.Vector3(),
                        posCap: new THREE.Vector3()
                    }

                    value.current.partsRef.gripperPivot.getWorldPosition(position.posGripper)
                    value.current.partsRef.bodyClone.getWorldPosition(position.posBody)
                    value.current.partsRef.pistonClone.getWorldPosition(position.posPiston)
                    value.current.partsRef.springClone.getWorldPosition(position.posSpring)
                    value.current.partsRef.capClone.getWorldPosition(position.posCap)
                    
                    if(mode === "editor"){
                        if(position.posGripper.distanceTo(position.posBody) < 0.14){
                            value.current.partsRef.gripperPivot.attach(value.current.partsRef.bodyClone)
                        }
                        if(position.posGripper.distanceTo(position.posPiston) < 0.13){
                            value.current.partsRef.gripperPivot.attach(value.current.partsRef.pistonClone)
                        }
                        if(position.posGripper.distanceTo(position.posSpring) < 0.135){
                            value.current.partsRef.gripperPivot.attach(value.current.partsRef.springClone)
                        }
                        if(position.posGripper.distanceTo(position.posCap) < 0.135){
                            value.current.partsRef.gripperPivot.attach(value.current.partsRef.capClone)
                        }
                    }
                }, onStart: () => {
                    value.current.status.gpOpened = false
                }, onUpdate: () => {
                    if(mode !== value.current.mode) tl.kill()
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
                const zPos = value.current.partsRef.capClone.position.z
                if(zPos < 0.165) return
                tl
                    .add(() => value.current.partsRef.capFeeder.visible = false)
                    .add(() => {
                        if(!explore && !value.current.runSimulation) return
                        gsap.to(value.current.partsRef.capClone.position, {z: "-=0.065", duration: 0.7})
                    })
                    .to(value.current.partsRef.fcPusher.position, {z: "-=0.065", duration: 0.7}, "<")
                    .to(value.current.partsRef.fcPusher.position, {z: "+=0.065", duration: 0.7, delay: 0.5})
                return tl
            },
            feedSpring: (explore=false) => {
                value.current.status.busy = true
                value.current.partsRef.fsExtended = true
                const tl = gsap.timeline({onComplete: () => {
                    value.current.status.busy = false
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
                value.current.partsRef.fsExtended = false
                const tl = gsap.timeline({onComplete: () => {
                    value.current.status.busy = false
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
                homePosition: (insideTl=false, reset=false) => {
                    if(value.current.status.armStatus === "homePosition" && !reset) return
                    value.current.status.busy = true
                    const tl = gsap.timeline({onComplete: () => {
                        insideTl ? null : value.current.status.busy = false
                        statusContext.setValue((prev) => ({status: {...prev.status, busy: insideTl ? true : false}}))
                        value.current.status.armStatus = "homePosition"
                    }, onStart: () => {
                        statusContext.setValue((prev) => ({status: {...prev.status, busy: true}}))
                    }})
                    tl
                        .to(value.current.partsRef.basePivot.rotation, {y: 0, duration: 2})
                        .to(value.current.partsRef.shoulderPivot.rotation, {z: 0, duration: 2}, "<")
                        .to(value.current.partsRef.elbowPivot.rotation, {z: 0, duration: 2}, "<")
                        .to(value.current.partsRef.wristPivot.rotation, {z: 0, duration: 2}, "<")
                        .to(value.current.partsRef.gripperPivot.rotation, {y: 0, duration: 1.5, delay:0.5}, "<")
                    return tl
                },
                getBody: () => {
                    if(value.current.status.armStatus === "getBody") return
                    value.current.status.busy = true
                    const tl = gsap.timeline({onComplete: () => {
                        value.current.status.busy = false
                        statusContext.setValue((prev) => ({status: {...prev.status, busy: false}}))
                        value.current.status.armStatus = "getBody"
                    }, onStart: () => {
                        statusContext.setValue((prev) => ({status: {...prev.status, busy: true}}))
                    }})
                    tl
                        .add(() => value.current.partsRef.bodyFeeder.visible = false)
                        .to(value.current.partsRef.basePivot.rotation, {y: 0.1, duration: 2})
                        .to(value.current.partsRef.shoulderPivot.rotation, {z: 0.98, duration: 2}, "<")
                        .to(value.current.partsRef.elbowPivot.rotation, {z: -0.26, duration: 2}, "<")
                        .to(value.current.partsRef.wristPivot.rotation, {z: -0.72, duration: 2}, "<")
                        .to(value.current.partsRef.gripperPivot.rotation, {y: 0.78, duration: 2}, "<")
                    return tl
                },
                getPiston: () => {
                    if(value.current.status.armStatus === "getPiston") return
                    value.current.status.busy = true
                    const tl = gsap.timeline({onComplete: () => {
                        value.current.status.busy = false
                        statusContext.setValue((prev) => ({status: {...prev.status, busy: false}}))
                        value.current.status.armStatus = "getPiston"
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
                    if(value.current.status.armStatus === "getSpring") return
                    value.current.status.busy = true
                    const tl = gsap.timeline({onComplete: () => {
                        value.current.status.busy = false
                        statusContext.setValue((prev) => ({status: {...prev.status, busy: false}}))
                        value.current.status.armStatus = "getSpring"
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
                    if(value.current.status.armStatus === "getCap") return
                    value.current.status.busy = true
                    const tl = gsap.timeline({onComplete: () => {
                        value.current.status.busy = false
                        statusContext.setValue((prev) => ({status: {...prev.status, busy: false}}))
                        value.current.status.armStatus = "getCap"
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
                assembleBody: (mode="simulation") => {
                    if(value.current.status.armStatus === "assembleBody") return
                    value.current.status.busy = true
                    const tl = gsap.timeline({onComplete: () => {
                        value.current.status.busy = false
                        statusContext.setValue((prev) => ({status: {...prev.status, busy: false}}))
                    }, onStart: () => {
                        value.current.status.armStatus = "assembleBody"
                        statusContext.setValue((prev) => ({status: {...prev.status, busy: true}}))
                    }, onUpdate: () => {
                        if(mode !== value.current.mode) tl.kill()
                        if(mode === "editor" && !value.current.ladderRun) tl.kill()
                    }})
                    tl
                        .to(value.current.partsRef.basePivot.rotation, {y: 0.105, duration: 2})
                        .to(value.current.partsRef.shoulderPivot.rotation, {z: 1.18, duration: 2}, "<")
                        .to(value.current.partsRef.elbowPivot.rotation, {z: -0.59, duration: 2}, "<")
                        .to(value.current.partsRef.wristPivot.rotation, {z: -0.59, duration: 2}, "<")
                        .to(value.current.partsRef.gripperPivot.rotation, {y: 3.02, duration: 2}, "<")
                        .add(() => {value.current.handlePartsMovement.openGripper(false, mode)})
                        .add(() => {
                            if(!value.current.runSimulation) return
                            value.current.partsRef.model.attach(value.current.partsRef.bodyClone)
                        }, "<")
                        .add(() => {
                            if(mode === "explore") return
                            if(mode === "editor"){
                                gsap.to(value.current.partsRef.bodyClone.position, {y: "-=0.004", duration: 0.1})
                            } else {
                                gsap.to(value.current.partsRef.bodyClone.position, {y: "-=0.006", duration: 0.1})
                            }
                        }, "<")
                        .to({}, {duration: 0.5})
                        .to(value.current.partsRef.shoulderPivot.rotation, {z: 1, duration: 0.8})
                        .to(value.current.partsRef.elbowPivot.rotation, {z: -0.7, duration: 0.8}, "<")
                        .to(value.current.partsRef.wristPivot.rotation, {z: -0.3, duration: 0.8}, "<")
                        .to(value.current.partsRef.basePivot.rotation, {y: 0.09, duration: 2})
                        .to(value.current.partsRef.shoulderPivot.rotation, {z: 1.43, duration: 2}, "<")
                        .to(value.current.partsRef.elbowPivot.rotation, {z: -0.96, duration: 2}, "<")
                        .to(value.current.partsRef.wristPivot.rotation, {z: -0.47, duration: 2}, "<")
                        .to(value.current.partsRef.gripperPivot.rotation, {y: 0, duration: 2}, "<")
                        .add(() => value.current.handlePartsMovement.closeGripper(mode))
                        .add(() => {
                            if(mode === "explore") return
                            value.current.partsRef.gripperPivot.attach(value.current.partsRef.bodyClone)
                        }, "<")
                        .to({}, {duration: 0.5})
                        .to(value.current.partsRef.shoulderPivot.rotation, {z: 1.45, duration: 0.8})
                        .to(value.current.partsRef.elbowPivot.rotation, {z: -1.2, duration: 0.8}, "<")
                        .to(value.current.partsRef.wristPivot.rotation, {z: -0.25, duration: 0.8}, "<")
                        .to(value.current.partsRef.basePivot.rotation, {y: 0.082, duration: 0.8, delay: 0.2})
                        .to(value.current.partsRef.shoulderPivot.rotation, {z: 1.745, duration: 0.8}, "<")
                        .to(value.current.partsRef.elbowPivot.rotation, {z: -1.455, duration: 0.8}, "<")
                        .to(value.current.partsRef.wristPivot.rotation, {z: -0.29, duration: 0.8}, "<")
                    return tl
                },
                assemblePiston: (mode="simulation") => {
                    if(value.current.status.armStatus === "assemblePiston") return
                    value.current.status.busy = true
                    const tl = gsap.timeline({onComplete: () => {
                        value.current.status.busy = false
                        statusContext.setValue((prev) => ({status: {...prev.status, busy: false}}))
                    }, onStart: () => {
                        value.current.status.armStatus = "assemblePiston"
                        statusContext.setValue((prev) => ({status: {...prev.status, busy: true}}))
                    }, onUpdate: () => {
                        if(mode !== value.current.mode) tl.kill()
                        if(mode === "editor" && !value.current.ladderRun) tl.kill()
                    }})
                    tl
                        .to(value.current.partsRef.basePivot.rotation, {y: 0.08, duration: 2, delay: 0.2})
                        .to(value.current.partsRef.shoulderPivot.rotation, {z: 1.47, duration: 2}, "<")
                        .to(value.current.partsRef.elbowPivot.rotation, {z: -1.06, duration: 2}, "<")
                        .to(value.current.partsRef.wristPivot.rotation, {z: -0.41, duration: 2}, "<")
                        .to(value.current.partsRef.gripperPivot.rotation, {y: 0, duration: 2}, "<")
                    return tl
                },
                assembleCap: (mode="simulation") => {
                    if(value.current.status.armStatus === "assembleCap") return
                    value.current.status.busy = true
                    const tl = gsap.timeline({onComplete: () => {
                        value.current.status.busy = false
                        statusContext.setValue((prev) => ({status: {...prev.status, busy: false}}))
                    }, onStart: () => {
                        value.current.status.armStatus = "assembleCap"
                        statusContext.setValue((prev) => ({status: {...prev.status, busy: true}}))
                    }, onUpdate: () => {
                        if(mode !== value.current.mode) tl.kill()
                        if(mode === "editor" && !value.current.ladderRun) tl.kill()
                    }})
                    tl
                        .to(value.current.partsRef.basePivot.rotation, {y: 0.16, duration: 2})
                        .to(value.current.partsRef.shoulderPivot.rotation, {z: 1.05, duration: 2}, "<")
                        .to(value.current.partsRef.elbowPivot.rotation, {z: -0.395, duration: 2}, "<")
                        .to(value.current.partsRef.wristPivot.rotation, {z: -0.655, duration: 2}, "<")
                        .to(value.current.partsRef.gripperPivot.rotation, {y: 3, duration: 2}, "<")
                        .add(() => value.current.handlePartsMovement.openGripper(false, mode))
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
                        .to(value.current.partsRef.basePivot.rotation, {y: 0.143, duration: 2}, "<")
                        .to(value.current.partsRef.shoulderPivot.rotation, {z: 1.32, duration: 2}, "<")
                        .to(value.current.partsRef.elbowPivot.rotation, {z: -0.77, duration: 2}, "<")
                        .to(value.current.partsRef.wristPivot.rotation, {z: -0.55, duration: 2}, "<")
                        .add(() => value.current.handlePartsMovement.closeGripper(mode))
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
                        .add(() => value.current.handlePartsMovement.openGripper(false, mode))
                        .add(() => value.current.partsRef.model.attach(value.current.partsRef.capClone), "<")
                        .to({}, {duration: 0.5})
                        .to(value.current.partsRef.shoulderPivot.rotation, {z: 1.5, duration: 1}, "<")
                        .to(value.current.partsRef.elbowPivot.rotation, {z: -1.25, duration: 1}, "<")
                        .to(value.current.partsRef.gripperPivot.rotation, {y: 3.145, duration: 0.7, delay: 0.3}, "<")
                        .add(value.current.handlePartsMovement.armPosition.sendCylinder(mode))
                    return tl
                },
                sendCylinder: (mode="simulation") => {
                    value.current.status.busy = true
                    const tl = gsap.timeline({onComplete: () => {
                        value.current.status.busy = false
                        statusContext.setValue((prev) => ({status: {...prev.status, busy: false}}))
                    }, onStart: () => {
                        statusContext.setValue((prev) => ({status: {...prev.status, busy: true}}))
                    }, onUpdate: () => {
                        if(mode !== value.current.mode) tl.kill()
                        if(mode === "editor" && !value.current.ladderRun) tl.kill()
                    }})
                    tl
                        .add(() => value.current.handlePartsMovement.openGripper())
                        .to(value.current.partsRef.basePivot.rotation, {y: 0.08, duration: 2, delay: 0.2})
                        .to(value.current.partsRef.shoulderPivot.rotation, {z: 1.42, duration: 2}, "<")
                        .to(value.current.partsRef.elbowPivot.rotation, {z: -0.94, duration: 2}, "<")
                        .to(value.current.partsRef.wristPivot.rotation, {z: -0.48, duration: 2}, "<")
                        .to(value.current.partsRef.gripperPivot.rotation, {y: 3.145, duration: 2}, "<")
                        .add(() => value.current.handlePartsMovement.closeGripper(mode))
                        .add(() => {
                            if(!value.current.runSimulation) return
                            value.current.partsRef.gripperPivot.attach(value.current.partsRef.pistonClone)
                            value.current.partsRef.gripperPivot.attach(value.current.partsRef.springClone)
                            value.current.partsRef.gripperPivot.attach(value.current.partsRef.capClone)
                            value.current.partsRef.gripperPivot.attach(value.current.partsRef.bodyClone)
                        })
                        .to({}, {duration: 0.5})
                        .add(value.current.handlePartsMovement.armPosition.homePosition(true))
                        .to(value.current.partsRef.basePivot.rotation, {y: 1.502, duration: 2})
                        .to(value.current.partsRef.shoulderPivot.rotation, {z: 0.47, duration: 3}, "<")
                        .to(value.current.partsRef.elbowPivot.rotation, {z: 0.15, duration: 2}, "<")
                        .to(value.current.partsRef.wristPivot.rotation, {z: -0.62, duration: 2}, "<")
                        .to(value.current.partsRef.gripperPivot.rotation, {y: 3.19, duration: 2}, "<")
                        .add(() => value.current.handlePartsMovement.openGripper(true, mode))
                        .add(() => {
                            if(!value.current.runSimulation) return
                            value.current.partsRef.model.attach(value.current.partsRef.bodyClone)
                            value.current.partsRef.bodyClone.attach(value.current.partsRef.pistonClone)
                            value.current.partsRef.bodyClone.attach(value.current.partsRef.springClone)
                            value.current.partsRef.bodyClone.attach(value.current.partsRef.capClone)
                        })
                        .add(() => {
                            if(!value.current.runSimulation) return
                            const tlInside = gsap.timeline({
                                onComplete: () => {
                                    value.current.partsRef.model.attach(value.current.partsRef.pistonClone)
                                    value.current.partsRef.model.attach(value.current.partsRef.springClone)
                                    value.current.partsRef.model.attach(value.current.partsRef.capClone)
                                }
                            })
                            tlInside
                                .to(value.current.partsRef.bodyClone.position, {y: "-=0.003", duration: 0.1})
                                .to(value.current.partsRef.bodyClone.position, {y: "-=0.007", duration: 0.1})
                                .to(value.current.partsRef.bodyClone.rotation, {x: "+=0.3", duration: 0.1}, "<")
                                .to(value.current.partsRef.bodyClone.position, {z: "+=0.133", y: "-=0.035", duration: 1})
                        })
                        .to({}, {duration: 0.5})

                    return tl
                },
            },
            fullSimulation: () => {
                const tl = gsap.timeline({onComplete: () => value.current.status.busy = false, repeat: -1, onRepeat: () => {
                    value.current.handlePartsMovement.resetStation()
                }, onUpdate: () => {
                    if(!value.current.runSimulation) tl.kill()
                }})

                tl
                    .to({}, {duration: 1})
                    .add(() => value.current.handlePartsMovement.openGripper())
                    .add(value.current.handlePartsMovement.armPosition.getBody())
                    .add(() => value.current.partsRef.gripperPivot.attach(value.current.partsRef.bodyClone))
                    .add(() => value.current.handlePartsMovement.closeGripper())
                    .to({}, {duration: 0.5})
                    .add(() => statusContext.setValue((prev) => ({status: {...prev.status, bodyPresent: false}})))
                    .add(value.current.handlePartsMovement.armPosition.homePosition())
                    .add(value.current.handlePartsMovement.armPosition.assembleBody())
                    .add(() => value.current.handlePartsMovement.openGripper())
                    .add(() => value.current.partsRef.model.attach(value.current.partsRef.bodyClone), "<")
                    .to({}, {duration: 0.5})
                    .add(value.current.handlePartsMovement.armPosition.homePosition())
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
                    
                    .add(value.current.handlePartsMovement.armPosition.homePosition())
                    .add(() => value.current.handlePartsMovement.closeGripper())
                    .to({}, {duration: 0.5})
                return tl
            },
            resetStation: () => {
                value.current.partsRef.springFeeder.visible = true
                value.current.partsRef.capFeeder.visible = true
                value.current.partsRef.pistonFeeder.visible = true
                value.current.partsRef.bodyFeeder.visible = true

                value.current.partsRef.model.remove(value.current.partsRef.pistonClone)
                value.current.partsRef.model.remove(value.current.partsRef.springClone)
                value.current.partsRef.model.remove(value.current.partsRef.capClone)
                value.current.partsRef.model.remove(value.current.partsRef.bodyClone)
                value.current.partsRef.gripperPivot.remove(value.current.partsRef.pistonClone)
                value.current.partsRef.gripperPivot.remove(value.current.partsRef.springClone)
                value.current.partsRef.gripperPivot.remove(value.current.partsRef.capClone)
                value.current.partsRef.gripperPivot.remove(value.current.partsRef.bodyClone)

                value.current.partsRef.createClone()

                statusContext.setValue({
                    status: {
                        busy: false,
                        gpOpened: false,
                        capPresent: false,
                        springPresent: false,
                        pistonPresent: true,
                        bodyPresent: true,
                    }
                })
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