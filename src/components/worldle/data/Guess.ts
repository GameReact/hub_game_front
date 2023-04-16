import { Direction } from "./Geography";

export interface Guess {
    name: string;
    distance: number;
    direction: Direction;
}