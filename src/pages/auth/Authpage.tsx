import React, { useRef, useState } from "react"
import theme from "../../theme/theme"
import { ThemeProvider } from "@mui/material/styles"
import { Container, Box, Tab, AlertColor, Typography } from "@mui/material"
import { TabList, TabPanel, TabContext } from "@mui/lab"
import Login from "./Login"
import Register from "./Register"
import SnackbarAlert from "../../components/SnackbarAlert"
import ConfirmRegister from "./ConfirmRegister"
import AdbIcon from "@mui/icons-material/Adb"

function AuthPage() {
	interface State {
		valueTab: string
		snackbarText: string
		snackbarColor: AlertColor
		openSnackbar: boolean
	}

	const [values, setValues] = useState<State>({
		valueTab: "1",
		snackbarText: "",
		snackbarColor: "error",
		openSnackbar: false,
	})

	interface User {
		given_name: string
		name: string
		email: string
		password: string
	}

	const [user, setUser] = useState<User>({
		given_name: "",
		name: "",
		email: "",
		password: "",
	})

	const containerRef = useRef(null)

	const handleChangeTab = (
		event: React.SyntheticEvent,
		newValueTab: string
	) => {
		setValues({ ...values, valueTab: newValueTab })
	}

	const handleChangeTabProp = (newValueTab: string) => {
		setValues({ ...values, valueTab: newValueTab })
	}

	const openSnackbar = (
		text: string,
		color: AlertColor,
		open: boolean = true
	) => {
		setValues({
			...values,
			snackbarText: text,
			snackbarColor: color,
			openSnackbar: open,
		})
	}

	const userInformations = (
		email: string,
		given_name: string,
		name: string,
		password: string
	) => {
		setUser({
			email: email,
			given_name: given_name,
			name: name,
			password: password,
		})
	}

	return (
		<ThemeProvider theme={theme}>
			<SnackbarAlert
				text={values.snackbarText}
				color={values.snackbarColor}
				open={values.openSnackbar}
			></SnackbarAlert>
			<Container maxWidth="lg" ref={containerRef}>
				<Box component="div" sx={{ my: 3, textAlign: "center" }}>
					<AdbIcon
						sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
					/>
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						GameReact
					</Typography>{" "}
				</Box>
				<TabContext value={values.valueTab}>
					<TabList centered onChange={handleChangeTab}>
						<Tab value="1" label="Connexion" />
						<Tab value="2" label="Créer un compte" />
						<Tab value="3" label="Confirmer mon compte" />
					</TabList>
					<TabPanel value="1">
						<Login openSnackbar={openSnackbar} />
					</TabPanel>
					<TabPanel value="2">
						<Register
							openSnackbar={openSnackbar}
							valueTab={handleChangeTabProp}
							userInformations={userInformations}
						/>
					</TabPanel>
					<TabPanel value="3">
						<ConfirmRegister
							openSnackbar={openSnackbar}
							valueTab={handleChangeTabProp}
							userInformations={user}
						/>
					</TabPanel>
				</TabContext>
			</Container>
		</ThemeProvider>
	)
}

export default AuthPage
