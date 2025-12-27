import clsx from 'clsx'
import React, { useEffect, useState } from 'react'

const ExplainPanel = ({text, step, titles}) => {
    const [displayStep, setDisplayStep] = useState(step)
    const [animation, setAnimation] = useState("animate-stutter-lamp")

    useEffect(() => {
        if(step !== displayStep){
            setAnimation("animate-exit-explain")

            const timeout = setTimeout(() => {
                setAnimation("animate-stutter-lamp")
                setDisplayStep(step)
            }, 1000);

            return () => clearTimeout(timeout)
        }
    }, [step, displayStep])

  return (
    <div className={clsx('fixed w-96 right-3 font-cascadia text-base text-justify text-red-primary flex bg-[radial-gradient(circle,_rgba(0,0,0,0.6)_2px,_rgba(0,0,0,0.4)_1px)] [background-size:20px_20px] border-2 border-black rounded-sm px-5 py-3 origin-center top-1/6 flex-col gap-3', animation)}>
        <h1 className="text-4xl text-left font-iceland text-green-primary">{titles[displayStep]}</h1>
        <p>{text[displayStep]}</p>
    </div>
  )
}

export default ExplainPanel