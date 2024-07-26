import React, { Children } from 'react'
interface containerProps{
    children: React.ReactNode
}

export const Container:React.FC<containerProps> = ({children}) => {
  return (
    <div className='max-w-[2520px] mx-auto xl:px-20 md:px-2 sm:px-2 px-4'>
        {children}
    </div>
  )
}
export default Container
