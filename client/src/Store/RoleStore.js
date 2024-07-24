// store.js
import { create } from "zustand";

const useStore = create((set) => ({
  Role: false,

  setUserRole: (newRole) =>
    set(() => {
      return { Role: newRole };
    }),
}));

export default useStore;
