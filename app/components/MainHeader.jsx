import Image from "next/image";

const MainHeader = () => {
  return (
    <div className="flex">
      <h1 className="text-2xl py-5 px-5 font-bold">LearnDev</h1>
      <div className="box pt-5">
        <Image src="/book.png" width={30} height={30} />
      </div>
    </div>
  );
};

export default MainHeader;
