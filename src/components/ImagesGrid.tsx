import { Box } from "@mantine/core";
import Image from "next/image";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { api } from "~/utils/api";

const ImagesGrid = () => {
  const { data } = api.example.getImages.useQuery();

  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 4 }}>
      <Masonry gutter="0.5rem">
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
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default ImagesGrid;
