import React from 'react'
import TopNav from './TopNav'

import {colors} from './theme/colors'

export default function Home() {
  return (
    <div className='main-div' style={{backgroundColor:colors.dark}}>
        <TopNav />
    </div>
  )
}
