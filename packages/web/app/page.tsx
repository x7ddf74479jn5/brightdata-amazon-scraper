import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/outline";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <DocumentMagnifyingGlassIcon className="h-64 w-64 text-indigo-600/20" />

        <h1 className="text-3xl mt-2 text-black text-center font-bold mb-5">Welcome to the Amazon Web Scrapper</h1>

        <h2 className="text-lg italic text-center text-black/50">This app is coded by Pandashark(@x7ddf74479jn5).</h2>

        <h3 className="text-lg text-center italic text-black/50">https://github.com/x7ddf74479jn5</h3>
      </div>
    </div>
  );
};

export default HomePage;
