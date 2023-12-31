import { Box, Center, Loader, Skeleton } from "@mantine/core";
import { useEffect } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { api } from "~/utils/api";
import ImageWithHover from "./ImageWithHover";

interface ImagesGridProps {
  onlyUser: boolean;
  onlyFavorite: boolean;
}

const ImagesGrid: React.FC<ImagesGridProps> = ({ onlyUser, onlyFavorite }) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    api.example.getImages.useInfiniteQuery(
      {
        onlyUser,
        onlyFavorite,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );

  const itemsArray = data?.pages.flatMap(({ items }) => items);

  const dataFilter = itemsArray?.filter((image) =>
    onlyUser ? true : image.imageUrl !== null
  );

  // Function to check if the user has reached the end of the page
  const handleScroll = () => {
    if (!isFetchingNextPage && hasNextPage) {
      const scrolledToBottom =
        window.innerHeight + window.scrollY + 50 >= document.body.offsetHeight;

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
      {dataFilter?.length ? (
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 4 }}>
          <Masonry gutter="0.5rem">
            {dataFilter?.map((image, i) =>
              image.imageUrl ? (
                <ImageWithHover image={image} key={i} />
              ) : (
                <Skeleton height="100%" width="100%" key={i} />
              )
            )}
          </Masonry>
        </ResponsiveMasonry>
      ) : (
        <Center h="calc(100vh - 100px)">
          {dataFilter?.length === 0 ? (
            <Box>
              {onlyFavorite
                ? "No favorite photos yet"
                : "No photos generated by yourself"}
            </Box>
          ) : (
            <Loader />
          )}
        </Center>
      )}
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
