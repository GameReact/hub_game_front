import { Alert, AlertColor, Slide, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";

function SnackbarAlert(props: {
  text: string;
  color: AlertColor;
  open: boolean;
}) {
  const [open, setOpen] = useState<boolean>(props.open);

  useEffect(() => {
    setOpen(props.open);
  }, [props]);


  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      autoHideDuration={3000}
      onClose={() => setOpen(false)}
      TransitionComponent={(props) => <Slide {...props} direction="left" />}
    >
      <Alert severity={props.color} onClose={() => setOpen(false)} variant="filled">
        {props.text}
      </Alert>
    </Snackbar>
  );
}

export default SnackbarAlert;
