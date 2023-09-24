import Image from "next/image";

const MainFooter = () => {
  return (
    <footer>
      <div className="flex justify-center py-10">
        <p className="text-center py-5 px-5">Made by Paray</p>
        <Image src="/teenager.png" width={60} height={20} />
      </div>
    </footer>
  );
};

export default MainFooter;
