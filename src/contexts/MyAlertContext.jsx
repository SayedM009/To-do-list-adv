import { createContext, useContext, useState } from "react";
import MyAlert from "../components/MyAlert";

const MyAlertContext = createContext({});

export function MyAlertProvider({ children }) {
  const [alertState, setAlertState] = useState({
    isOpen: false,
    message: "",
  });

  function handleMyAlertOnEvent(message) {
    setAlertState({ isOpen: true, message: message });
    setTimeout(() => {
      setAlertState({ isOpen: false });
    }, 2000);
  }
  return (
    <>
      <MyAlert state={alertState} />
      <MyAlertContext.Provider value={{ handleMyAlertOnEvent }}>
        {children}
      </MyAlertContext.Provider>
    </>
  );
}

export const useMyAlert = () => {
  return useContext(MyAlertContext);
};
