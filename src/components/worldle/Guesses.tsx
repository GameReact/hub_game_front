import { Guess } from "./data/Guess";
import GuessRow from "./GuessRow";
import React from "react";

interface GuessesProps {
    rowCount: number;
    guesses: Guess[];
}

const Guesses = ({ rowCount, guesses }: GuessesProps) => {
    return (
        <div>
            <div>
                {Array.from(Array(rowCount).keys()).map((index) => (
                    <GuessRow
                        key={index}
                        guess={guesses[index]}
                    />
                ))}
            </div>
        </div>
    );
}

export default Guesses;
