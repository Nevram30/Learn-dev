"use client";

const Filter = ({ sortOption, setSortOption, videos }) => {
  return (
    <div className="filter border rounded-lg font-[Poppins]">
      <select
        className="select"
        data={videos}
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option disabled selected>
          Filter videos
        </option>
        <option value="title">JavaScript</option>
        <option value="title">Tailwind css</option>
        <option value="title">ChatGPT</option>
        <option value="title">HTML</option>
        <option value="title">React js</option>
      </select>
    </div>
  );
};

export default Filter;
