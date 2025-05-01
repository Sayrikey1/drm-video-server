import { useRef, useEffect, useState } from "react";
import Player from "video.js/dist/types/player";
import videojs from "video.js";
import 'videojs-hls-quality-selector';
import 'videojs-contrib-quality-levels';

export interface VideoInfo {
  videoSrc: string;
  videoMimeType: string;
  subtitles?: {
    [language: string]: string;
  };
  uuid?: string;
  sourceLanguage?: string;
  thumbnail?: string;
}

export interface UseVideoPlayerProps extends VideoInfo {}

const useVideoPlayer = ({ videoSrc, videoMimeType, subtitles, uuid, sourceLanguage, thumbnail }: UseVideoPlayerProps) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);
  const [currentQuality, setCurrentQuality] = useState<string>("auto");
  const [availableQualities, setAvailableQualities] = useState<string[]>(["auto"]);

  // Handle quality change
  const changeQuality = (quality: string) => {
    if (!videoSrc || !uuid) return;
    
    let newSrc = videoSrc;
    
    // If not auto, replace playlist.m3u8 with the specific quality
    if (quality !== "auto") {
      newSrc = videoSrc.replace("playlist.m3u8", `${quality}.m3u8`);
    }
    
    if (playerRef.current) {
      const currentTime = playerRef.current.currentTime();
      const wasPlaying = !playerRef.current.paused();
      
      playerRef.current.src({
        src: newSrc,
        type: videoMimeType,
        withCredentials: true
      });
      
      playerRef.current.one("loadedmetadata", () => {
        // Restore playback position
        playerRef.current?.currentTime(currentTime);
        
        // Resume playback if it was playing
        if (wasPlaying) {
          playerRef.current?.play();
        }
      });
      
      setCurrentQuality(quality);
    }
  };

  const getVideoOptions = () => {
    // Define the source
    const source = {
      src: videoSrc,
      type: videoMimeType,
      withCredentials: true,
    };

    const options = {
      autoplay: false,
      controls: true,
      responsive: true,
      fluid: true,
      sources: [source],
      poster: thumbnail || "",
    };

    return options;
  };

  // Add subtitles to the player
  const addSubtitlesToPlayer = (player: Player) => {
    if (!subtitles) return;
    
    // Clear existing tracks
    const tracks = (player as any).textTracks();
    for (let i = tracks.length - 1; i >= 0; i--) {
      player.removeRemoteTextTrack(tracks[i]);
    }
    
    // Add new subtitle tracks
    Object.entries(subtitles).forEach(([language, url]) => {
      player.addRemoteTextTrack({
        kind: 'subtitles',
        srclang: language.toLowerCase().substring(0, 2), // Extract first 2 chars: "English" -> "en"
        label: language,
        src: url,
        default: language === sourceLanguage
      }, false);
    });
  };

  // Set common quality levels for HLS streams
  const setQualityOptions = () => {
    setAvailableQualities(["auto", "2160p", "1440p", "1080p", "720p", "480p", "360p"]);
  };

  useEffect(() => {
    const options = getVideoOptions();
    
    // If player exists, dispose and recreate
    if (playerRef.current) {
      playerRef.current.dispose();
      playerRef.current = null;
    }

    if (!playerRef.current && videoRef.current) {
      // Clear any existing content
      while (videoRef.current.firstChild) {
        videoRef.current.removeChild(videoRef.current.firstChild);
      }
      
      // Create video element
      const videoElement = document.createElement("video-js");
      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current.appendChild(videoElement);

      // Initialize player
      const player = videojs(videoElement, options, () => {
        console.log("Video Player Ready");
        
        // Add subtitles
        addSubtitlesToPlayer(player);
        
        // Set quality options
        setQualityOptions();
        
        // Initialize HLS Quality Selector if using HLS
        if (videoMimeType === "application/x-mpegURL") {
          (player as any).hlsQualitySelector({
            displayCurrentQuality: true,
          });
        }
      });

      playerRef.current = player;
    }
    
    // Cleanup function
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [videoRef.current, videoSrc, videoMimeType, subtitles]);

  return {
    videoRef,
    currentQuality,
    availableQualities,
    changeQuality
  };
};

export default useVideoPlayer;