import React from "react";

const VideoSection = () => {
  return (
    <div className="px-5 md:px-52 mt-36 items-center">

      <div className="video-responsive">
        <iframe
          width="853"
          height="480"
          src={`https://www.youtube.com/embed/jeAQHhMy3Fs`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen={false}
          title="Demo Video"
        />
      </div>
    
    </div>
  );
};

export default VideoSection;
