import { PianoNote } from '../types/interfaces';
import { generateGradientTable } from '../utils/generateGradientTable';

interface PianoRollSVGProps {
  sequence: PianoNote[];
}

export const PianoRollSVG = ({ sequence }: PianoRollSVGProps) => {
  if (!sequence || sequence.length === 0) {
    return null;
  }

  const backgroundStartColor = { r: 93, g: 181, b: 213 };
  const backgroundEndColor = { r: 21, g: 65, b: 81 };
  const backgroundColormap = generateGradientTable(backgroundStartColor, backgroundEndColor, 128);

  const noteStartColor = { r: 66, g: 66, b: 61 };
  const noteEndColor = { r: 28, g: 28, b: 26 };
  const noteColormap = generateGradientTable(noteStartColor, noteEndColor, 128);

  const timeToX = (time: number, end: number) => {
    return time / end;
  };

  const start = sequence[0].start;
  const end = sequence[sequence.length - 1].end - start;
  const pitches = sequence.map((note) => note.pitch);
  let pitchMin = Math.min(...pitches);
  let pitchMax = Math.max(...pitches);
  let pitchSpan = pitchMax - pitchMin;

  if (pitchSpan < 24) {
    const diff = 24 - pitchSpan;
    const low = Math.ceil(diff / 2);
    const high = Math.floor(diff / 2);
    pitchMin -= low;
    pitchMax += high;
  }

  pitchMin -= 3;
  pitchMax += 3;
  pitchSpan = pitchMax - pitchMin;
  const noteHeight = 1 / pitchSpan;

  const elements = [];

  for (let it = pitchMin; it <= pitchMax + 1; it++) {
    if ([1, 3, 6, 8, 10].includes(it % 12)) {
      const y = 1 - (it - pitchMin) / pitchSpan;
      elements.push(
        <rect
          key={`bg-${it}`}
          fill={backgroundColormap[12]}
          fillOpacity="0.666"
          x="0"
          y={y}
          width="1"
          height={1 / pitchSpan}
        />
      );
    }

    const y = 1 - (it - pitchMin) / pitchSpan + 1 / pitchSpan;
    const line_width = it % 12 === 0 ? 0.003 : 0.001;

    elements.push(
      <line
        key={`line-${it}`}
        x1="0"
        y1={y}
        x2="2"
        y2={y}
        strokeWidth={line_width}
        stroke="black"
      />
    );
  }

  sequence.forEach((note, index) => {
    const x = timeToX(note.start - start, end);
    const w = timeToX(note.end - note.start, end);
    const y = 1 - (note.pitch - pitchMin) / pitchSpan;

    const color = noteColormap[note.velocity];
    elements.push(
      <rect
        key={`note-${index}`}
        x={x}
        width={w}
        y={y}
        height={noteHeight}
        fill={color}
        className="note-rectangle"
      />
    );
  });

  return (
    <svg className="piano-roll-svg" viewBox="0 0 1 1" width="80%" height="150" preserveAspectRatio="none">
      {elements}
    </svg>
  );
}