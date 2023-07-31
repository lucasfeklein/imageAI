import { Box, Loader, Overlay, Skeleton } from "@mantine/core";
import Image from "next/image";
import { useContext, useEffect } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { api } from "~/utils/api";
import { BlurImagesContext } from "./BlurImagesProvider";

interface ImagesGridProps {
  onlyUser: boolean;
}

const ImagesGrid: React.FC<ImagesGridProps> = ({ onlyUser }) => {
  const { isBlur } = useContext(BlurImagesContext);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    api.example.getImages.useInfiniteQuery(
      {
        onlyUser,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );

  const itemsArray = data?.pages.map(({ items }) => items).flat(1);

  const dataFilter = itemsArray?.filter((image) =>
    onlyUser ? true : image.imageUrl !== null
  ) as {
    imageUrl: string;
  }[];

  // Function to check if the user has reached the end of the page
  const handleScroll = () => {
    if (!isFetchingNextPage && hasNextPage) {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;

      if (scrolledToBottom) {
        fetchNextPage();
      }
    }
  };

  // Add a scroll event listener when the component mounts
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetchingNextPage, hasNextPage]);

  return (
    <>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 4 }}>
        <Masonry gutter="0.5rem">
          {dataFilter?.map((image, i) =>
            image.imageUrl ? (
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
            ) : (
              <Skeleton height="100%" width="100%" />
            )
          )}
        </Masonry>
      </ResponsiveMasonry>
      {isFetchingNextPage && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            margin: "1rem 0",
          }}
        >
          <Loader />
        </Box>
      )}
    </>
  );
};

export default ImagesGrid;
