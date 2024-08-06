"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBox from "./SearchBox";
import FilterOption from "./FilterOption";
import ProfileProps from "./ProfileProps";
import MainSetting from "./MainSetting";
import MainHeader from "./MainHeader";
import ScrollContainer from "./ScrollContainer";

const CardVideo = () => {
  const [videos, setVideos] = useState([]);
  const [filterVideos, setFilterVideos] = useState("");
  const [sortOption, setSortOption] = useState("");

  const sortedVideos = [...videos];

  //Create a dropdown search function
  const handleInputChange = (event) => {
    event.preventDefault();
    console.log(search);
    if (!search) {
      return;
    }
    let filteredData = videos.filter((video) => {
      return video.title.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredData([...filteredData]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = "AIzaSyDy2Asf_REJxHkSdeO7k8Kol4Hy_2ElNAw";
        const channelIds = [
          "UCmXmlB4-HJytD7wek0Uo97A",
          "UCsBjURrPoezykLs9EqgamOA",
        ];
        const maxResults = 10;

        const promises = channelIds.map(async (channelId) => {
          const response = await axios.get(
            `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxResults}`
          );

          return response.data.items.map((item) => ({
            id: item.id.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.default.url,
          }));
        });

        const videoLists = await Promise.all(promises);
        const combinedVideoList = videoLists.flat();

        setVideos(combinedVideoList);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchData();
  }, []);

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
          <div className="px-5">
            <FilterOption
              videos={videos}
              sortOption={sortOption}
              setSortOption={setSortOption}
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
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedVideos
          .filter((video) =>
            video.title.toLowerCase().includes(filterVideos.toLowerCase())
          )
          .map((video) => (
            <li
              key={video.id}
              className="rounded-lg overflow-hidden shadow-md hover:shadow-lg"
            >
              <div className="aspect-video aspect-h-32">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              <p className="font-semibold my-2 text-xs px-5">{video.title}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CardVideo;
