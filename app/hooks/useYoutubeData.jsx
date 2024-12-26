"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const useYoutubeVideos = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Use environment variable
        const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
        if (!apiKey) {
          throw new Error('YouTube API key is not configured');
        }

        // Validate channel IDs
        const channelIds = [
          process.env.NEXT_PUBLIC_CHANNEL_ID_1,
          process.env.NEXT_PUBLIC_CHANNEL_ID_2,
        ].filter(Boolean); // Remove any undefined values

        if (channelIds.length === 0) {
          throw new Error('No valid channel IDs configured');
        }

        const maxResults = 10;

        // Create an axios instance with base configuration
        const youtubeApi = axios.create({
          baseURL: 'https://www.googleapis.com/youtube/v3',
          timeout: 10000, // 10 second timeout
          headers: {
            'Accept': 'application/json',
          }
        });

        const promises = channelIds.map(async (channelId) => {
          // Validate channelId format
          if (!/^[A-Za-z0-9_-]+$/.test(channelId)) {
            throw new Error(`Invalid channel ID format: ${channelId}`);
          }

          const response = await youtubeApi.get('/search', {
            params: {
              key: apiKey,
              channelId,
              part: 'snippet,id',
              order: 'date',
              maxResults,
              type: 'video', // Explicitly request only videos
            }
          });

          // Sanitize and validate response data
          return response.data.items
            .filter(item => item?.id?.videoId && item?.snippet?.title)
            .map(item => ({
              id: item.id.videoId,
              title: sanitizeString(item.snippet.title),
              thumbnail: item.snippet.thumbnails?.default?.url || '',
            }));
        });

        const videoLists = await Promise.all(promises);

        const combinedVideoList = videoLists.flat();

        setVideos(combinedVideoList);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching videos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { videos, isLoading, error };
};

// Sanitize strings to prevent XSS
function sanitizeString(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

export default useYoutubeVideos;
