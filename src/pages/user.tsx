import { Box } from "@mantine/core";
import ImagesGrid from "~/components/ImagesGrid";
import Layout from "~/components/Layout";

export default function UserGrid() {
  return (
    <Box component="main">
      <Layout>
        <ImagesGrid onlyUser={true} onlyFavorite={false} />
      </Layout>
    </Box>
  );
}
