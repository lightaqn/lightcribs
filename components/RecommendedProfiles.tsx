import React, { FC, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import Link from "next/link";
import Image from "next/image";

interface IProfile {
  _id: string;
  image: string;
  _type: string;
  profileName: string;
}

interface IProps {}

const RecommendedProfiles: FC<IProps> = (props) => {
  const { retrieveAllProfiles, allProfiles, userProfile } = useAuthStore();

  useEffect(() => {
    retrieveAllProfiles();
  }, [retrieveAllProfiles]);

  return (
    <div className="">
      {/* map profiles and query trending cribs from sanity */}
      {allProfiles?.slice(0, 10).map((profile: IProfile) => (
        <Link href={`/profile/${profile._id}`} key={profile._id}>
          <Image src={profile.image} />
        </Link>
      ))}
    </div>
  );
};
export default RecommendedProfiles;
