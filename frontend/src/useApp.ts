import axios from "axios";
import { useState, useEffect } from "react";
import { VideoInfo } from "./VideoPlayer/useVideoPlayer";

interface VideoResponse {
  id: number;
  video_key: string;
  video_urls: {
    hls: string;
    dash: string;
    thumbnail: string;
  };
  source_language: string;
  subtitle_count: number;
  subtitles: {
    [language: string]: string;
  };
  created_at: string;
  updated_at: string;
}

const useApp = (videoKey: string = "string--COOKIE-TEST-001") => {
  const [videoContent, setVideoContent] = useState<VideoInfo | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const extractUuidFromHlsUrl = (hlsUrl: string): string => {
    const matches = hlsUrl.match(/hls_([^/]+)\/playlist\.m3u8/);
    return matches ? matches[1] : "";
  };

  const handleGetVideoInfo = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await axios.get(
        `https://streaming.mabi-vids.com/get-video/${encodeURIComponent(videoKey)}`
      );
      
      const data = result.data as VideoResponse;
      const hlsUrl = data.video_urls.hls;
      const uuid = extractUuidFromHlsUrl(hlsUrl);

      // const signer = await axios.get(
      //   `https://api.streaming.mabi-vids.com/abs/${uuid}/access`,
      //   {
      //     withCredentials: true, // to set cookies from backend to frontend
      //   }
      // );

      const signer = await axios.get(
        `https://api-stream.mabi-vids.com/abs/${uuid}/access`,
        {
          withCredentials: true, // to set cookies from backend to frontend
        }
      );

      if (signer.status !== 200) {
        throw new Error("Failed to sign the video URL");
      }
      
      // Set up video info with the data from API
      setVideoContent({
        videoSrc: hlsUrl,
        videoMimeType: "application/x-mpegURL",
        subtitles: data.subtitles,
        uuid: uuid,
        sourceLanguage: data.source_language,
        thumbnail: data.video_urls.thumbnail
      });
    } catch (err) {
      console.error("Failed to fetch video info:", err);
      setError("Failed to load video information. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (videoKey) {
      handleGetVideoInfo();
    }
  }, [videoKey]);

  return {
    videoContent,
    loading,
    error,
    refreshVideo: handleGetVideoInfo
  };
};

export default useApp;