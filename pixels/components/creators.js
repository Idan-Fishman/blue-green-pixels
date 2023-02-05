import { Typography } from "@mui/material";

export const Creators = (props) => {
  const { creators } = props;

  return (
    <>
      {creators.map((creator) => (
        <Typography key={creator.ssn}>
          {creator.name} {creator.ssn}
        </Typography>
      ))}
    </>
  );
};

export default Creators;
