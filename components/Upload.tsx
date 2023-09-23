import type { NextPage } from "next";
import { useState, useEffect, useRef } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/router";
import { useAuthStore } from "../store/authStore";
import { SanityAssetDocument } from "@sanity/client";
import { client } from "../utils/client";
import { niches } from "../utils/constants";
import Link from "next/link";
import Image from "next/image";

const Upload: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [uploadAsset, setUploadAsset] = useState<
    SanityAssetDocument | undefined
  >();
  const [faultyFileType, setFaultyFileType] = useState(false);
  const [caption, setCaption] = useState("");
  const [cat, setCat] = useState(niches[0]);
  const router = useRouter();
  const { userProfile } = useAuthStore();

  const uploadVideo = (e: any) => {
    const chosenFile = e.target.Files[0];
    const fileFormat = ["video/mp4", "video/webm", "video/ogg"];
    if (fileFormat.includes(chosenFile.type)) {
      setLoading(true);
      client.assets.upload("file", chosenFile, {
        contentType: chosenFile.type,
        filename: chosenFile.name,
      });
      setUploadAsset(data);
      setLoading(false);
    } else {
      setFaultyFileType(true);
    }
  };

  return (
    <div className="flex h-full mb-10 ">
      <div className="absolute left-0 top-[70px] rounded-lg pt-10 lg:pt-20 lg:p-14  bg-white flex flex-wrap justify-center lg:h-[80vh] ">
        <div></div>
        <p className="font-bold text-2xl">Upload</p>
        <p className="font-bold text-gray-500 mt-2 text-md">Post Videos Now</p>
      </div>
      <div className="flex flex-col h-[250px] w-[250px] border-4 border-dashed border-gray-500 cursor-pointer item-center justify-center p-10 hover:border-red-300 hover:bg-gray-100 mt-10">
        {loading ? (
          <div></div>
        ) : (
          <div>
            {uploadAsset ? (
              <div>
                <video
                  src={uploadAsset.url}
                  loop
                  controls
                  className="h-[400px] my-20 rounded-xl bg-black/30 backdrop-blur-xl "
                />
              </div>
            ) : (
              <div>
                <label className="cursor-pointer">
                  <div className="flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center h-full">
                      <p className="font-bold text-lg">
                        <FaCloudUploadAlt className="text-gray-300 text-6xl" />
                      </p>
                      <p className="font-semibold text-xl">Upload</p>
                      <p>
                        Accepts mp4/webm/ogg <br />
                        Minimum Resolution: 720x1280 <br />
                        Max Duration: 10mins <br />
                        Max Filesize: 2GB <br />
                      </p>
                      <p className="button"> Upload</p>
                    </div>
                  </div>
                  <input
                    type="file"
                    name="upload"
                    onChange={uploadVideo}
                    className="h-0 w-0"
                  />
                </label>
                {faultyFileType && (
                  <p className="text-center text-xl text-red-500 font-bold mt-10 w-[200px]">
                    Chose a Video File
                  </p>
                )}
              </div>
            )}

            <div className="flex flex-col gap-4">
              <label className="text-md font-medium">Caption</label>
              <input
                type="text"
                value={caption}
                className="rounded-2xl outline-none text-md border-gray-500 hover:border-amber-200"
                onChange={(e) => setCaption(e.target.value)}
              />

              <select
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className="outline-none uppercase rounded cursor-pointer bg-white border-b-2 p-4 text-gray-500"
              >
                {niches.map((niche) => (
                  <option key={niche.name}>{niche.name}</option>
                ))}
              </select>
              <div className="flex border-gray">
                <button>Cancel</button>
                <button>Send</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;

export const getStaticProps = async (context: any) => {};
