import { ReactNode } from "react";
import { HeaderAction } from "./HeaderAction";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <HeaderAction
        links={[
          { label: "Home", link: "/" },
          { label: "Gerador", link: "/generator" },
        ]}
      />
      {children}
    </>
  );
};

export default Layout;
