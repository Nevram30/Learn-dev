"use client";
import React, { useState } from "react";
import useYoutubeVideos  from "../hooks/useYoutubeData";
import SearchBox from "./SearchBox";
import ProfileProps from "./ProfileProps";
import MainSetting from "./MainSetting";
import MainHeader from "./MainHeader";
import ScrollContainer from "./ScrollContainer";
import VideoList from "./VideoList";
import ErrorCard from "./ErrorCard";

const CardVideo = () => {
  const [filterVideos, setFilterVideos] = useState("");
  const { videos, isLoading, error } = useYoutubeVideos();

  if (error) {
    return <ErrorCard error={error} />;
  }

  return (
    <div className="p-6">
      <div className="flex py-5 items-center justify-between">
        <MainHeader />
        <div className="flex">
          <div>
            <SearchBox
              filterVideos={filterVideos}
              setFilterVideos={setFilterVideos}
            />
          </div>
          <div className="flex px-2 gap-2">
            <ProfileProps />
            <MainSetting />
          </div>
        </div>
      </div>
      <div className="pb-10">
        <ScrollContainer />
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <VideoList videos={videos} filterVideos={filterVideos} />
      )}
    </div>
  );
};

export default CardVideo;

