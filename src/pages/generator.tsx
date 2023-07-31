import { Box, Button, Chip, Overlay, Skeleton } from "@mantine/core";
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

    const promptObj: any = {};

    for (const el of promptArray) {
      if (promptObj[el.category]) {
        promptObj[el.category].push(el.value);
      } else {
        promptObj[el.category] = [el.value];
      }
    }

    const prompt = Object.entries(promptObj)
      .map(
        ([category, valuesArray]) =>
          `${(categoryTitle as any)[category]}: ${(
            valuesArray as string[]
          ).join(", ")}`
      )
      .join(", ");

    console.log(prompt);

    postImage.mutate({
      prompt,
    });
  };

  const handleClearAll = () => {
    setPromptArray([]);
  };

  const handleChipClick = (category: string, value: string) => {
    const singleChipSelection = [
      "base",
      "hairColor",
      "numberOfPeople",
      "hairStyle",
      "age",
      "setting",
    ].includes(category);

    if (
      singleChipSelection &&
      !promptArray.find((obj) => obj.value === value)
    ) {
      const unselectAllCategoryArray = promptArray.filter(
        (obj) => obj.category !== category
      );
      setPromptArray([...unselectAllCategoryArray, { category, value }]);
    } else if (promptArray.find((obj) => obj.value === value)) {
      setPromptArray(promptArray.filter((obj) => obj.value !== value));
    } else {
      setPromptArray([...promptArray, { category, value }]);
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
          {Object.entries(chipsObject).map(([category, arrayOfChips]) => {
            return (
              <Box sx={{ width: "100%" }} key={category}>
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
                  {categoryTitle[category as keyof typeof categoryTitle]}
                </Box>
                <Box sx={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  {arrayOfChips.map((value, i) => (
                    <Chip
                      key={i}
                      checked={Boolean(
                        promptArray.find((obj) => obj.value === value)
                      )}
                      onClick={() => handleChipClick(category, value)}
                    >
                      {value}
                    </Chip>
                  ))}
                </Box>
              </Box>
            );
          })}

          <Button
            sx={{ position: "fixed", left: "50%", bottom: "5%" }}
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

const chipsObject = {
  base: [
    "Man",
    "Woman",
    "Man having sex with woman",
    "Man having sex with man",
    "Woman having sex with woman",
  ],
  numberOfPeople: ["One person", "Two people", "Several people"],
  body: [
    "Busty",
    "Beautiful",
    "Tattoo",
    "Muscular",
    "Chubby",
    "Small tits",
    "Huge boobs",
    "Lipstick",
    "Big ass",
    "Small ass",
    "Skinny",
    "Fat",
    "Tall",
    "Short",
    "Perfect body",
    "Pubic hair",
    "Short hair",
    "Long hair",
    "Curly hair",
    "Pregnant",
    "Tanned skin",
    "Dark skin",
  ],
  age: ["18 y/o", "20 y/o", "30 y/o", "40 y/o", "50 y/o", "60 y/o", "70 y/o"],
  face: [
    "Happy",
    "Sad",
    "Serious",
    "Laughing",
    "Orgasm",
    "Seductive",
    "Pouting lips",
    "Shocked",
    "Angry",
  ],
  hairColor: [
    "Blonde",
    "Brunette",
    "Ginger",
    "White hair",
    "Black hair",
    "Blue hair",
    "Green hair",
    "Purple hair",
    "Pink hair",
  ],
  hairStyle: [
    "Bobcut",
    "Pigtails",
    "Hair bun",
    "Messy",
    "Bangs",
    "Braided",
    "Slicked",
    "Straight",
  ],
  ethnicity: [
    "African",
    "Arabic",
    "Asian",
    "Brazilian",
    "British",
    "Chinese",
    "Czech",
    "Dutch",
    "Egyption",
    "French",
    "German",
    "Greek",
    "Irish",
    "Indian",
    "Italian",
    "Thai",
    "Japanese",
  ],
  setting: [
    "Bar",
    "Bathroom",
    "Beach",
    "Bedroom",
    "Bus",
    "Cafe",
    "Car",
    "Changing room",
    "Church",
    "Gym",
    "Hospital",
    "Jungle",
    "Mall",
    "Kitchen",
    "Office",
    "Pool",
    "Shower",
    "Strip club",
    "Party",
    "Tent",
    "Couch",
    "Hot tub",
  ],
  view: ["Front view", "Side view", "Back view", "Close-up view"],
  action: [
    "Yoga",
    "Sleeping",
    "Cooking",
    "Gaming",
    "Bending over",
    "Cumshot",
    "Spreading legs",
    "Working out",
    "Blow job",
    "Creampie",
  ],
  clothing: [
    "Nude",
    "BDSM",
    "Bikini",
    "Choker",
    "Clown",
    "Devil",
    "Casual",
    "Boots",
    "Cosplay",
    "Doctor",
    "Firefighter",
    "Dominatrix",
    "Dress",
    "Halloween",
    "High heels",
    "Hijab",
    "Kimono",
    "Maid",
    "Lumberjack",
    "Micro skirt",
    "Police",
    "Underwear",
    "Viking",
    "Yoga pants",
  ],
};

const categoryTitle = {
  numberOfPeople: "Number of people",
  base: "Base",
  body: "Body",
  age: "Age",
  face: "Face",
  hairColor: "Hair color",
  hairStyle: "Hair style",
  ethnicity: "Ethnicity",
  setting: "Setting",
  view: "View",
  clothing: "Clothing",
  action: "Action",
};
