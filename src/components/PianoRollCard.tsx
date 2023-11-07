import { PianoNote } from "../types/interfaces";
import { PianoRollSVG } from "./PianoRollSVG";

interface PianoRollCardProps {
  sequence: PianoNote[];
}

export const PianoRollCard: React.FC<PianoRollCardProps> = ({ sequence }) => {
  
  return (
    <div className="piano-roll-card">
      <h3>This is a piano roll card</h3>
      <PianoRollSVG sequence={sequence} />
    </div>
  );
};
