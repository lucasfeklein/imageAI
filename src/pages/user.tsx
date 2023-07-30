import { Box } from "@mantine/core";
import ImagesGrid from "~/components/ImagesGrid";
import Layout from "~/components/Layout";
import { api } from "~/utils/api";

export default function UserGrid() {
  const utils = api.useContext();

  return (
    <Box component="main">
      <Layout>
        <ImagesGrid onlyUser={true} />
      </Layout>
    </Box>
  );
}
