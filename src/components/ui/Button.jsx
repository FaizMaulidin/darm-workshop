import React from 'react'
import clsx from 'clsx'

const Button = ({variant="primary", size="md", children, armStatus, ...props}) => {

    const isDisabled = armStatus == children
    const variantClasses = {
        primary: "bg-red-primary text-white hover:bg-red-dark transition-colors duration-300",
        secondary: "bg-transparent text-red-primary hover:bg-red-dark hover:text-white inset-ring-2 hover:inset-ring-red-dark inset-ring-red-primary transition-colors duration-300",
        nav: "bg-transparent text-red-primary inset-ring-b-2 border-b-1 border-transparent hover:border-red-primary transition-all duration-300",
        control: "bg-red-dark hover:bg-red-primary text-red-primary hover:text-white border-3 border-black-dark transition-all duration-300 rounded-sm",
      };
      
    const sizeClasses = {
        sm: "px-2 py-0.5 text-lg",
        md: "px-4 py-3 text-sm tracking-wider",
        control: "p-control text-xs tracking-widest",
        lg: "px-32 py-5 text-lg tracking-widest",
    };
    return (
        <button className={clsx(variantClasses[variant], sizeClasses[size], "cursor-pointer font-iceland ")} {...props} disabled={isDisabled}>
            {variant != "control" ? children : <div className='w-full h-full bg-green-primary flex justify-center items-center whitespace-nowrap py-2 px-3 rounded-xs shadow-control font-cascadia font-semibold'>
                {children}
            </div>}
        </button>
    )
}

export default Button