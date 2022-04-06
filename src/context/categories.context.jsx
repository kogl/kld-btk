import { createContext, useState, useEffect } from "react";

import { getCategoriesandDocuments } from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext({
  categoriesMap: {},
});
export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    const getCategoriesmap = async () => {
      const categoryMap = await getCategoriesandDocuments();
      setCategoriesMap(categoryMap);
    };
    getCategoriesmap();
  }, []);

  const value = { categoriesMap };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
