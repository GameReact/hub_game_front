import React from "react";
import {countries, getCountryName,} from "./data/Countries";
import {Autocomplete, TextField} from "@mui/material";

interface CountryInputProps {
    currentGuess: string;
    setCurrentGuess: (guess: string) => void;
}

const CountryInput = ({currentGuess, setCurrentGuess}: CountryInputProps) => {
    return (
        <Autocomplete
            options={countries.map((c) => getCountryName(c).toUpperCase())}
            inputValue={currentGuess}
            onInputChange={(_e, newValue) => setCurrentGuess(newValue)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Country"
                    variant="outlined"
                />
            )}
        />

    );
}

export default CountryInput;
