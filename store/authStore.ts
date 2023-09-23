import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { BASE_URL } from "../utils";

const authStore = (set: any) => ({
  userProfile: null,
  addProfile: (profile: any) => set({ userProfile: profile }),
  removeProfile: () => set({ userProfile: null }),

  allProfiles: [],
  // retrieveAllProfiles: async () => {
  //   const res = await axios.get(`${BASE_URL}/api/profile`);
  //   set({ allProfiles: res.data });
  // },
});

const cribStore = (set: any) => ({
  allCribs: [],
  // retrieveAllProfiles: async () => {
  //   const res = await axios.get(`${BASE_URL}/api/crib`);
  //   set({ allCribs: res.data });
  // },
});

export const useAuthStore = create(persist(authStore, { name: "auth" }));
export const useCribStore = create(persist(cribStore, { name: "crib" }));
