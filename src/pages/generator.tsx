import { Box } from "@mantine/core";
import Layout from "~/components/Layout";

const Generator = () => {
  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 3.75rem)",
        }}
      >
        <Box
          sx={{
            width: "50%",
            height: "100%",
          }}
        >
          Inputs
        </Box>
        <Box
          sx={{
            width: "50%",
            height: "100%",
          }}
        >
          Image
        </Box>
      </Box>
    </Layout>
  );
};

export default Generator;
