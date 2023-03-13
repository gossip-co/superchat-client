import React from 'react'
import LiveVideoSection from './LiveVideoSection'
import PaySection from './PaySection'

const LiveAndPaySection = () => {
  return (
    <section>
  <div class="relative  items-center w-full md:mx-20   max-w-7xl">
    <div class="grid w-full md:gap-5 grid-flow-row grid-cols-1  items-center  mx-auto lg:grid-cols-2">
    <div class="md:p-2 px-1.5 ">
      <LiveVideoSection embedId="zzwRbKI2pn4"/>
    </div>
      <div class="p-2 md:w-96   md:my-0 mt-3 ">
        <PaySection/>
      </div>
    </div>
  </div>
</section>

  )
}

export default LiveAndPaySection;