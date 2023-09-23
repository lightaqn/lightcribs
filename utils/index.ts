import axios from "axios";
import jwt_decode from "jwt-decode";

export const BASE_URL = process.env.NEXT_PUBLIC_URL;

export const retrieveOrCreateNew = async (response: any, addProfile: any) => {
  const decrypt: { name: string; picture: string; sub: string } = jwt_decode(
    response.credential
  );
  const { name, picture, sub } = decrypt;

  const profile = {
    _id: sub,
    _type: "profile",
    profileName: name,
    image: picture,
  };
  addProfile(profile);

  // await axios.post(`${BASE_URL}/api/auth`, profile);
};

// const base64Url = response.credential.split('.')[1]
// const base64 = base64Url.replace(/-/g, '+'). replace(/_/g, '/')
// const jsonPayload = decodeURIComponent(
//   atob(base64).split('')
//   .map((c) => { return('%'+ ('00' + c.charCodeAt(0).toString(16)).slice(-2))})

// ).join('')

// const {name,picture,sub} = JSON.parse(jsonPayload)
