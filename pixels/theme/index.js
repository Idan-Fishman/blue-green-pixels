import { createTheme, responsiveFontSizes } from "@mui/material/styles";

import { baseThemeOptions } from "./base-theme-options";
import { lightThemeOptions } from "./light-theme-options";

const baseTheme = createTheme(baseThemeOptions, lightThemeOptions);
export const theme = responsiveFontSizes(baseTheme);

export default theme;
