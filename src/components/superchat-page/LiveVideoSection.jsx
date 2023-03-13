import React from 'react'

const LiveVideoSection = ({embedId}) => {
  return (
    <div className="items-center ">

      <div className="video-responsive rounded-lg">
        <iframe
          width="853"
          height="480"
          src={`https://www.youtube.com/embed/${embedId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media;"
          allowFullScreen={false}
          title="Carry is Live"
        />
      </div>
    
    </div>
  )
}

export default LiveVideoSection