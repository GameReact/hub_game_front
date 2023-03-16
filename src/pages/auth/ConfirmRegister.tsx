import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  AlertColor,
  Container,
  Grid,
  Box,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
import useAxios from "../../hooks/useAxios";

interface Params {
  openSnackbar: (text: string, color: AlertColor) => void;
  valueTab: (value: string) => void;
  userInformations: User;
}

interface User {
  given_name: string;
  name: string;
  email: string;
  password: string;
}

const ConfirmRegister: React.FC<Params> = ({
  openSnackbar,
  valueTab,
  userInformations,
}) => {
  const { fetchData } = useAxios();

  interface State {
    confirmationCode: string;
  }

  const [user, setUser] = useState<User>({
    email: userInformations.email,
    given_name: userInformations.given_name,
    name: userInformations.name,
    password: userInformations.password,
  });

  const [values, setValues] = useState<State>({
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

  const createCognitoUser = (
    email: string
  ): AmazonCognitoIdentity.CognitoUser => {
    return new AmazonCognitoIdentity.CognitoUser({
      Username: email,
      Pool: userPool,
    });
  };

  const authenticateUser = () => {
    const authenticationData = {
      Username: user.email,
      Password: user.password,
    };

    const newUser = createCognitoUser(user.email);

    const authenticationDetails =
      new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

    newUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        const token = result.getAccessToken().getJwtToken();
        createAccountInBase(token);
      },
      onFailure: (error) => {
        console.error(error);
        openSnackbar("Email ou mot de passe incorrect", "error");
      },
    });
  };

  const resendConfirmationCode = () => {
    const newUser = createCognitoUser(user.email);

    newUser.resendConfirmationCode((error, result) => {
      if (error) {
        if (
          (error.message as string).includes(
            "Value at 'username' failed to satisfy constraint"
          )
        ) {
          openSnackbar("L'email n'est pas conforme", "error");
        }
      } else {
        openSnackbar(
          "Un nouveau code vous a été transmis par email",
          "success"
        );
      }
    });
  };

  const confirmAccount = () => {
    const newUser = createCognitoUser(user.email);

    newUser.confirmRegistration(values.confirmationCode, true, (error) => {
      if (error) {
        if (
          (error.message as string).includes(
            "Value at 'username' failed to satisfy constraint"
          )
        ) {
          openSnackbar("L'email n'est pas conforme", "error");
        }
        if (
          (error.message as string).includes(
            "Invalid verification code provided"
          ) ||
          (error.message as string).includes(
            "Value '' at 'confirmationCode' failed to satisfy constraint"
          )
        ) {
          openSnackbar("Le code de confirmation n'est pas valide", "error");
        }
        console.error(error);
        return;
      }
      authenticateUser();
    });
  };

  const createAccountInBase = (
    token: string
  ): any => {
    fetchData({
      method: "POST",
      url: `/users`,
      data: {
        firstname: user.given_name,
        lastname: user.name,
        email: user.email,
      },
      headers: {
        accept: "*/*",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        openSnackbar("Confirmation réussie", "success");
        valueTab("1");
      })
      .catch((error) => {
        console.log(error);
        openSnackbar("Une erreur est survenue", "error");
      });
  };

  return (
    <Container>
      <form>
        <Box
          sx={{
            margin: "auto",
            width: 500,
            my: 3,
          }}
        >
          <FormControl sx={{ mt: 3 }} variant="outlined" fullWidth>
            <InputLabel htmlFor="email">Adresse email</InputLabel>
            <OutlinedInput
              id="email"
              value={user.email}
              label="Adresse email"
              onChange={handleChangeInput("email")}
            />
          </FormControl>
          <FormControl sx={{ mt: 3 }} variant="outlined" fullWidth>
            <InputLabel htmlFor="email">Code de confirmation</InputLabel>
            <OutlinedInput
              id="code"
              value={values.confirmationCode}
              label="Code de confirmation"
              onChange={(e) => setValues({ confirmationCode: e.target.value })}
            />
          </FormControl>
          <Grid container justifyContent="center" sx={{ my: 3 }} spacing={2}>
            <Grid item>
              <Button
                variant="contained"
                color="warning"
                onClick={resendConfirmationCode}
              >
                Renvoyer un code
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={confirmAccount}
              >
                Valider
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Container>
  );
};

export default ConfirmRegister;
