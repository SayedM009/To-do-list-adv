import { createContext, useContext } from "react";

const TabsContext = createContext({});
// BASIC TABS OBJECT FOR  (ALL, DONE, NOT DONE)
const basicTabsObjects = [
  { title: "الكل", color: "#007BFF", accent: "rgba(0, 123, 255, .3)" },
  {
    title: "منجز",
    color: "#28A745",
    accent: "rgba(40, 167, 69, .3)",
    isComplated: true,
  },
  {
    title: "غير منجز",
    color: "#FFC107",
    accent: "rgba(255, 193, 7, .3)",
    isComplated: false,
  },
];

// TYPED TABS OBJECT FOR REST OF TABS (PERSONAL, WORK & HOPPIES)
const typedTabsObjects = [
  { title: "شخصى", color: "#8356d5", accent: "rgba(131, 86, 213, .3)" },
  { title: "عمل", color: "#1B4F72", accent: "rgba(27, 79, 114, .3)" },
  { title: "هوايات", color: "#20C997", accent: "rgba(32, 201, 151,.3)" },
];

export const TabsProvider = ({ children }) => {
  return (
    <TabsContext.Provider value={{ basicTabsObjects, typedTabsObjects }}>
      {children}
    </TabsContext.Provider>
  );
};

export function useTabs() {
  return useContext(TabsContext);
}
