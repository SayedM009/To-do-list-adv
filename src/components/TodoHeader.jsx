// MUI
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";
import { TabsContext } from "../contexts/TabsContext";
import { useSearchParams } from "react-router";

// CSS
// If the tab is first element isFirstElement={tabsObject.indexOf(tab) == 0}
// If the tab is last element isLastElement={tabsObject.indexOf(tab) == basicTabsObjects.length - 1}

function TodoHeader() {
  // By default all is active
  const [activeObj, setActiveObj] = useState({
    all: "007BFF",
    basicTarget: "007BFF",
    typedTarget: "",
  });
  // Bring all tabs object from context (Tabs Context)
  const { basicTabsObjects, typedTabsObjects } = useContext(TabsContext);
  // Prepare the basic tabs as elements

  // Complex condition
  // 1.tab.color.slice(1) => that returns tab's color but without #
  // 2.(activeObj.all == activeObj.basicTarget ? activeObj.all : activeObj.basicTarget) => This condition checks if
  //    A. all === basicTarget that means tab called all  is the active tab right now.
  //    B. all !== basicTarget that means there is aonther tab is active right now (done, not done)

  const basicTabsElements = basicTabsObjects.map((tab) => {
    return (
      <BasicTab
        key={tab.color.slice(1)}
        tab={tab}
        isActive={
          tab.color.slice(1) ===
          (activeObj.all == activeObj.basicTarget
            ? activeObj.all
            : activeObj.basicTarget)
        }
        activeObj={activeObj}
        handleOnClick={setActiveObj}
        color={tab.color.slice(1)}
        isFirstElement={basicTabsObjects.indexOf(tab) == 0}
      />
    );
  });

  // Prepare the typed tabs as elements
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
        }
      />
    );
  });

  const allTabs = [...basicTabsElements, ...typeTabsElements];

  return (
    <div>
      {/* Render application heading */}
      <Typography
        variant="h2"
        color="black"
        sx={{ textAlign: "right", fontSize: "3rem" }}
      >
        مهامي
      </Typography>
      {/* Render all tabs */}
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

  function handleTabOnClick(color, valueType, status) {
    if (valueType === "الكل") {
      // Set active on tab's called all and remove active from all tabs (basic tabs & typed tabs)
      handleOnClick({ all: color, basicTarget: color, typedTarget: "" });
    } else {
      // Set active on current basic tabs and remove active from all other tabs (all & done | not done)
      handleOnClick({ ...activeObj, basicTarget: color });
    }

    if (valueType === "الكل") setSearchParams({});
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
    // Set active on current tab and remove active from all other tabs
    handleOnClick({
      ...activeObj,
      typedTarget: color,
      basicTarget:
        activeObj.all === activeObj.basicTarget ? "" : activeObj.basicTarget,
    });

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
