import { Box, Grid } from "@mui/material";
import Pixel from "@/components/pixel";

export const PixelsGrid = (props) => {
  const { blue_color, green_color, pixels_order } = props;

  return (
    <Box width="600px">
      <Grid container columns={10} spacing={1}>
        {pixels_order.map((pixel, index) => (
          <Grid key={index} item xs={1}>
            {pixel === "b" ? (
              <Pixel {...blue_color} />
            ) : (
              <Pixel {...green_color} />
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PixelsGrid;
