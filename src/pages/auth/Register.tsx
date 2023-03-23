import {
  Button,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  AlertColor,
  Box,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React from "react";
import { useState } from "react";
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";

interface Params {
  openSnackbar: (text: string, color: AlertColor) => void;
  valueTab: (value: string) => void;
  userInformations: (
    email: string,
    given_name: string,
    name: string,
    password: string
  ) => void;
}

const Register: React.FC<Params> = ({
  openSnackbar,
  valueTab,
  userInformations,
}) => {
  interface User {
    given_name: string;
    name: string;
    email: string;
    password: string;
  }

  interface State {
    showPassword: boolean;
    confirmationCode: string;
  }

  const [user, setUser] = useState<User>({
    given_name: "",
    name: "",
    email: "",
    password: "",
  });

  const [values, setValues] = useState<State>({
    showPassword: false,
    confirmationCode: "",
  });

  const handleChangeInput =
    (prop: keyof User) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setUser({ ...user, [prop]: event.target.value });
    };

  const userPool = new AmazonCognitoIdentity.CognitoUserPool({
    UserPoolId: process.env.REACT_APP_USERPOOLID!,
    ClientId: process.env.REACT_APP_CLIENTID!,
  });

  const createAccount = () => {
    const attributeList = [
      new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: "name",
        Value: user.name,
      }),
      new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: "given_name",
        Value: user.given_name,
      }),
    ];
    userPool.signUp(user.email, user.password, attributeList, [], (error) => {
      if (error) {
        if (error.message) {
          if (error.message.includes("given email already exists")) {
            openSnackbar("L'email est déjà utilisé", "error");
          }
          if (
            error.message.includes(
              "Value at 'password' failed to satisfy constraint"
            ) ||
            error.message.includes("Password not long enough") ||
            error.message.includes("Password must have")
          ) {
            openSnackbar("Le mot de passe n'est pas conforme", "error");
          }
          if (
            error.message.includes("Username should be an email") ||
            error.message.includes(
              "Value at 'username' failed to satisfy constraint"
            )
          ) {
            openSnackbar("L'email n'est pas conforme", "error");
          }
        }
        console.error(error);
        return;
      }
      console.log(user);
      userInformations(user.email, user.given_name, user.name, user.password);
      openSnackbar("Compte crée !", "success");
      valueTab("3");
    });
  };

  return (
    <form>
      <Box component="div"
        sx={{
          margin: "auto",
          width: 500,
          my: 3,
        }}
      >
        <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
          <InputLabel htmlFor="name">Nom</InputLabel>
          <OutlinedInput
            id="lastname"
            value={user.name}
            label="Nom"
            onChange={handleChangeInput("name")}
          />
        </FormControl>
        <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
          <InputLabel htmlFor="firstname">Prénom</InputLabel>
          <OutlinedInput
            id="given_name"
            value={user.given_name}
            label="Prénom"
            onChange={handleChangeInput("given_name")}
          />
        </FormControl>
        <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
          <InputLabel htmlFor="email">Email</InputLabel>
          <OutlinedInput
            id="email"
            value={user.email}
            label="Email"
            onChange={handleChangeInput("email")}
          />
        </FormControl>
        <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
          <InputLabel htmlFor="password">Mot de passe</InputLabel>
          <OutlinedInput
            id="password"
            type={values.showPassword ? "text" : "password"}
            value={user.password}
            onChange={handleChangeInput("password")}
            label="Mot de passe"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() =>
                    setValues({
                      ...values,
                      showPassword: !values.showPassword,
                    })
                  }
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={createAccount}
          sx={{ mt: 4, mx: "auto", display: "flex" }}
        >
          Créer un compte
        </Button>
      </Box>
    </form>
  );
};

export default Register;
