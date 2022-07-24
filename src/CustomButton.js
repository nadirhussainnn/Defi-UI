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
        <button className='btn-top'>{title}</button>
        </div>
    </div>
  )
}
