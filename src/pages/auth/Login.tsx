import {
  Button,
  Link,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  AlertColor,
  Box,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserSliceState } from "../../store/slices/UserSlice";
import jwt_decode, { JwtPayload } from "jwt-decode";
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
import useAxios from "../../hooks/useAxios";
import { UserContext } from "../../context/UserContextProvider";

interface Params {
  openSnackbar: (text: string, color: AlertColor) => void;
}

const Login: React.FC<Params> = ({ openSnackbar }) => {
  const { state, dispatch } = useContext(UserContext);

  const updateUser = (newUserState: UserSliceState) => {
    dispatch({ type: 'setUser', payload: newUserState });
  };

  // const dispatch = useDispatch();

  const navigate = useNavigate();

  const { fetchData } = useAxios();

  interface User {
    given_name: string;
    name: string;
    email: string;
    password: string;
  }
  interface State {
    showPassword: boolean;
    dialogFP: boolean;
    dialogCFP: boolean;
    newPassword: string;
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
    dialogFP: false,
    dialogCFP: false,
    newPassword: "",
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

  const getUserByEmail = (email: string, token: string): any => {
    fetchData({
      method: "GET",
      url: `/users?email=` + email,
      headers: {
        accept: "*/*",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        const config = jwt_decode(token) as JwtPayload;
          const newUserState = {            token: token,
            tokenPayload: config,
            id: response!.data.content[0].id,
            email: response!.data.content[0].email,
            firstname: response!.data.content[0].firstname,
            lastname: response!.data.content[0].lastname,
          };
          updateUser(newUserState);
        openSnackbar("Connexion réussie !", "success");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        openSnackbar("Une erreur est survenue", "error");
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
        getUserByEmail(user.email, token);
      },
      onFailure: (error) => {
        console.error(error);
        openSnackbar("Email ou mot de passe incorrect", "error");
      },
    });
  };

  const resetPassword = () => {
    const newUser = createCognitoUser(user.email);

    newUser.forgotPassword({
      onSuccess: (data) => {
        openSnackbar(
          "Un email contenant un code de confirmation vous a été envoyé !",
          "success"
        );
        setValues({ ...values, dialogFP: false, dialogCFP: true });
      },
      onFailure: (error) => {
        console.error(error);
        openSnackbar("Une erreur est survenue", "error");
      },
    });
  };

  const confirmPasswordAfterReset = () => {
    const newUser = createCognitoUser(user.email);

    newUser.confirmPassword(values.confirmationCode, user.password, {
      onSuccess: (data) => {
        openSnackbar("Mot de passe modifié avec succès !", "success");
        setValues({ ...values, dialogCFP: false });
      },
      onFailure: (error) => {
        if (error) {
          if (error.message) {
            if (
              (error.message as string).includes(
                "Invalid verification code provided"
              ) ||
              (error.message as string).includes("Invalid code provided") ||
              (error.message as string).includes(
                "Value '' at 'confirmationCode' failed to satisfy constraint"
              )
            ) {
              openSnackbar("Email, mot de passe ou code invalide", "error");
            }
          }
        }
        console.error(error);
      },
    });
  };

  return (
    <form>
      <Box
        sx={{
          margin: "auto",
          width: 500,
          my: 3,
        }}
      >
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
        <Link
          sx={{
            display: "block",
            my: 2,
            cursor: "pointer",
            textAlign: "center",
          }}
          variant="subtitle2"
          onClick={() => setValues({ ...values, dialogFP: true })}
        >
          Mot de passe oublié ?
        </Link>
        <Dialog
          open={values.dialogFP}
          onClose={() => setValues({ ...values, dialogFP: false })}
          aria-labelledby="dialogTitle"
          aria-describedby="dialogDesc"
        >
          <DialogTitle id="dialogTitle">{"Mot de passe oublié"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="dialogDesc">
              Veuillez saisir l'adresse email associée à votre compte pour
              générer un nouveau mot de passe
              <FormControl sx={{ mt: 3 }} variant="outlined" fullWidth>
                <InputLabel htmlFor="email">Adresse email</InputLabel>
                <OutlinedInput
                  id="email"
                  value={user.email}
                  label="Adresse email"
                  onChange={handleChangeInput("email")}
                />
              </FormControl>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={resetPassword}>Valider</Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={values.dialogCFP}
          onClose={() => setValues({ ...values, dialogCFP: false })}
          aria-labelledby="dialogTitle"
          aria-describedby="dialogDesc"
          disableEscapeKeyDown
        >
          <DialogTitle id="dialogTitle">
            {"Modifier mon mot de passe"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="dialogDesc">
              Veuillez saisir votre email, votre nouveau mot de passe ainsi que
              le code de confirmation qui vous a été transmis par email pour
              modifier votre mot de passe.
              <FormControl sx={{ mt: 3 }} variant="outlined" fullWidth>
                <InputLabel htmlFor="email">Adresse email</InputLabel>
                <OutlinedInput
                  value={user.email}
                  label="Adresse email"
                  onChange={handleChangeInput("email")}
                />
              </FormControl>
              <FormControl sx={{ mt: 3 }} variant="outlined" fullWidth>
                <InputLabel htmlFor="email">Nouveau mot de passe</InputLabel>
                <OutlinedInput
                  value={values.newPassword}
                  type="password"
                  label="Nouveau mot de passe"
                  onChange={(e) =>
                    setValues({
                      ...values,
                      newPassword: e.target.value,
                    })
                  }
                />
              </FormControl>
              <FormControl sx={{ mt: 3 }} variant="outlined" fullWidth>
                <InputLabel htmlFor="email">Code de confirmation</InputLabel>
                <OutlinedInput
                  value={values.confirmationCode}
                  label="Code de confirmation"
                  onChange={(e) =>
                    setValues({
                      ...values,
                      confirmationCode: e.target.value,
                    })
                  }
                />
              </FormControl>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={confirmPasswordAfterReset}>Valider</Button>
          </DialogActions>
        </Dialog>
        <Button
          variant="contained"
          color="primary"
          onClick={authenticateUser}
          sx={{ mt: 4, mx: "auto", display: "flex" }}
        >
          Se connecter
        </Button>
      </Box>
    </form>
  );
};

export default Login;
