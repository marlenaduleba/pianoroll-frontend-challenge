import { PianoNote } from '../types/interfaces';
import { generateGradientTable } from './generateGradientTable';

export function drawPianoRollCard(sequence: PianoNote[], svgRef: SVGSVGElement | null) {
  if (!svgRef || !sequence || sequence.length === 0) {
    return;
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
  const pitches = sequence.map(note => note.pitch);
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

  for (let it = pitchMin; it <= pitchMax + 1; it++) {
    if ([1, 3, 6, 8, 10].includes(it % 12)) {
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      const y = 1 - (it - pitchMin) / pitchSpan;
      rect.setAttribute('fill', backgroundColormap[12]);
      rect.setAttribute('fill-opacity', '0.666');
      rect.setAttribute('x', '0');
      rect.setAttribute('y', `${y}`);
      rect.setAttribute('width', '1');
      rect.setAttribute('height', `${1 / pitchSpan}`);
      svgRef.appendChild(rect);
    }

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    const y = 1 - (it - pitchMin) / pitchSpan + 1 / pitchSpan;
    line.setAttribute('x1', '0');
    line.setAttribute('y1', `${y}`);
    line.setAttribute('x2', '2');
    line.setAttribute('y2', `${y}`);
    let line_width;

    if (it % 12 === 0) {
      line_width = 0.003;
    } else {
      line_width = 0.001;
    }

    line.setAttribute('stroke-width', `${line_width}`);
    line.setAttribute('stroke', 'black');
    svgRef.appendChild(line);
  }

  sequence.forEach(note => {
    const noteRectangle = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    const x = timeToX(note.start - start, end);
    const w = timeToX(note.end - note.start, end);

    const y = 1 - (note.pitch - pitchMin) / pitchSpan;
    noteRectangle.setAttribute('x', `${x}`);
    noteRectangle.setAttribute('width', `${w}`);
    noteRectangle.setAttribute('y', `${y}`);
    noteRectangle.setAttribute('height', `${noteHeight}`);

    const color = noteColormap[note.velocity];
    noteRectangle.setAttribute('fill', color);
    noteRectangle.classList.add('note-rectangle');

    svgRef.appendChild(noteRectangle);
  });
}