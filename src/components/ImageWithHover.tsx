import { Box, Overlay } from "@mantine/core";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useContext, useState } from "react";
import { RouterOutputs, api } from "~/utils/api";
import { BlurImagesContext } from "./BlurImagesProvider";

type ImageWithFavorites = RouterOutputs["example"]["getImages"]["items"][0];

const ImageWithHover = ({ image }: { image: ImageWithFavorites }) => {
  const { isBlur } = useContext(BlurImagesContext);
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(
    image.favorites.length > 0
  );

  const { data: sessionData } = useSession();

  const favoriteImage = api.example.favoriteImage.useMutation();

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    favoriteImage.mutate({ imageId: image.id });
  };

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
        {isHovered && !isBlur && sessionData && !isFavorite && (
          <IconHeart
            onClick={handleFavorite}
            size={40}
            style={{
              cursor: "pointer",
              position: "absolute",
              bottom: 0,
              right: 0,
              zIndex: 1,
            }}
          />
        )}
        {isFavorite && (
          <IconHeartFilled
            onClick={handleFavorite}
            size={40}
            style={{
              color: "red",
              cursor: "pointer",
              position: "absolute",
              bottom: 0,
              right: 0,
              zIndex: 1,
            }}
          />
        )}
      </Box>
    </>
  );
};

export default ImageWithHover;
