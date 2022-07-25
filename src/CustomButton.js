import React from 'react'
import './styles/home.css'

export default function CustomButton(props) {
    const {title} = props

  return (
    <div>
        <div className='btn-container'>
            {
                props.children
            }
        <button className='btn-top' onClick={()=>{
                title=='Wallet'?props.navigation(true):props.navigation(false)
        }}>{title}</button>
        </div>
    </div>
  )
}
