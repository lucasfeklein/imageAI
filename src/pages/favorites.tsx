import { Box } from "@mantine/core";
import FavoriteImagesGrid from "~/components/FavoriteImagesGrid";
import Layout from "~/components/Layout";

export default function FavoriteGrid() {
  return (
    <Box component="main">
      <Layout>
        <FavoriteImagesGrid onlyUser={true} />
      </Layout>
    </Box>
  );
}
