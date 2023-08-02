import {
  ActionIcon,
  Box,
  Burger,
  Button,
  Center,
  Container,
  Group,
  Header,
  Menu,
  createStyles,
  rem,
} from "@mantine/core";
import { MantineLogo } from "@mantine/ds";
import { useDisclosure } from "@mantine/hooks";
import {
  IconChevronDown,
  IconEye,
  IconEyeOff,
  IconHeart,
  IconPhoto,
} from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext } from "react";
import { BlurImagesContext } from "./BlurImagesProvider";

const HEADER_HEIGHT = rem(60);

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: rem(5),
  },
}));

interface HeaderActionProps {
  links: {
    link: string;
    label: string;
    links?: { link: string; label: string }[];
  }[];
}

export function HeaderAction({ links }: HeaderActionProps) {
  const { isBlur, setIsBlur } = useContext(BlurImagesContext);

  const { data: sessionData, status } = useSession();

  const { classes } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu
          key={link.label}
          trigger="hover"
          transitionProps={{ exitDuration: 0 }}
          withinPortal
        >
          <Menu.Target>
            <Link href={link.link} className={classes.link}>
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size={rem(12)} stroke={1.5} />
              </Center>
            </Link>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <Link key={link.label} href={link.link} className={classes.link}>
        {link.label}
      </Link>
    );
  });

  return (
    <Header height={HEADER_HEIGHT} sx={{ borderBottom: 0 }}>
      <Container className={classes.inner} fluid>
        <Group>
          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
          />
          <MantineLogo size={28} />
        </Group>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          {sessionData && (
            <Menu>
              <Menu.Target>
                <Button variant="subtle">{sessionData?.user.email}</Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item icon={<IconPhoto />}>
                  <Link href="/user">My photos</Link>
                </Menu.Item>
                <Menu.Item icon={<IconHeart />}>
                  <Link href="/favorites">Favorite photos</Link>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )}
          <ActionIcon>
            {isBlur ? (
              <IconEyeOff onClick={() => setIsBlur(!isBlur)} />
            ) : (
              <IconEye onClick={() => setIsBlur(!isBlur)} />
            )}
          </ActionIcon>
          {sessionData ? (
            <Button radius="xl" h={30} onClick={() => signOut()}>
              Sign Out
            </Button>
          ) : (
            <Link href="/login">
              <Button radius="xl" h={30}>
                Sign In
              </Button>
            </Link>
          )}
        </Box>
      </Container>
    </Header>
  );
}
