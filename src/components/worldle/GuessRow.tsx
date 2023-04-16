import {
    computeProximityPercent,
    Direction,
    formatDistance
} from "./data/Geography";
import { Guess } from "./data/Guess";
import React, { useEffect } from "react";

const DIRECTION_ARROWS: Record<Direction, string> = {
    N: "⬆️",
    NNE: "↗️",
    NE: "↗️",
    ENE: "↗️",
    E: "➡️",
    ESE: "↘️",
    SE: "↘️",
    SSE: "↘️",
    S: "⬇️",
    SSW: "↙️",
    SW: "↙️",
    WSW: "↙️",
    W: "⬅️",
    WNW: "↖️",
    NW: "↖️",
    NNW: "↖️",
};

interface GuessRowProps {
    guess?: Guess;
}

const GuessRow = ({ guess }: GuessRowProps) => {
    const proximity = guess != null ? computeProximityPercent(guess.distance) : 0;

    useEffect(() => {
        if (guess == null) {
            return;
        }
    }, [guess]);

    return (
        <>
            <span>
                <p>
                    {guess?.name.toUpperCase()}
                </p>
            </span>
            <span>
                {guess && formatDistance(guess.distance)}
            </span>
            <span>
                {guess?.distance === 0
                    ? "🎉"
                    : guess && DIRECTION_ARROWS[guess.direction]}
            </span>
            <span>
                {`${proximity}%`}
            </span>
        </>
    );
}

export default GuessRow;
