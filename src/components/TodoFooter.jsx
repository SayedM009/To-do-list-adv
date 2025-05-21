// MUI
import Button from "@mui/material/Button";
// REACT
import { useState } from "react";
// COMPONENT
import MyModal from "./MyModal";

function TodoFooter() {
  const [isOpen, setIsOpen] = useState(false);
  const [toDoDetails, setToDoDetails] = useState({
    title: "",
    description: "",
    type: "",
  });

  return (
    <div>
      <MyModal
        type="add"
        actionBtnTitle="إضافة"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        toDoDetails={toDoDetails}
        setToDoDetails={setToDoDetails}
      />
      <Button
        onClick={() => setIsOpen(true)}
        sx={{ width: "100%", marginTop: "1rem" }}
        variant="contained"
        size="large"
      >
        أضف من هنا
      </Button>
    </div>
  );
}

export default TodoFooter;
