// MUI
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";
import { TabsContext } from "../contexts/TabsContext";

function TodoHeader() {
  const [active, setActive] = useState("007BFF");
  const tabsObjects = useContext(TabsContext);

  const tabsElements = tabsObjects.map((tab) => {
    return (
      <Tab
        key={tab.color.slice(1)}
        tab={tab}
        active={tab.color.slice(1) === active}
        handleOnClick={setActive}
        index={tab.color.slice(1)}
        isFirstElement={tabsObjects.indexOf(tab) == 0}
        isLastElement={tabsObjects.indexOf(tab) == tabsObjects.length - 1}
      />
    );
  });

  return (
    <div>
      <Typography
        variant="h2"
        color="black"
        sx={{ textAlign: "right", fontSize: "3rem" }}
      >
        مهامي
      </Typography>

      <ul className="flex select-none my-5">{tabsElements}</ul>
    </div>
  );
}

function Tab({
  tab,
  active,
  handleOnClick,
  index,
  isFirstElement,
  isLastElement,
}) {
  const [hover, setHover] = useState(false);
  return (
    <li
      key={tab.color.slice(1)}
      className={`p-2 w-2xl cursor-pointer  transition-all font-medium border-[.5px] border-gray-200 border-r-0 
        ${isFirstElement && "border-r-[1px] rounded-tr-lg rounded-br-lg"}
        ${isLastElement && "border-r-0 rounded-tl-lg rounded-bl-lg"}
      `}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => handleOnClick(index)}
      style={{
        background: `${hover || active ? tab.color : "white"}`,
        color: `${hover || active ? "white" : "black"}`,
      }}
    >
      {tab.title}
    </li>
  );
}

export default TodoHeader;
