export function insertDummyEntry<T>(entry: T[], size: number = 4) {
  const dummyEntry: null[] = [];
  if (entry && entry.length > 0) {
    if (entry.length < size) {
      for (let i = 0; i < size - entry.length; i++) {
        dummyEntry.push(null);
      }
    } else {
      for (let i = 0; i < entry.length % size; i++) {
        dummyEntry.push(null);
      }
    }
  }
  return dummyEntry;
}
