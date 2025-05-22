// MUI

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
// REACT

function MyAlert({ state }) {
  const { isOpen, message } = state;
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={isOpen}
        autoHideDuration={6000}
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{
            width: "100%",
            "& .css-vab54s-MuiAlert-icon": {
              marginLeft: ".5rem",
              marginRight: "0",
            },
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default MyAlert;
