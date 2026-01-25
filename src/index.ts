
import { generateTranscript } from './generator';
export * from './types';

// Facade for the user
export const createTranscript = generateTranscript;
