import { Box, Button, Chip, Select, Skeleton } from "@mantine/core";
import Image from "next/image";
import { useState } from "react";
import Layout from "~/components/Layout";
import { api } from "~/utils/api";

interface ImageInfo {
  width: number;
  height: number;
}

const Generator = () => {
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  const [promptObject, setPromptObject] = useState<{ [key: string]: string[] }>(
    {
      base: [],
      numberOfPeople: [],
      body: [],
    }
  );

  const [lastImageInfo, setLastImageInfo] = useState<ImageInfo | null>(null);

  const utils = api.useContext();

  const postImage = api.example.postImage.useMutation({
    onSuccess() {
      utils.example.getImages.invalidate();
    },
  });

  const imageData = postImage.data; // Returns the data from the created image in Prisma

  const values = [
    { value: "128", label: "128" },
    { value: "256", label: "256" },
    { value: "384", label: "384" },
    { value: "448", label: "448" },
    { value: "512", label: "512" },
    { value: "576", label: "576" },
    { value: "640", label: "640" },
    { value: "704", label: "704" },
    { value: "768", label: "768" },
    { value: "832", label: "832" },
    { value: "896", label: "896" },
    { value: "960", label: "960" },
    { value: "1024", label: "1024" },
  ];

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Extract all values from the promptObject
    const allValues = Object.values(promptObject);

    // Flatten the array of arrays into a single array using concat and spread operator
    const flattenedArray = ([] as string[]).concat(...allValues);

    // Create the comma-separated string
    const prompt = flattenedArray.join(",");

    console.log(prompt);

    postImage.mutate({
      prompt,
    });

    setLastImageInfo({
      width: parseInt(width, 10),
      height: parseInt(height, 10),
    });
  };

  const handleChipClick = (key: string, value: string) => {
    if (promptObject[key]?.includes(value)) {
      setPromptObject((prevPromptObject) => ({
        ...prevPromptObject,
        [key]: prevPromptObject[key]?.filter(
          (chip) => chip !== value
        ) as string[],
      }));
    } else {
      setPromptObject((prevPromptObject) => ({
        ...prevPromptObject,
        [key]: [...(prevPromptObject[key] ?? []), value],
      }));
    }
  };

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: "50%",
            height: "100%",
            padding: "100px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "30px",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                fontSize: "24px",
                fontWeight: "bold",
                borderBottom: "2px solid #e8590c",
                paddingBottom: "8px",
                textTransform: "uppercase",
                fontFamily: "Arial, sans-serif",
                letterSpacing: "2px",
                marginBottom: "1rem",
              }}
            >
              Base
            </Box>
            <Box sx={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              {chipsObject.base.map((value, i) => (
                <Chip key={i} onClick={() => handleChipClick("base", value)}>
                  {value}
                </Chip>
              ))}
            </Box>
          </Box>

          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                fontSize: "24px",
                fontWeight: "bold",
                borderBottom: "2px solid #e8590c",
                paddingBottom: "8px",
                textTransform: "uppercase",
                fontFamily: "Arial, sans-serif",
                letterSpacing: "2px",
                marginBottom: "1rem",
              }}
            >
              Number of people
            </Box>
            <Box sx={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              {chipsObject.numberOfPeople.map((value, i) => (
                <Chip
                  key={i}
                  onClick={() => handleChipClick("numberOfPeople", value)}
                >
                  {value}
                </Chip>
              ))}
            </Box>
          </Box>

          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                fontSize: "24px",
                fontWeight: "bold",
                borderBottom: "2px solid #e8590c",
                paddingBottom: "8px",
                textTransform: "uppercase",
                fontFamily: "Arial, sans-serif",
                letterSpacing: "2px",
                marginBottom: "1rem",
              }}
            >
              Body
            </Box>
            <Box sx={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              {chipsObject.body.map((value, i) => (
                <Chip key={i} onClick={() => handleChipClick("body", value)}>
                  {value}
                </Chip>
              ))}
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Select
              data={values}
              label="Width"
              sx={{ width: "100px" }}
              onSearchChange={setWidth}
              searchValue={width}
              defaultValue="512"
            />
            <Select
              data={values}
              label="Height"
              sx={{ width: "100px" }}
              onSearchChange={setHeight}
              searchValue={height}
              defaultValue="512"
            />
          </Box>
          <Button type="submit" loading={postImage.isLoading}>
            {postImage.isLoading ? "Gerando" : "Gerar"}
          </Button>
        </Box>
        <Box
          sx={{
            width: "50%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {postImage.isLoading || !imageData ? (
            <Skeleton
              height={
                lastImageInfo ? `${lastImageInfo.height}px` : `${height}px`
              }
              width={lastImageInfo ? `${lastImageInfo.width}px` : `${width}px`}
              animate={postImage.isLoading}
            />
          ) : (
            <Image
              src={imageData.imageUrl}
              width={parseInt(width, 10)}
              height={parseInt(height, 10)}
              alt="Image generated"
            />
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default Generator;

const chipsObject = {
  base: ["Man", "Woman", "Man + Woman", "Man + Man", "Woman + Woman"],
  numberOfPeople: ["One", "Two", "Several"],
  body: ["Busty", "Beautiful", "Tattoo", "Big ass", "Muscular", "Chubby"],
};
