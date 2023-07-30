import { Box, Overlay } from "@mantine/core";
import Image from "next/image";
import { useContext } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { api } from "~/utils/api";
import { BlurImagesContext } from "./BlurImagesProvider";

interface ImagesGridProps {
  onlyUser: boolean;
}

const ImagesGrid: React.FC<ImagesGridProps> = ({ onlyUser }) => {
  const { isBlur } = useContext(BlurImagesContext);

  const { data } = api.example.getImages.useQuery({
    onlyUser,
  });

  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 4 }}>
      <Masonry gutter="0.5rem">
        {data?.map((image, i) => (
          <Box key={i} sx={{ position: "relative" }}>
            <Image
              src={image.imageUrl}
              alt={`Image ${i}`}
              width={120}
              height={120}
              layout="responsive"
            />
            {isBlur && <Overlay blur={40}></Overlay>}
          </Box>
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default ImagesGrid;
