"use client";
import { AiOutlineSearch } from "react-icons/ai";
import React from "react";

const SearchBox = ({ filterTerm, setFilterTerm }) => {
  return (
    <div className="flex font-[Poppins] border rounded-lg">
      <button className="py-1">
        <AiOutlineSearch className="icon w-10 h-10 py-2" />
      </button>
      <input
        type="text"
        placeholder="Search videos"
        value={filterTerm}
        onChange={(e) => setFilterTerm(e.target.value)}
        className="rounded-lg"
      />
    </div>
  );
};

export default SearchBox;
