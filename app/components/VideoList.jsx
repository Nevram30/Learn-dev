"use client";
import React from "react";

const VideoList = ({ videos, filterVideos }) => {
  // Input validation
  if (!Array.isArray(videos)) {
    console.error('Videos prop must be an array');
    return null;
  }

  const sanitizedFilter = filterVideos.toLowerCase().trim();
  
  const filteredVideos = videos.filter((video) => {
    if (!video?.title || typeof video.title !== 'string') return false;
    return video.title.toLowerCase().includes(sanitizedFilter);
  });

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredVideos.map((video) => {
        // Validate video ID format
        if (!video.id || !/^[A-Za-z0-9_-]+$/.test(video.id)) {
          console.error(`Invalid video ID: ${video.id}`);
          return null;
        }

        const embedUrl = `https://www.youtube.com/embed/${video.id}`;

        return (
          <li
            key={video.id}
            className="rounded-lg overflow-hidden shadow-md hover:shadow-lg"
          >
            <div className="aspect-video aspect-h-32">
              <iframe
                src={embedUrl}
                title={video.title}
                allowFullScreen
                className="w-full h-full"
                sandbox="allow-scripts allow-same-origin allow-presentation"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <p className="font-semibold my-2 text-xs px-5">
              {video.title}
            </p>
          </li>
        );
      })}
    </ul>
  );
};

export default VideoList;