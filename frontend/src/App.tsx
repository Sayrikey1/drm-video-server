import { useState } from "react";
import "./App.css";
import useApp from "./useApp";
import VideoPlayerComponent from "./VideoPlayer/VideoPlayer.component";

function App() {
  const [videoKey, setVideoKey] = useState<string>("string--COOKIE-TEST-001");
  const [inputKey, setInputKey] = useState<string>("");
  const { videoContent, loading, error } = useApp(videoKey);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputKey.trim()) {
      setVideoKey(inputKey.trim());
    }
  };

  return (
    <div className="app-container">
      <h1>Video Streaming App</h1>
      
      <form onSubmit={handleSubmit} style={{ margin: '20px 0' }}>
        <input
          type="text"
          value={inputKey}
          onChange={(e) => setInputKey(e.target.value)}
          placeholder="Enter video key"
          style={{ 
            padding: '8px',
            marginRight: '10px',
            width: '300px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
        <button 
          type="submit"
          style={{
            padding: '8px 16px',
            backgroundColor: '#2c3e50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Load Video
        </button>
      </form>
      
      {loading && <div>Loading video information...</div>}
      
      {error && <div style={{ color: 'red' }}>{error}</div>}
      
      {videoContent && !loading && (
        <>
          <div style={{ marginBottom: '10px' }}>
            <strong>Current Video Key:</strong> {videoKey}
          </div>
          <VideoPlayerComponent {...videoContent} />
        </>
      )}
    </div>
  );
}

export default App;