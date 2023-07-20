import { Box, SimpleGrid } from "@mantine/core";
import Image from "next/image";
import { api } from "~/utils/api";

const ImagesGrid = () => {
  const { data } = api.example.getImages.useQuery();

  return (
    <SimpleGrid
      spacing={4}
      cols={4}
      breakpoints={[
        { maxWidth: "62rem", cols: 3, spacing: "md" },
        { maxWidth: "48rem", cols: 2, spacing: "sm" },
        { maxWidth: "36rem", cols: 1, spacing: "sm" },
      ]}
    >
      {data?.map((image, i) => (
        <Box key={i}>
          <Image
            src={image.imageUrl}
            alt={`Image ${i}`}
            width={120}
            height={120}
            layout="responsive"
          />
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default ImagesGrid;
