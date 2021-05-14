export function getEnvPrefix(questionId: string) {
  const originUrl = window.location.origin;
  return `${originUrl}/tiku/question/${questionId}`;
}
