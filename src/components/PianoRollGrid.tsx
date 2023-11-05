
import { useEffect } from "react";
import { PianoRollCard } from "./PianoRollCard";
import { PianoNote } from "../types/interfaces";

interface PianoRollGridProps {
  data: PianoNote[];
}



export const PianoRollGrid: React.FC<PianoRollGridProps> = ({ data }) => {

  const generateCards = (data: PianoNote[]): PianoNote[][] => {
    const cards: PianoNote[][] = [];
    
    if (data && data.length > 0) {
      for (let it = 0; it < 20; it++) {
        const start = it * 60;
        const end = start + 60;
        const partData: PianoNote[] = data.slice(start, end);

        cards.push(partData); // Dodawanie sekwencji do tablicy
      }
    }

    return cards; // Zwracanie tablicy sekwencji
  };

  useEffect(() => {
    generateCards(data);
  }, [data]);

  const sequences: PianoNote[][] = generateCards(data); // Pobranie tablicy sekwencji

  return (
    <div id="pianoRollContainer">
    {sequences.map((sequence, index) => (
      <PianoRollCard key={index} sequence={sequence} />
    ))}
  </div>
  );
};
