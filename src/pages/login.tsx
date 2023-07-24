import { Box, Button, Card, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { signIn } from "next-auth/react";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    await signIn("email", { email, redirect: false });
    notifications.show({
      title: "Um link de acesso foi enviado para o Email",
      message: `${email}`,
      icon: <IconCheck />,
    });
    setIsLoading(false);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        withBorder
        sx={{
          width: "300px",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <TextInput
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@exemplo.com"
          label="Email"
          required
        />
        <Button type="submit" loading={isLoading}>
          {isLoading ? "Enviando" : "Enviar"}
        </Button>
      </Card>
    </Box>
  );
};

export default Login;
