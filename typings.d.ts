// interface Cribs {
//   input: string;
//   id: string;
//   caption: string;
//   BR: number;
//   BTH: number;
//   form: string;
//   pet: string;
//   maxGuestsAllowed: number;
//   price: number;
//   securityDeposit: number;
//   maxNoOfNights: number;
//   ownersDetails: {
//     name: string;
//     phoneNo: number;
//     verified: string;
//   };

//   long: number;
//   lat: number;
//   images: string[];
//   address: {
//     street: string;
//     city: string;
//     zipcode: number;
//   };
//   wheelchairAccessibility: string;
//   entrance: string;
//   Description: string;
// }

// confirm if it is id or _id from data returned
export interface Crib {
  id: string;
  caption: string;
  description: string;
  images: string[];
  price: number;
  securityDeposit: number;
  br: number;
  bth: number;
  form: string;
  pet: boolean;
  wheelchairAccessibility: boolean;
  entrance: string;
  maxGuestsAllowed: number;
  maxNoOfNights: number;
  author: { _id: string; profileName: string; image: string };
  address: string;
  video: { _id: string; url: string };
  likes: {
    author: {
      _id: string;
      profileName: string;
      image: string;
    };
  }[];
  reviews: {
    review: string;
    _key: string;
    author: { _ref: string };
  }[];
  profileId: string;
  niche: string;
}

export interface IAuth {
  userProfile: null;
  addProfile: (profile: any) => any;
  removeProfile: () => any;
  retrieveAllProfiles: () => Promise<void>;
  allProfiles: any;
}

export interface IProfile {
  _id: string;
  image: string;
  _type: string;
  profileName: string;
}

export interface IReview {
  _key: string;
  length?: number;
  review: string;
  author: { _ref: string };
  _id: string;
}
