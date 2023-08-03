import { Box } from "@mantine/core";
import { ReactNode } from "react";
import { HeaderAction } from "./HeaderAction";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Box sx={{ marginTop: "100px" }}>
      <HeaderAction
        links={[
          { label: "Home", link: "/" },
          { label: "Generator", link: "/generator" },
        ]}
      />
      {children}
    </Box>
  );
};

export default Layout;
