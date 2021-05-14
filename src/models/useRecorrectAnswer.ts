import { IQuestionDetails } from '@/apis/questions/schema';
import { useState } from 'react';

export default function useRecorrectAnswer() {
  const [question, setQuestion] = useState<IQuestionDetails>();

  return { question, setQuestion };
}
