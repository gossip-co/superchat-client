import React from 'react'
import LiveVideoSection from './LiveVideoSection'
import PaySection from './PaySection'

const LiveAndPaySection = () => {
  return (
    <section>
  <div className="relative  items-center w-full md:mx-20   max-w-7xl">
    <div className="grid w-full md:gap-5 grid-flow-row grid-cols-1  items-center  mx-auto lg:grid-cols-2">
    <div className="md:p-2 px-1.5 ">
      <LiveVideoSection embedId="zzwRbKI2pn4"/>
    </div>
      <div className="p-2 md:w-96   md:my-0 mt-3 ">
        <PaySection/>
      </div>
    </div>
  </div>
</section>

  )
}

export default LiveAndPaySection;