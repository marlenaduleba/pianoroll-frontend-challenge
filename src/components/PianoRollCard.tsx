import { useEffect, useRef } from "react";
import { PianoNote } from "../types/interfaces";
import { drawPianoRollCard } from "../utils/drawPianoRollCard";


interface PianoRollCardProps {
  sequence: PianoNote[];
}

export const PianoRollCard: React.FC<PianoRollCardProps> = ({ sequence }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current) {
      drawPianoRollCard(sequence, svgRef.current);
    }
  }, [sequence]);
  return (
    <div className="piano-roll-card">
      <h3>This is a piano roll card</h3>
      <svg ref={svgRef} className="piano-roll-svg" viewBox="0 0 1 1" width="80%" height="150" preserveAspectRatio="none" ></svg>
    </div>
  );
};
