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
import { TestIDs } from "../TestIDs";

const FormDataDialog = ({ onClose, open, data }: IFormDataDialog) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="patient-dialog-data"
      fullWidth
      data-testid={TestIDs.formDataDialog}
    >
      <DialogTitle
        id="patient-dialog-data-title"
        align="center"
        sx={{ fontWeight: "bold" }}
        data-testid={TestIDs.dialogHeader}
      >
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
        <Button
          onClick={onClose}
          autoFocus
          variant="outlined"
          data-testid={TestIDs.dialogCloseButton}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default FormDataDialog;
interface IFormDataDialog {
  open: boolean;
  onClose: () => void;
  data: IFormInput;
}
