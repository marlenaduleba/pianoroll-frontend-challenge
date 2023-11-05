import { useEffect, useState } from 'react';
import { loadPianoRollData } from '../utils/loadPianoRollData';
import { Note } from '../types/interfaces';

interface MainPianoRollProps {
  
}

export const MainPianoRoll: React.FC<MainPianoRollProps> = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    loadPianoRollData().then((data: Note[]) => {
      setNotes(data);
    });
  }, []);

  return (
    <div className="main-piano-roll">
      {notes.map((note: Note, index: number) => (
        <div key={index}>
          <div>Pitch: {note.pitch}</div>
          <div>Start: {note.start}</div>
        </div>
      ))}
    </div>
  );
};
