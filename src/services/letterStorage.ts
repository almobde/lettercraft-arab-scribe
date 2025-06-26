
import { SavedLetter, LetterData, GeneratedLetter } from '../types/letter';

const STORAGE_KEY = 'saved_letters';

export const saveLetterToStorage = (letterData: LetterData, generatedLetter: GeneratedLetter): string => {
  const savedLetters = getSavedLetters();
  const id = Date.now().toString();
  
  const newSavedLetter: SavedLetter = {
    id,
    letterData,
    generatedLetter,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  savedLetters.push(newSavedLetter);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(savedLetters));
  
  return id;
};

export const getSavedLetters = (): SavedLetter[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  
  return JSON.parse(stored).map((letter: any) => ({
    ...letter,
    createdAt: new Date(letter.createdAt),
    updatedAt: new Date(letter.updatedAt)
  }));
};

export const getSavedLetterById = (id: string): SavedLetter | null => {
  const savedLetters = getSavedLetters();
  return savedLetters.find(letter => letter.id === id) || null;
};

export const deleteSavedLetter = (id: string): void => {
  const savedLetters = getSavedLetters();
  const filtered = savedLetters.filter(letter => letter.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

export const updateSavedLetter = (id: string, updatedContent: string): void => {
  const savedLetters = getSavedLetters();
  const letterIndex = savedLetters.findIndex(letter => letter.id === id);
  
  if (letterIndex !== -1) {
    savedLetters[letterIndex].generatedLetter.arabicVersion = updatedContent;
    savedLetters[letterIndex].updatedAt = new Date();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedLetters));
  }
};
