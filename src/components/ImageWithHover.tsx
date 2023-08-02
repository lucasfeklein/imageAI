import { Box, Overlay } from "@mantine/core";
import { Image as ImageModel } from "@prisma/client";
import { IconHeart } from "@tabler/icons-react";
import Image from "next/image";
import { useContext, useState } from "react";
import { BlurImagesContext } from "./BlurImagesProvider";

const ImageWithHover = ({ image }: { image: ImageModel }) => {
  const { isBlur } = useContext(BlurImagesContext);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <Box
        key={image.id}
        sx={{ position: "relative" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={image.imageUrl!}
          alt={`Image ${image.id}`}
          width={120}
          height={120}
          layout="responsive"
        />
        {isBlur && <Overlay blur={40}></Overlay>}
        {isHovered && !isBlur && (
          <IconHeart
            size={40}
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              padding: "4px",
              borderRadius: "4px",
              zIndex: 1,
            }}
          />
        )}
      </Box>
    </>
  );
};

export default ImageWithHover;
