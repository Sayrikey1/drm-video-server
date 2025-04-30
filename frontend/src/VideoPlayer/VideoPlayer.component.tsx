import "video.js/dist/video-js.css";
import useVideoPlayer, { UseVideoPlayerProps } from "./useVideoPlayer";
import { CSSProperties, useState } from "react";

const buttonStyle: CSSProperties = {
  margin: '4px',
  padding: '6px 12px',
  backgroundColor: '#2c3e50',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

const activeButtonStyle: CSSProperties = {
  ...buttonStyle,
  backgroundColor: '#3498db'
};

const controlsStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  margin: '10px 0'
};

const sectionStyle: CSSProperties = {
  margin: '10px 0'
};

const VideoPlayerComponent = (props: UseVideoPlayerProps) => {
  const { videoRef, currentQuality, availableQualities, changeQuality } = useVideoPlayer(props);
  const [showControls, setShowControls] = useState(true);

  return (
    <div>
      <h1>Video Player</h1>
      <div data-vjs-player>
        <div ref={videoRef as any} />
      </div>
      
      {showControls && props.uuid && (
        <div style={controlsStyle}>
          <div style={sectionStyle}>
            <h3>Quality Settings</h3>
            <div>
              {availableQualities.map(quality => (
                <button
                  key={quality}
                  style={quality === currentQuality ? activeButtonStyle : buttonStyle}
                  onClick={() => changeQuality(quality)}
                >
                  {quality}
                </button>
              ))}
            </div>
          </div>
          
          {props.subtitles && Object.keys(props.subtitles).length > 0 && (
            <div style={sectionStyle}>
              <h3>Subtitles are available in the player controls</h3>
              <p>The video player includes subtitle options for: {Object.keys(props.subtitles).join(', ')}</p>
            </div>
          )}
          
          <button 
            style={buttonStyle} 
            onClick={() => setShowControls(false)}
          >
            Hide Controls
          </button>
        </div>
      )}
      
      {!showControls && (
        <button 
          style={buttonStyle} 
          onClick={() => setShowControls(true)}
        >
          Show Controls
        </button>
      )}
    </div>
  );
};

export default VideoPlayerComponent;