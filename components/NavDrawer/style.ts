import { COLORS } from "utils/config/colors";

export const getStartedButtonDrawer = {
    padding: "2% 10%",
    backgroundColor: COLORS.backgroundImageBlack,

    border: `1px solid ${COLORS.whiteColor}`,
      color: COLORS.whiteColor,
    borderRadius: '12px',
    textTransform:"capitalize",
    '&:hover': {
      backgroundColor: COLORS.primaryBlue,
      color: COLORS.whiteColor,
  },
  }

export const drawerStyle = { height: '100vh', width: { xs: '70vw', sm: '50vw' } }