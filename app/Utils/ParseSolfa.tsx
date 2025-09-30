function parseSolfa(solfaLine:string) {
  const result = [];
  const bars = solfaLine.split("|");

  for (const bar of bars) {
    const beats = bar.trim().split(":");

    for (const beat of beats) {
      if (!beat) continue;

      if (beat.includes(".")) {
        beat.split(".").forEach(n => result.push({ note: n.trim(), duration: 0.5 }));
      } 
      else if (beat.includes(",")) {
        beat.split(",").forEach(n => result.push({ note: n.trim(), duration: 0.25 }));
      } 
      else if (beat.includes(";")) {
        const [n1, n2] = beat.split(";");
        result.push({ note: n1.trim(), duration: 0.25 });
        result.push({ note: n2.trim(), duration: 0.75 });
      } 
      else {
        result.push({ note: beat.trim(), duration: 1 });
      }
    }
  }

  return result;
}

const parsed = parseSolfa("d:d.r:m.m:f;s: | l,f.s,f:m.m:d:r.t |");
console.log(parsed);


// Example output after parsing
// const songData = [
//   { note: "d", duration: 1 },
//   { note: "d", duration: 0.5 },
//   { note: "r", duration: 0.5 },
//   { note: "m", duration: 0.5 },
//   { note: "m", duration: 0.5 },
//   { note: "f", duration: 0.25 },
//   { note: "s", duration: 0.75 },
//   { note: "l", duration: 0.25 },
//   { note: "f", duration: 0.25 },
//   { note: "s", duration: 0.25 },
//   { note: "f", duration: 0.25 },
//   { note: "m", duration: 0.5 },
//   { note: "m", duration: 0.5 },
//   { note: "d", duration: 1 },
//   { note: "r", duration: 1 },
//   { note: "t", duration: 1 }
// ];

