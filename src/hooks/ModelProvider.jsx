import React, { useRef, createContext, useContext, useState} from 'react'
import gsap from 'gsap'
import * as THREE from 'three'

const ModelContext = createContext()

const ModelProvider = ({children}) => {

    const [armPositionStatus, setArmPositionStatus] = useState("Home Position")

    const value = useRef({
        busy: false,
        runSimulation: true,
        partsRef: {
            model: null,
            basePivot: null,
            shoulderPivot: null,
            elbowPivot: null,
            wristPivot: null,
            gripperPivot: null,
            gpRight: null,
            gpLeft: null,
            gpOpened: false,
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
            openGripper: (insideTl=false, onSimulation=false) => {
                if(value.current.busy && !insideTl) return
                if(value.current.partsRef.gpOpened) return
                if(!value.current.runSimulation && onSimulation) return
                console.log({insideTl, onSimulation, runSimulation: value.current.runSimulation, busy: value.current.busy})

                const gpPos = value.current.partsRef.gripperPivot.getWorldPosition(new THREE.Vector3())
                const pistonPos = value.current.partsRef.pistonClone.getWorldPosition(new THREE.Vector3())
                const springPos = value.current.partsRef.springClone.getWorldPosition(new THREE.Vector3())
                const capPos = value.current.partsRef.capClone.getWorldPosition(new THREE.Vector3())

                const pistonGripped = gpPos.distanceTo(pistonPos) < 0.13
                const springGripped = gpPos.distanceTo(springPos) < 0.131
                const capGripped = gpPos.distanceTo(capPos) < 0.135

                value.current.busy = true
                const tl = gsap.timeline({onComplete: () => {
                    if(!insideTl) value.current.busy = false
                    value.current.partsRef.gpOpened = true
                    if(pistonGripped) value.current.partsRef.model.attach(value.current.partsRef.pistonClone)
                    if(springGripped) value.current.partsRef.model.attach(value.current.partsRef.springClone)
                    if(capGripped) value.current.partsRef.model.attach(value.current.partsRef.capClone)
                }})
                tl.to(value.current.partsRef.gpRight.position, {z: "-=0.005", duration: 0.2})
                    .to(value.current.partsRef.gpLeft.position, {z: "+=0.005", duration: 0.2}, "<")
                return tl
            },
            closeGripper: (insideTl=false, onSimulation=false) => {
                if(value.current.busy && !insideTl) return
                if(!value.current.partsRef.gpOpened) return
                if(!value.current.runSimulation && onSimulation) return
                value.current.busy = true

                const gpPos = value.current.partsRef.gripperPivot.getWorldPosition(new THREE.Vector3())
                const pistonPos = value.current.partsRef.pistonClone.getWorldPosition(new THREE.Vector3())
                const springPos = value.current.partsRef.springClone.getWorldPosition(new THREE.Vector3())
                const capPos = value.current.partsRef.capClone.getWorldPosition(new THREE.Vector3())

                const pistonGripped = gpPos.distanceTo(pistonPos) < 0.13
                const springGripped = gpPos.distanceTo(springPos) < 0.131
                const capGripped = gpPos.distanceTo(capPos) < 0.135

                const tl = gsap.timeline({onComplete: () => {
                    if(!insideTl) value.current.busy = false
                    value.current.partsRef.gpOpened = false
                    if(pistonGripped && onSimulation) value.current.partsRef.gripperPivot.attach(value.current.partsRef.pistonClone)
                    if(springGripped && onSimulation) value.current.partsRef.gripperPivot.attach(value.current.partsRef.springClone)
                    if(capGripped && onSimulation) value.current.partsRef.gripperPivot.attach(value.current.partsRef.capClone)
                }})
                tl.to(value.current.partsRef.gpRight.position, {z: "+=0.005", duration: 0.2})
                    .to(value.current.partsRef.gpLeft.position, {z: "-=0.005", duration: 0.2}, "<")
                return tl
            },
            feedCap: (insideTl=false, onSimulation=false) => {
                if(value.current.busy && !insideTl) return
                if(value.current.partsRef.capClone.position.z < 0.14) return
                if(!value.current.runSimulation && onSimulation) return
                value.current.busy = true
                const tl = gsap.timeline({onComplete: () => {if(!insideTl) value.current.busy = false}})
                tl
                    .add(() => value.current.partsRef.capFeeder.visible = false)
                    .add(() => gsap.to(value.current.partsRef.capClone.position, {z: "-=0.065", duration: 0.7}))
                    .to(value.current.partsRef.fcPusher.position, {z: "-=0.065", duration: 0.7}, "<")
                    .to(value.current.partsRef.fcPusher.position, {z: "+=0.065", duration: 0.7, delay: 1})
                return tl
            },
            feedSpring: (insideTl=false, onSimulation=false) => {
                if(value.current.busy && !insideTl) return
                if(value.current.partsRef.fsExtended) return
                if(!value.current.runSimulation && onSimulation) return
                value.current.busy = true
                const tl = gsap.timeline({onComplete: () => {
                    if(!insideTl) value.current.busy = false
                    value.current.partsRef.fsExtended = true
                }})
                tl
                    .add(() => value.current.partsRef.springFeeder.visible = false)
                    .add(() => gsap.to(value.current.partsRef.springClone.position, {z: "-=0.045", duration: 0.7}))
                    .to(value.current.partsRef.fsPusher.position, {z: "-=0.045", duration: 0.7}, "<")
                return tl
            },
            unfeedSpring: (insideTl=false, onSimulation=false) => {
                if(value.current.busy && !insideTl) return
                if(!value.current.partsRef.fsExtended) return
                if(!value.current.runSimulation && onSimulation) return

                value.current.busy = true
                const zPos = value.current.partsRef.springClone.position.z
                const tl = gsap.timeline({onComplete: () => {
                    if(!insideTl) value.current.busy = false
                    value.current.partsRef.fsExtended = false
                }})
                if(zPos > 0.11 && zPos < 0.12){
                    tl.add(() => gsap.to(value.current.partsRef.springClone.position, {z: "+=0.045", duration: 0.7}))
                }
                tl.to(value.current.partsRef.fsPusher.position, {z: "+=0.045", duration: 0.7})
                return tl
            },
            armPosition: {
                status: armPositionStatus,
                setStatus: (status) => setArmPositionStatus(status),
                homePosition: (insideTl=false) => {
                    if(value.current.busy && !insideTl) return
                    value.current.busy = true
                    const tl = gsap.timeline({onComplete: () => {if(!insideTl) value.current.busy = false}})
                    tl
                        .to(value.current.partsRef.basePivot.rotation, {y: 0, duration: 2})
                        .to(value.current.partsRef.shoulderPivot.rotation, {z: 0, duration: 2}, "<")
                        .to(value.current.partsRef.elbowPivot.rotation, {z: 0, duration: 2}, "<")
                        .to(value.current.partsRef.wristPivot.rotation, {z: 0, duration: 2}, "<")
                        .to(value.current.partsRef.gripperPivot.rotation, {y: 0, duration: 2}, "<")
                    return tl
                },
                getPiston: (insideTl=false) => {
                    if(value.current.busy && !insideTl) return
                    value.current.busy = true
                    const tl = gsap.timeline({onComplete: () => {if(!insideTl) value.current.busy = false}})
                    tl
                        .add(() => value.current.partsRef.pistonFeeder.visible = false)
                        .to(value.current.partsRef.basePivot.rotation, {y: 0.445, duration: 2})
                        .to(value.current.partsRef.shoulderPivot.rotation, {z: 1.15, duration: 2}, "<")
                        .to(value.current.partsRef.elbowPivot.rotation, {z: -0.555, duration: 2}, "<")
                        .to(value.current.partsRef.wristPivot.rotation, {z: -0.595, duration: 2}, "<")
                        .to(value.current.partsRef.gripperPivot.rotation, {y: 1.135, duration: 2}, "<")
                        .to({}, {duration: 0.5})
                    return tl
                },
                getSpring: (insideTl=false) => {
                    if(value.current.busy && !insideTl) return
                    value.current.busy = true
                    const tl = gsap.timeline({onComplete: () => {if(!insideTl) value.current.busy = false}})
                    tl
                        .to(value.current.partsRef.basePivot.rotation, {y: 0.405, duration: 2})
                        .to(value.current.partsRef.shoulderPivot.rotation, {z: 1.98, duration: 2}, "<")
                        .to(value.current.partsRef.elbowPivot.rotation, {z: -1.85, duration: 2}, "<")
                        .to(value.current.partsRef.wristPivot.rotation, {z: -0.13, duration: 2}, "<")
                        .to(value.current.partsRef.gripperPivot.rotation, {y: 1.16, duration: 2}, "<")
                        .to({}, {duration: 0.5})
                    return tl
                },
                getCap: (insideTl=false) => {
                    if(value.current.busy && !insideTl) return
                    value.current.busy = true
                    const tl = gsap.timeline({onComplete: () => {if(!insideTl) value.current.busy = false}})
                    tl
                        .to(value.current.partsRef.basePivot.rotation, {y: 0.66, duration: 2})
                        .to(value.current.partsRef.shoulderPivot.rotation, {z: 0.84, duration: 2}, "<")
                        .to(value.current.partsRef.elbowPivot.rotation, {z: -0.03, duration: 2}, "<")
                        .to(value.current.partsRef.wristPivot.rotation, {z: -0.81, duration: 2}, "<")
                        .to(value.current.partsRef.gripperPivot.rotation, {y: -2.25, duration: 2}, "<")
                        .to({}, {duration: 0.5})
                    return tl
                },
                assemblePiston: (insideTl=false, onSimulation=false) => {
                    if(value.current.busy && !insideTl) return
                    value.current.busy = true
                    const tl = gsap.timeline({onComplete: () => {if(!insideTl) value.current.busy = false}})
                    tl
                        .add(() => value.current.handlePartsMovement.closeGripper(true, onSimulation))
                        .to(value.current.partsRef.basePivot.rotation, {y: 0.08, duration: 2, delay: 0.2})
                        .to(value.current.partsRef.shoulderPivot.rotation, {z: 1.47, duration: 2}, "<")
                        .to(value.current.partsRef.elbowPivot.rotation, {z: -1.06, duration: 2}, "<")
                        .to(value.current.partsRef.wristPivot.rotation, {z: -0.41, duration: 2}, "<")
                        .to(value.current.partsRef.gripperPivot.rotation, {y: 0, duration: 2}, "<")
                        .add(() => value.current.handlePartsMovement.openGripper(true, onSimulation))
                    return tl
                },
                assembleCap: (insideTl=false, onSimulation=false) => {
                    if(value.current.busy && !insideTl) return
                    value.current.busy = true
                    const tl = gsap.timeline({onComplete: () => {if(!insideTl) value.current.busy = false}})
                    tl
                        .to(value.current.partsRef.basePivot.rotation, {y: 0.16, duration: 2})
                        .to(value.current.partsRef.shoulderPivot.rotation, {z: 1.05, duration: 2}, "<")
                        .to(value.current.partsRef.elbowPivot.rotation, {z: -0.395, duration: 2}, "<")
                        .to(value.current.partsRef.wristPivot.rotation, {z: -0.655, duration: 2}, "<")
                        .to(value.current.partsRef.gripperPivot.rotation, {y: 3, duration: 2}, "<")
                        .add(() => value.current.handlePartsMovement.openGripper(true, onSimulation))
                        .add(() => {if(value.current.runSimulation)gsap.to(value.current.partsRef.capClone.position, {y: "-=0.005", duration: 0.1})})
                        .to({}, {duration: 0.5})
                        .to(value.current.partsRef.shoulderPivot.rotation, {z: 0.905, duration: 1})
                        .to(value.current.partsRef.wristPivot.rotation, {z: -0.505, duration: 1}, "<")
                        .to(value.current.partsRef.gripperPivot.rotation, {y: 1.4, duration: 1})
                        .to(value.current.partsRef.basePivot.rotation, {y: 0.145, duration: 2}, "<")
                        .to(value.current.partsRef.shoulderPivot.rotation, {z: 1.32, duration: 2}, "<")
                        .to(value.current.partsRef.elbowPivot.rotation, {z: -0.77, duration: 2}, "<")
                        .to(value.current.partsRef.wristPivot.rotation, {z: -0.55, duration: 2}, "<")
                        .add(() => value.current.handlePartsMovement.closeGripper(true, onSimulation))
                        .to({}, {duration: 0.5})
                        .to(value.current.partsRef.shoulderPivot.rotation, {z: 0.905, duration: 1})
                        .to(value.current.partsRef.elbowPivot.rotation, {z: -0.395, duration: 1}, "<")
                        .to(value.current.partsRef.wristPivot.rotation, {z: -0.505, duration: 1}, "<")

                        .to(value.current.partsRef.basePivot.rotation, {y: 0.082, duration: 2})
                        .to(value.current.partsRef.shoulderPivot.rotation, {z: 1.785, duration: 2}, "<")
                        .to(value.current.partsRef.elbowPivot.rotation, {z: -1.535, duration: 2}, "<")
                        .to(value.current.partsRef.wristPivot.rotation, {z: -0.25, duration: 2}, "<")
                        .to(value.current.partsRef.gripperPivot.rotation, {y: 1.8, duration: 2}, "<")
                        .add(() => {if(value.current.runSimulation)gsap.to(value.current.partsRef.springClone.position, {y: "-=0.002", duration: 3}, "<")})
                        .to(value.current.partsRef.gripperPivot.rotation, {y: 1.2, duration: 0.5})
                        .add(() => value.current.handlePartsMovement.openGripper(true, onSimulation))
                        .to({}, {duration: 0.5})
                    return tl
                }
            },
            fullSimulation: () => {
                const tl = gsap.timeline({onComplete: () => value.current.busy = false, repeat: -1, onRepeat: () => {
                    value.current.partsRef.springFeeder.visible = true
                    value.current.partsRef.capFeeder.visible = true
                    value.current.partsRef.pistonFeeder.visible = true

                    value.current.partsRef.model.remove(value.current.partsRef.pistonClone)
                    value.current.partsRef.model.remove(value.current.partsRef.springClone)
                    value.current.partsRef.model.remove(value.current.partsRef.capClone)

                    value.current.partsRef.createClone()
                }, onStart: () => {
                    value.current.handlePartsMovement.fullSimulation().kill()
                }})

                tl
                    .add(value.current.handlePartsMovement.openGripper(true, true))
                    .add(value.current.handlePartsMovement.armPosition.getPiston(true))
                    .add(() => value.current.handlePartsMovement.closeGripper(true, true))
                    .to({}, {duration: 0.5})
                    .add(value.current.handlePartsMovement.armPosition.homePosition(true))
                    .add(value.current.handlePartsMovement.armPosition.assemblePiston(true, true))
                    .add(() => {if(value.current.runSimulation)gsap.to(value.current.partsRef.pistonClone.position, {y: "-=0.01", duration: 0.1})})
                    .to({}, {duration: 0.5})
                    .add(value.current.handlePartsMovement.armPosition.homePosition(true))
                    .add(() => value.current.handlePartsMovement.openGripper(true,true))
                    .add(() => value.current.handlePartsMovement.feedSpring(true, true))
                    .add(value.current.handlePartsMovement.armPosition.getSpring(true))
                    .add(() => value.current.handlePartsMovement.closeGripper(true, true))
                    .to({}, {duration: 0.5})
                    .add(value.current.handlePartsMovement.armPosition.homePosition(true))
                    .add(() => value.current.handlePartsMovement.unfeedSpring(true, true))
                    .add(value.current.handlePartsMovement.armPosition.assemblePiston(true, true))
                    .add(() => {if(value.current.runSimulation)gsap.to(value.current.partsRef.springClone.position, {y: "-=0.006", duration: 0.1})})
                    .to({}, {duration: 0.5})
                    .add(value.current.handlePartsMovement.armPosition.homePosition(true))
                    .add(() => value.current.handlePartsMovement.feedCap(true, true))
                    .add(value.current.handlePartsMovement.armPosition.getCap(true))
                    .add(() => value.current.handlePartsMovement.closeGripper(true, true))
                    .to({}, {duration: 0.5})
                    .add(value.current.handlePartsMovement.armPosition.homePosition(true))
                    .add(value.current.handlePartsMovement.armPosition.assembleCap(true, true))
                    .add(value.current.handlePartsMovement.armPosition.homePosition(true))
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