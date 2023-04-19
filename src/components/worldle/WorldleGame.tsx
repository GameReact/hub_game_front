import React, { useCallback, useState } from "react";
import {
    countries,
    getCountryName,
    getRandomCountry,
    normalizeCountryName,
} from "./data/Countries";
import CountryInput from "./CountryInput";
import * as geolib from "geolib";
import Guesses from "./Guesses";
import {Guess} from "./data/Guess";

const MAX_TRY_COUNT = 5;

const guesses: Guess[] = []

const countryToGuess = getRandomCountry()

const WorldleGame = () => {
    const country = countryToGuess

    const [currentGuess, setCurrentGuess] = useState("");

    const gameEnded =
        guesses.length === MAX_TRY_COUNT ||
        guesses[guesses.length - 1]?.distance === 0;

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const guessedCountry = countries.find(
                (country) =>
                    normalizeCountryName(
                        getCountryName(country)
                    ) === normalizeCountryName(currentGuess)
            );

            if (guessedCountry == null) {
                return;
            }

            const newGuess = {
                name: currentGuess,
                distance: geolib.getDistance(guessedCountry, country),
                direction: geolib.getCompassDirection(guessedCountry, country),
            };

            guesses.push(newGuess)
            setCurrentGuess("");

            console.log(countryToGuess.name)
        },
        [country, currentGuess]

    );

    return (
        <div>
            <div>
                <img
                    width={250} height={250}
                    alt="country to guess"
                    src={`/images/countries/${countryToGuess.code.toLowerCase()}/vector.svg`}
                />
            </div>
            <Guesses
                rowCount={MAX_TRY_COUNT}
                guesses={guesses}
            />
            <div className="my-2">
                {gameEnded ? (
                    <>
                        {guesses.at(guesses.length-1)?.distance === 0 ? (
                            <>
                                <p>Excellent vous avez gagné !</p>
                            </>
                        ) : (
                            <>
                                <p>Perdu ! Le nom du pays est : {countryToGuess.name}</p>
                            </>
                        )}

                        <button onClick={() => window.location.reload()}>Recommencer</button>
                    </>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <CountryInput
                                currentGuess={currentGuess}
                                setCurrentGuess={setCurrentGuess}
                            />
                            <button type="submit">
                                🌍 {"Devinez"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

export default WorldleGame;
