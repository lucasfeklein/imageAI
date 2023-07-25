import { Box, Button, Select, Skeleton, Textarea } from "@mantine/core";
import Image from "next/image";
import { useState } from "react";
import Layout from "~/components/Layout";
import { api } from "~/utils/api";

interface ImageInfo {
  width: number;
  height: number;
}

const Generator = () => {
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

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
    postImage.mutate({
      prompt,
      negativePrompt,
    });

    setLastImageInfo({
      width: parseInt(width, 10),
      height: parseInt(height, 10),
    });
  };

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 3.75rem)",
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
          <Textarea
            label="Prompt"
            required
            placeholder="a photo of a thin irish red headed woman with freckles in shibari bondage, tied up, (detailed face), ((ballgag))"
            minRows={3}
            sx={{ width: "100%" }}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Textarea
            label="Negative Prompt"
            placeholder="((blurry)), duplicate, deformed, makeup, cartoon, animated, render, missing limbs, child, childish"
            minRows={3}
            sx={{ margin: "1rem 0", width: "100%" }}
            value={negativePrompt}
            onChange={(e) => setNegativePrompt(e.target.value)}
          />
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
