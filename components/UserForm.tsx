import React, { useState, FC, useRef, SetStateAction } from "react";
import { useAuthStore } from "../store/authStore";
import { useRouter } from "next/router";
import { BASE_URL } from "../utils";
import { SanityAssetDocument } from "@sanity/client";
import { client } from "../utils/client";
import axios from "axios";
import { niches } from "../utils/constants";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IProfile } from "../typings";

interface IProps {}

const UserForm: FC<IProps> = () => {
  const { userProfile }: IProfile | any = useAuthStore();
  const [formInput, setFormInput] = useState({
    id: "",
    caption: "",
    description: "",
    address: "",
    BR: 0,
    BTH: 0,
    form: "",
    price: 0,
    securityDeposit: 0,
    wheelchairAccessibility: "",
    pet: "",
    entrance: "",
    maxGuestsAllowed: 0,
    maxNoOfNights: 0,
    niche: niches[0].name,
  });
  const [uploadAsset, setUploadAsset] = useState<
    SanityAssetDocument | undefined
  >();
  const [file, setFile] = useState<SetStateAction<HTMLInputElement | any>>();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [faultyFileType, setFaultyFileType] = useState(false);
  const router = useRouter();

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormInput({ ...formInput, [name]: value });
    // setFormInput((prev) => {
    //   return { ...prev, [name]: value };
    // });
  };
  const uploadVideo = (e: any) => {
    const chosenFile = e.target.files[0];
    const fileFormat = ["video/mp4", "video/webm", "video/ogg"];
    if (fileFormat.includes(chosenFile.type)) {
      setLoading(true);
      client.assets
        .upload("file", chosenFile, {
          contentType: chosenFile.type,
          filename: chosenFile.name,
        })
        .then((res) => {
          setUploadAsset(res.data);
          setLoading(false);
        });
    } else {
      setFaultyFileType(true);
    }
  };

  const handleSubmit = async () => {
    if (formInput && uploadAsset?._id && file && userProfile) {
      setSaving(true);
      const document = {
        _type: "crib",
        _id: formInput.id,
        caption: formInput.caption,
        description: formInput.description,
        images: file,
        price: formInput.price,
        securityDeposit: formInput.securityDeposit,
        br: formInput.BR,
        bth: formInput.BTH,
        form: formInput.form,
        pet: formInput.pet,
        wheelchairAccessibility: formInput.wheelchairAccessibility,
        entrance: formInput.entrance,
        maxGuestsAllowed: formInput.maxGuestsAllowed,
        maxNoOfNights: formInput.maxNoOfNights,
        niche: formInput.niche,
        video: {
          _type: "file",
          asset: { _type: "reference", _ref: uploadAsset._id },
        },
        profileId: userProfile?._id,
        author: { _type: "author", _ref: userProfile._id },
      };

      await axios
        .post(`${BASE_URL}/api/crib`, { document })
        .then((response) => response.data.status)
        .catch((err) => console.error(err));
      router.push("/");
    } else {
      setSaving(false);
      console.error("saving error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-full w-full p-5 m-10 flex flex-col bg-transparent hover:bg-gray-200 rounded-2xl overflow-hidden"
    >
      <div className="p-5 m-5 space-y-10">
        {loading ? (
          <div>...Loading Spinner</div>
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
          </div>
        )}

        <div className="border border-dashed border-gray-500 rounded-2xl items-center justify-center p-5 cursor-pointer">
          <input
            type="file"
            id="file"
            className="h-0 cursor-pointer"
            value={file}
            onChange={(e: React.ChangeEvent<HTMLInputElement> | any) =>
              setFile(e.target.files[0])
            }
          />
          <p className="font-bold text-3xl text-center">+</p>
          <p className="mb-5 pb-5 text-center">
            Click to Add or Drag and Drop your Image here
          </p>
        </div>
        <div className="flex flex-col w-1/2">
          <label className="text-md font-medium"> Caption</label>
          <input
            name="caption"
            type="text"
            className="outline-none border-none p-5 text-gray-500 text-lg rounded-lg ring-0 active:bg-gray-100 active:border-teal-500"
            placeholder="caption"
            value={formInput.caption}
            maxLength={70}
            onChange={handleChange}
          />
          <label className="text-md font-medium"> Address </label>
          <input
            type="text"
            name="address"
            className="outline-none border-none p-5 text-gray-500 text-lg rounded-lg ring-0 active:bg-gray-100 active:border-teal-500"
            placeholder="Address"
            value={formInput.address}
            maxLength={50}
            onChange={handleChange}
          />
          <label className="text-md font-medium"> Description </label>
          <textarea
            name="description"
            rows={5}
            placeholder="Description"
            className="outline-none border-none p-5 text-gray-500 text-lg rounded-lg ring-0 active:bg-gray-100 active:border-teal-500"
            value={formInput.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="flex space-y-5 flex-col">
          <label className="text-md font-medium"> Bedrooms </label>
          <input
            name="BR"
            type="number"
            className="outline-none border-none p-5 text-gray-500 text-lg rounded-lg ring-0 active:bg-gray-100 active:border-teal-500"
            value={formInput.BR}
            onChange={handleChange}
            placeholder="Number of Bedrooms"
          />
          <label className="text-md font-medium"> Bathrooms </label>
          <input
            name="BTH"
            type="number"
            className="outline-none border-none p-5 text-gray-500 text-lg rounded-lg ring-0 active:bg-gray-100 active:border-teal-500"
            value={formInput.BTH}
            onChange={handleChange}
            placeholder="Number of Bathrooms"
          />
        </div>

        <div className="flex space-x-5 my-5">
          <label className="text-md font-medium"> Form </label>
          <select
            className="outline-none border-none p-5 text-gray-500 text-lg rounded-lg ring-0 active:bg-gray-100 active:border-teal-500"
            name="form"
            onChange={handleChange}
            value={formInput.form}
          >
            <option disabled>Form</option>
            <option>House</option>
            <option>Condo</option>
            <option>TownHouse</option>
            <option>Studio</option>
          </select>
          <label className="text-md font-medium"> Pet Policy</label>
          <select
            className="outline-none border-none p-5 text-gray-500 text-lg rounded-lg ring-0 active:bg-gray-100 active:border-teal-500"
            name="pet"
            onChange={handleChange}
            value={formInput.pet}
          >
            <option disabled>Pet</option>
            <option>Cat</option>
            <option>Dog</option>
            <option>Both</option>
            <option>None</option>
          </select>
        </div>

        <div className="flex space-y-5 flex-col">
          <label className="text-md font-medium">
            {" "}
            WheelChair Accesibility
          </label>
          <select
            className="outline-none border-none p-5 text-gray-500 text-lg rounded-lg ring-0 active:bg-gray-100 active:border-teal-500"
            name="wheelchairAccessibility"
            onChange={handleChange}
            value={formInput.wheelchairAccessibility}
          >
            <option disabled> WheelChair Accessibility</option>
            <option>Yes</option>
            <option>No</option>
          </select>
          <label className="text-md font-medium"> Entrance</label>
          <select
            className="outline-none border-none p-5 text-gray-500 text-lg rounded-lg ring-0 active:bg-gray-100 active:border-teal-500"
            name="entrance"
            onChange={handleChange}
            value={formInput.entrance}
          >
            <option disabled>Entrance</option>
            <option>Key</option>
            <option>Access Code</option>
          </select>

          <label className="text-md font-medium">
            {" "}
            Maximum Guests Allowed{" "}
          </label>
          <input
            name="maxGuestsAllowed"
            type="number"
            className="outline-none border-none p-5 text-gray-500 text-lg rounded-lg ring-0 active:bg-gray-100 active:border-teal-500"
            value={formInput.maxGuestsAllowed}
            onChange={handleChange}
            placeholder="Maximum Number of Guests"
            maxLength={25}
          />
          <label className="text-md font-medium">
            {" "}
            Maximum Number of Nights{" "}
          </label>
          <input
            name="maxNoOfNights"
            type="number"
            className="outline-none border-none p-5 text-gray-500 text-lg rounded-lg ring-0 active:bg-gray-100 active:border-teal-500"
            value={formInput.maxNoOfNights}
            onChange={handleChange}
            placeholder="Maximum Number of Nights"
            maxLength={100}
          />
          <select
            value={formInput.niche}
            onChange={handleChange}
            className="outline-none uppercase rounded cursor-pointer bg-white border-b-2 p-4 text-gray-500"
          >
            {niches.map((niche) => (
              <option key={niche.name}>{niche.name}</option>
            ))}
          </select>
        </div>
        <div className="flex space-x-5 mt-10">
          <button
            onClick={handleSubmit}
            type="submit"
            className="button bg-white text-teal-500"
          >
            Send
          </button>
          <button
            onClick={() =>
              setFormInput({
                id: "",
                caption: "",
                description: "",
                address: "",
                BR: 0,
                BTH: 0,
                form: "",
                price: 0,
                securityDeposit: 0,
                wheelchairAccessibility: "",
                pet: "",
                entrance: "",
                maxGuestsAllowed: 0,
                maxNoOfNights: 0,
                niche: niches[0].name,
              })
            }
            type="submit"
            className="button bg-teal-500 text-white font-bold"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};
export default UserForm;
