// MUI
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  color: "black",
};

function TodoFooter({ onAddToDo }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [toDoInfo, setToDoInfo] = useState({
    title: "",
    description: "",
    type: "",
  });

  function handleOnClick() {
    const todo = {
      id: uuidv4(),
      ...toDoInfo,
      creationTime: new Date().toLocaleString(),
      endingTime: "",
      isComplated: false,
    };

    // Passing Todo Object
    onAddToDo(todo);

    // Closing the modal
    handleClose();
  }

  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{ width: "100%" }}
        variant="contained"
        size="large"
      >
        أضف من هنا
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              المهمة
            </Typography>
            <TextField
              id="outlined-basic"
              label="عنوان المهمة"
              variant="outlined"
              fullWidth
              dir="rtl"
              sx={{ marginTop: "1rem", marginBottom: "1rem" }}
              onChange={(e) =>
                setToDoInfo({ ...toDoInfo, title: e.target.value })
              }
            />
            <TextField
              id="outlined-basic"
              label="تفاصيل المهمة"
              variant="outlined"
              fullWidth
              dir="rtl"
              sx={{ marginTop: "1rem", marginBottom: "1rem" }}
              onChange={(e) =>
                setToDoInfo({ ...toDoInfo, description: e.target.value })
              }
            />

            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "1rem",
              }}
              onChange={(e) =>
                setToDoInfo({ ...toDoInfo, type: e.target.value })
              }
            >
              <FormControlLabel
                value="شخصي"
                control={<Radio sx={{ paddingRight: "0" }} />}
                label="شخصي"
                sx={{ margin: "0" }}
              />
              <FormControlLabel
                value="عمل"
                control={<Radio sx={{ paddingRight: "0" }} />}
                label="عمل"
                sx={{ margin: "0" }}
              />
              <FormControlLabel
                value="هوايات"
                control={<Radio sx={{ paddingRight: "0" }} />}
                label="هوايات"
                sx={{ margin: "0" }}
              />
            </RadioGroup>

            <Button
              onClick={handleOnClick}
              sx={{ width: "100%" }}
              variant="contained"
              size="large"
            >
              إضافة
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default TodoFooter;
