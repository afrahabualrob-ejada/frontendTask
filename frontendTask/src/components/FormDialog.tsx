import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/material";
import { IFormInput } from "../types";
import DialogItem from "./DialogItem";

const FormDialog = ({ onClose, open, data }: IFormDialog) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="patient-dialog-data"
      fullWidth
    >
      <DialogTitle id="patient-dialog-data-title" align="center" sx={{fontWeight:"bold"}}>
        PATIENT DATA
      </DialogTitle>
      <Divider />
      <DialogContent>
        {Object.entries(data).map(([key, value]) => (
          <DialogItem
            key={key}
            title={key.charAt(0).toUpperCase() + key.slice(1)}
            data={value}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} autoFocus variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default FormDialog;
interface IFormDialog {
  open: boolean;
  onClose: () => void;
  data: IFormInput;
}
