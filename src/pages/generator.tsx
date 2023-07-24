import { Box, Button, Select, Skeleton, Textarea } from "@mantine/core";
import { useState } from "react";
import Layout from "~/components/Layout";

const Generator = () => {
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

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

  const handleSubmit = () => {};

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
          <Button type="submit">Gerar</Button>
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
          <Skeleton
            height={`${height}px`}
            width={`${width}px`}
            animate={false}
          />
        </Box>
      </Box>
    </Layout>
  );
};

export default Generator;
