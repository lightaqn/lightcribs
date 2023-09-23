import React, { FC, useState } from "react";
import { useRouter } from "next/router";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { useAuthStore } from "../store/authStore";
import { retrieveOrCreateNew } from "../utils/index";
import { AiOutlineLogout } from "react-icons/ai";
import { IAuth } from "../typings";

interface IProps {
  useAuthStore: IAuth;
}

const GoogleSignIn: FC<IProps> = (props) => {
  const router = useRouter();
  const { addProfile, userProfile, removeProfile }: any = useAuthStore();

  return (
    <div>
      {userProfile ? (
        <div>
          <p>{userProfile?.profileName}</p>

          <button
            type="button"
            className="button"
            onClick={() => {
              googleLogout(), removeProfile();
            }}
          >
            <AiOutlineLogout color="red" fontSize={25} />
          </button>
        </div>
      ) : (
        <div>
          <GoogleLogin
            onSuccess={(response) => retrieveOrCreateNew(response, addProfile)}
            onError={() => console.error("..Login Error")}
          ></GoogleLogin>
        </div>
      )}
    </div>
  );
};
export default GoogleSignIn;
