export default function parseJsonSafe<T>(value?: string) {
  if (!value) {
    return undefined;
  }

  try {
    return JSON.parse(value) as T;
  } catch (e) {
    return undefined;
  }
}
