import { useState, useEffect } from 'react';
import { AppBar } from './components/AppBar';
import { PianoRollGrid } from './components/PianoRollGrid';
import { PianoNote } from './types/interfaces';
import { loadPianoRollData } from './utils/loadPianoRollData';

import './styles.css';


export const App: React.FC = () => {
  const [pianoRollData, setPianoRollData] = useState<PianoNote[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadPianoRollData();
        console.log(data);
        setPianoRollData(data);
      } catch (error) {
        console.error('Error fetching piano roll data: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <AppBar />
      <PianoRollGrid data={pianoRollData} />
    </div>
  );
};
