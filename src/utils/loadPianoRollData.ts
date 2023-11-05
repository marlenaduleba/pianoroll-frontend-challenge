import { PianoNote } from "../types/interfaces";
  

  export async function loadPianoRollData(): Promise<PianoNote[]> {
    try {
      const response = await fetch('https://pianoroll.ai/random_notes');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error loading data:', error);
      return []; 
    }
  }