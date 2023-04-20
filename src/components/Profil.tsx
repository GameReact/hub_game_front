import {
  createStyles,
  Text,
  Title,
  SimpleGrid,
  TextInput,
  Textarea,
  Button,
  Group,
  ActionIcon,
  rem,
} from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
} from "@tabler/icons-react";
import { UserContext } from "../context/UserContextProvider";
import { useContext } from "react";
import { UserSliceState } from "../interfaces/interfaces";
import useAxios from "../hooks/useAxios";

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 400,
    boxSizing: "border-box",
    backgroundImage: `linear-gradient(-60deg, ${
      theme.colors[theme.primaryColor][4]
    } 0%, ${theme.colors[theme.primaryColor][7]} 100%)`,
    borderRadius: theme.radius.md,
    padding: `calc(${theme.spacing.xl} * 2.5)`,

    [theme.fn.smallerThan("sm")]: {
      padding: `calc(${theme.spacing.xl} * 1.5)`,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    color: theme.white,
    lineHeight: 1,
  },
  title2: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    color: theme.black,
    lineHeight: 1,
  },

  description: {
    color: theme.colors[theme.primaryColor][0],
    maxWidth: rem(300),

    [theme.fn.smallerThan("sm")]: {
      maxWidth: "100%",
    },
  },

  form: {
    backgroundColor: theme.white,
    padding: theme.spacing.xl,
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.lg,
  },

  social: {
    color: theme.white,

    "&:hover": {
      color: theme.colors[theme.primaryColor][1],
    },
  },

  input: {
    backgroundColor: theme.white,
    borderColor: theme.colors.gray[4],
    color: theme.black,

    "&::placeholder": {
      color: theme.colors.gray[5],
    },
  },

  inputLabel: {
    color: theme.black,
  },

  control: {
    backgroundColor: theme.colors[theme.primaryColor][6],
  },
}));

const social = [IconBrandTwitter, IconBrandYoutube, IconBrandInstagram];

export function ProfilC() {
  const { fetchData } = useAxios();

  const { classes } = useStyles();
  const { state: user, dispatch } = useContext(UserContext);

  const updateUser = (newUserState: UserSliceState) => {
    dispatch({ type: "setUser", payload: newUserState });
  };

  const updateProfile = () => {
    user.firstname = (document.getElementById('prenom') as HTMLInputElement).value;
    user.lastname = (document.getElementById('nom') as HTMLInputElement).value;

    fetchData({
      method: "PUT",
      url: `/users/ ${user.id}`,
      headers: {
        accept: "*/*",
        Authorization: "Bearer " + user.token,
      },
      data: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email
      }
    })
      .then((response) => {
        console.log(response)
        updateUser(user)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const icons = social.map((Icon, index) => (
    <ActionIcon
      key={index}
      size={28}
      className={classes.social}
      variant="transparent"
    >
      <Icon size="1.4rem" stroke={1.5} />
    </ActionIcon>
  ));

  return (
    <div className={classes.wrapper}>
      <SimpleGrid
        cols={2}
        spacing={50}
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
      >
        <div>
          <Title className={classes.title}>Mon profil</Title>
          <Text className={classes.description} mt="sm" mb={30}>
            Prénom : {user.firstname}
          </Text>
          <Text className={classes.description} mt="sm" mb={30}>
            Nom : {user.lastname}
          </Text>

          <Group mt="xl">{icons}</Group>
        </div>
        <div className={classes.form}>
          <Title className={classes.title2}>Éditer mon profil</Title>

          <TextInput
            label="Prénom"
            placeholder="Jack"
            mt="md"
            id="prenom"
            classNames={{ input: classes.input, label: classes.inputLabel }}
          />
          <TextInput
            label="Nom"
            placeholder="Sparrow"
            mt="md"
            id="nom"
            classNames={{ input: classes.input, label: classes.inputLabel }}
          />


          <Group position="right" mt="md">
            <Button className={classes.control} onClick={() => updateProfile()}>Modifier mon profil</Button>
          </Group>
        </div>
      </SimpleGrid>
    </div>
  );
}
