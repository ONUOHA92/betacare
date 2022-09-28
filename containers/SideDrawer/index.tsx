import { Drawer } from "@mui/material";
// import Success from 'components/Success'
// import Cart from 'containers/Cart'
import React from "react";

type Props = {
  isOpen: boolean;
  current: "cart" | "order" | "success";
  handleClose: () => void;
};

const SideDrawer = ({ isOpen, current, handleClose }: Props) => {
  return (
    <Drawer
      variant="temporary"
      anchor="right"
      open={isOpen}
      onClose={handleClose}
      sx={{
        "& .MuiDrawer-paper": {
          paddingX: { xs: "0.5em", md: "2em" },
          paddingY: "2.5em",
          width: { xs: "95vw", md: "30vw" },
        },
      }}
    >
      {/* {current === 'cart' && <Cart />}
      {current === 'order' && <ProductOrder />}
      {current === 'success' && <Success text="Order Created" />} */}
    </Drawer>
  );
};

export default SideDrawer;
