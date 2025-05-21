// GENERAL CSS RULES YOU WILL FIND IT DOWN BELOW
// 1. If the tab is first element isFirstElement={tabsObject.indexOf(tab) == 0}
// 2. If the tab is last element isLastElement={tabsObject.indexOf(tab) == basicTabsObjects.length - 1}

// MUI
import Typography from "@mui/material/Typography";
// REACT
import { useContext, useState } from "react";
import { useSearchParams } from "react-router";
// CONTEXT
import { TabsContext } from "../contexts/TabsContext";

function TodoHeader() {
  // DEFAULT THE TAB CALLED ALL IS ACTIVE
  const [activeObj, setActiveObj] = useState({
    all: "007BFF",
    basicTarget: "007BFF",
    typedTarget: "",
  });
  // BRING & COMPAIN BASIC AND TYPED OBJECT FROM TABS CONTEXT
  const { basicTabsObjects, typedTabsObjects } = useContext(TabsContext);

  // COMPLEX CONDITION WILL FIND IT BELOW
  // 3.tab.color.slice(1) => that returns tab's color but without #
  // 4.(activeObj.all == activeObj.basicTarget ? activeObj.all : activeObj.basicTarget) => This condition checks if
  //    A. all === basicTarget that means tab called all  is the active tab right now.
  //    B. all !== basicTarget that means there is aonther tab is active right now (done, not done)

  // PREPARE BASIC TABS AS ELEMENTS
  const basicTabsElements = basicTabsObjects.map((tab) => {
    return (
      <BasicTab
        key={tab.color.slice(1)} // 3.
        tab={tab}
        isActive={
          tab.color.slice(1) ===
          (activeObj.all == activeObj.basicTarget
            ? activeObj.all
            : activeObj.basicTarget) // 4. (A,B)
        }
        activeObj={activeObj}
        handleOnClick={setActiveObj}
        color={tab.color.slice(1)}
        isFirstElement={basicTabsObjects.indexOf(tab) == 0} // 1.
      />
    );
  });

  // PREPARE TYPED TABS AS ELEMENTS
  const typeTabsElements = typedTabsObjects.map((tab) => {
    return (
      <TypedTab
        key={tab.color.slice(1)}
        tab={tab}
        isActive={tab.color.slice(1) === activeObj.typedTarget}
        activeObj={activeObj}
        handleOnClick={setActiveObj}
        color={tab.color.slice(1)}
        isLastElement={
          typedTabsObjects.indexOf(tab) == typedTabsObjects.length - 1
        } // 2.
      />
    );
  });

  // COMPAIN BASIC & TYPED TABS IN ONE VARIABLE
  const allTabs = [...basicTabsElements, ...typeTabsElements];

  return (
    <div>
      {/* RENDER THE APP HEADING */}
      <Typography
        variant="h2"
        color="black"
        sx={{ textAlign: "right", fontSize: "3rem" }}
      >
        مهامي
      </Typography>
      {/* RENDER COMPAINED TABS TOGTHER*/}
      <ul className="flex select-none my-5">{allTabs}</ul>
    </div>
  );
}

function BasicTab({
  tab,
  isActive,
  activeObj,
  handleOnClick,
  color,
  isFirstElement,
}) {
  const [hover, setHover] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  // FUNCTION TO HANDLE CLICKS ON TABS
  function handleTabOnClick(color, valueType, status) {
    if (valueType === "الكل") {
      // Set active on a tab  called all and remove active from all tabs (basic tabs & typed tabs)
      handleOnClick({ all: color, basicTarget: color, typedTarget: "" });
      setSearchParams({});
    } else {
      // Set active on current basic tabs and remove active from all other tabs (all & done | not done)
      handleOnClick({ ...activeObj, basicTarget: color });
    }
    // Set is complated search param based on click tab (done | not done)
    if (valueType === "منجز" || valueType === "غير منجز") {
      setSearchParams({ isComplated: status, type: searchParams.get("type") });
    }
  }
  return (
    <li
      key={tab.color.slice(1)}
      className={`p-2 w-2xl cursor-pointer  transition-all font-medium border-[.5px] border-gray-200 border-r-0 
        ${isFirstElement && "border-r-[1px] rounded-tr-lg rounded-br-lg"}
        
      `}
      // Hover behavior
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: `${hover || isActive ? tab.color : "white"}`,
        color: `${hover || isActive ? "white" : "black"}`,
      }}
      // Hover behavior
      onClick={() => handleTabOnClick(color, tab.title, tab?.isComplated)}
    >
      {tab.title}
    </li>
  );
}

function TypedTab({
  tab,
  isActive,
  activeObj,
  handleOnClick,
  color,
  isLastElement,
}) {
  const [hover, setHover] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  function handleTabOnClick(color, valueType) {
    // Set active on current tab and remove active from all other tabs (personal, work, hoppies)
    handleOnClick({
      ...activeObj,
      typedTarget: color,
      basicTarget:
        activeObj.all === activeObj.basicTarget ? "" : activeObj.basicTarget,
    });
    // Set type search param based on click type (personal, work, hoppies)
    setSearchParams({
      isComplated: searchParams.get("isComplated"),
      type: valueType,
    });
  }
  return (
    <li
      key={tab.color.slice(1)}
      className={`p-2 w-2xl cursor-pointer  transition-all font-medium border-[.5px] border-gray-200 border-r-0 
        ${isLastElement && "border-r-0 rounded-tl-lg rounded-bl-lg"}
      `}
      // Hover behavior
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: `${hover || isActive ? tab.color : "white"}`,
        color: `${hover || isActive ? "white" : "black"}`,
      }}
      // Hover behavior
      onClick={() => handleTabOnClick(color, tab.title, tab.isComplated)}
    >
      {tab.title}
    </li>
  );
}

export default TodoHeader;
