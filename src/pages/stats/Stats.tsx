import { Container, Typography } from "@mui/material";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import "chart.js/auto";
import faker from "faker";
import { Bar, Line } from "react-chartjs-2";
import { HeaderAction } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { createStyles, Title as MantineTitle, rem, Text } from "@mantine/core";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// GRAPHIQUE 1 : FREQUENTATION DU SITE
export const options1 = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Fréquentation du site",
    },
  },
};

const labels1 = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
];

export const data1 = {
  labels: labels1,
  datasets: [
    {
      label: "Membre inscrits",
      data: labels1.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Visiteur",
      data: labels1.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export const options2 = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Temps passé sur le site",
    },
  },
};

const labels2 = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
];

export const data2 = {
  labels: labels2,
  datasets: [
    {
      fill: true,
      label: "Dataset 2",
      data: labels2.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const useStyles = createStyles((theme) => ({
  title: {
    textAlign: "center",
    fontWeight: 800,
    fontSize: rem(40),
    letterSpacing: -1,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    marginBottom: theme.spacing.xs,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    [theme.fn.smallerThan("xs")]: {
      fontSize: rem(28),
      textAlign: "left",
    },
  },

  highlight: {
    color: theme.colors.orange[5],
  },
}));

const Stats: React.FunctionComponent = () => {
  const { classes } = useStyles();
  return (
    <>
      <HeaderAction />
      <Container maxWidth="md">
        <MantineTitle className={classes.title}>
          Statistique du site Game
          <Text component="span" className={classes.highlight} inherit>
            Hub
          </Text>{" "}
        </MantineTitle>
        <Bar options={options1} data={data1} />
        <Line options={options2} data={data2} />;
      </Container>
      <Footer />
    </>
  );
};

export default Stats;
