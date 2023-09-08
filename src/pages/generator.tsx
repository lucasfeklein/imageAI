import { Box, Button, Overlay, Skeleton, Textarea } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useContext, useState } from "react";
import { BlurImagesContext } from "~/components/BlurImagesProvider";
import Layout from "~/components/Layout";
import { api } from "~/utils/api";

interface ImageInfo {
  width: number;
  height: number;
}

type PromptObject = {
  category: string;
  value: string;
};

const Generator = () => {
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [promptArray, setPromptArray] = useState<PromptObject[]>([]);

  const { data: sessionData } = useSession();

  const utils = api.useContext();

  const { isBlur } = useContext(BlurImagesContext);

  const postImage = api.example.postImage.useMutation({
    onSuccess() {
      utils.example.getImages.invalidate();
    },
  });

  const imageData = postImage.data; // Returns the data from the created image in Prisma

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!sessionData) {
      notifications.show({
        title: "Unauthorized",
        message: "You need to Sign In",
        icon: <IconX />,
      });
    }

    postImage.mutate({
      prompt,
      negativePrompt,
    });
  };

  const handleClearAll = () => {
    setPromptArray([]);
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
            padding: "70px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "30px",
          }}
        >
          <Box sx={{ height: "30px" }}>
            {promptArray.length > 0 && (
              <Button variant="light" onClick={handleClearAll}>
                <Box sx={{ display: "flex", gap: "0.5rem" }}>
                  Clear All <IconX size={15} />
                </Box>
              </Button>
            )}
          </Box>

          <Textarea
            sx={{ width: "100%" }}
            placeholder="An illustration of a red owl with bright blue eyes"
            minRows={5}
            label="Prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Textarea
            sx={{ width: "100%" }}
            placeholder="blurry, deformed, unnatural colors"
            minRows={5}
            label="Negative Prompt"
            value={negativePrompt}
            onChange={(e) => setNegativePrompt(e.target.value)}
          />

          <Button
            sx={{ position: "fixed", left: "50%", bottom: "5%", zIndex: 99 }}
            type="submit"
            loading={postImage.isLoading}
          >
            {postImage.isLoading ? "Gerando" : "Gerar"}
          </Button>
        </Box>
        <Box
          sx={{
            width: "50%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignSelf: "flex-start",
            marginTop: "100px",
          }}
        >
          {postImage.isLoading || !imageData?.imageUrl ? (
            <Skeleton
              height="512px"
              width="512px"
              animate={postImage.isLoading}
            />
          ) : (
            <Box sx={{ position: "relative" }}>
              <Image
                src={imageData.imageUrl}
                width={512}
                height={512}
                alt="Image generated"
              />
              {isBlur && <Overlay blur={40}></Overlay>}
            </Box>
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default Generator;
