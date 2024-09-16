import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";

const DialogItem = ({ title, data }: IDialogItem) => {
  return (
    <Box display="flex" flexDirection="row" mb={1}>
      <Typography>
        <strong>{title}: </strong>
      </Typography>
      <Box ml={1}>
        {title.toLowerCase() === "birthdate" ? (
          (dayjs.isDayjs(data) ||
            data instanceof Date ||
            typeof data === "string") && (
            <Typography>{dayjs(data).format("DD-MM-YYYY")}</Typography>
          )
        ) : typeof data === "string" || typeof data === "number" ? (
          <Typography>{data.toString()}</Typography>
        ) : Array.isArray(data) ? (
          <Typography>{data.join(", ")}</Typography>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};
export default DialogItem;

interface IDialogItem {
  title: string;
  data: string | string[] | Date;
}
