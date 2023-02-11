import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { SocialIcon } from "react-social-icons";
import { cursor, useTypewriter } from "react-simple-typewriter";

function Download() {
  const inputUrlRef = useRef();
  const [isLoading, setLoading] = useState(false);
  const [urlResult, setUrlResult] = useState("");
  const [musicResult, setMusicResult] = useState("");

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const _data = await axios.get("/api/search?q=" + inputUrlRef.current.value);
    // const _mdata = await axios.get("/api/music?q=" + _data.data._url);
    // setMusicResult(_mdata.data);
    console.log(_data.data);
    setUrlResult(_data.data);
    setLoading(false);
  };
  return (
    <section className="bg-[#1c1b1b]">
      <div className="container mx-auto px-5 py-24 md:flex-row flex-col items-center flex">
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-full">
          <img
            alt="hero"
            className="object-cover object-center rounded pr-8"
            src="https://i.pinimg.com/originals/f8/8a/ca/f88acab7ffd127b4465659500aa0538f.gif"
          ></img>
        </div>
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-4xl mb-4 font-bold text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-orange-400 from-red-600">
              YouTube
            </span>{" "}
            Downloader
          </h1>
          <p className="mb-8 leading-relaxed text-gr">
            YouTube is a global online video sharing and social media platform
            headquartered in San Bruno, California. It was launched on February
            14, 2005, by Steve Chen, Chad Hurley, and Jawed Karim. It is owned
            by Google, and is the second most visited website, after Google
            Search.
          </p>
          <div className="flex w-full md:justify-start justify-center items-end">
            <div className="relative mr-4 md:w-full lg:w-full xl:w-1/2 w-2/4">
              <form onSubmit={handleSubmit}>
                <input
                  required
                  type="text"
                  id="hero-field"
                  name="hero-field"
                  ref={inputUrlRef}
                  placeholder="YouTube url or Song name..."
                  className="w-full bg-gray-800 rounded border bg-opacity-50 border-gray-300 focus:ring-2 focus:ring-neutral-600 focus:bg-transparent focus:border-emerald-500 text-base outline-none text-gray-100 py-1 px-2 leading-8 transition-colors duration-200 ease-in-out"
                ></input>

                {isLoading ? (
                  <button
                    disabled
                    type="button"
                    className="mt-2 text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-1 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800 inline-flex items-center"
                  >
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-4 h-4 mr-3 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                    Loading...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="mt-2 inline-flex text-white bg-neutral-600 border-0 py-2 px-6 focus:outline-none hover:bg-neutral-700 rounded text-lg"
                  >
                    Search
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Download;