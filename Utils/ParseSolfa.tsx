export const parseSongParts = (parts: { soprano: string; alto: string; tenor: string; bass: string }, key: string) => {
  const result: Record<string, any[]> = { soprano: [], alto: [], tenor: [], bass: [] };

  // default octave levels
  const octaveMap: Record<string, number> = {
    soprano: 3,
    alto: 3,
    tenor: 2,
    bass: 1,
  };

  // helper to parse a single solfa line
  const parseLine = (line: string, part: string) => {
    const notes: any[] = [];
    if (!line) return notes;

    const bars = line.split("|");
    for (const bar of bars) {
      const beats = bar.trim().split(":");
      for (const beat of beats) {
        if (!beat) continue;

        const segments = beat.split(/[\.,;]/); // split on . , ;
        segments.forEach((seg, idx) => {
          let duration = 1;
          const s = seg.trim();
          if (!s) return;

          if (beat.includes(".")) duration = 0.5;
          else if (beat.includes(",")) duration = 0.25;
          else if (beat.includes(";")) duration = idx === 0 ? 0.25 : 0.75;

          // handle octave modifiers
          let octave = octaveMap[part];
          let note = s;

          if (s.endsWith("'")) {
            octave += 1;
            note = s.slice(0, -1);
          } else if (s.endsWith("~")) {
            octave -= 1;
            note = s.slice(0, -1);
          }

          notes.push({ note, octave, duration, key });
        });
      }
    }

    return notes;
  };

  result.soprano = parseLine(parts.soprano, "soprano");
  result.alto = parseLine(parts.alto, "alto");
  result.tenor = parseLine(parts.tenor, "tenor");
  result.bass = parseLine(parts.bass, "bass");

  return result;
};
