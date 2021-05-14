import auth, { ApiTypes as AuthApiTypes } from './auth';
import questions, { ApiTypes as questionsTypes } from './questions';

export type ApiTypes = AuthApiTypes & questionsTypes;

export { auth, questions };
