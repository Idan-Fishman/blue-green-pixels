import { Typography } from "@mui/material";

export const Status = (props) => {
  const { status } = props;

  return (
    <Typography variant="h6" component="h2">
      Blue {100 - status}% - Green {status}%
    </Typography>
  );
};

export default Status;
