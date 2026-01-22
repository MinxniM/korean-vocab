export async function onRequest(context) {
  try {
    const GITHUB_JSON =
      "https://raw.githubusercontent.com/vbvss199/Language-Learning-decks/main/korean/korean.json";

    const res = await fetch(GITHUB_JSON, {
      cf: { cacheTtl: 3600, cacheEverything: true }
    });

    if (!res.ok) {
      return new Response("Failed to fetch vocab data", { status: 500 });
    }

    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) {
      return new Response("Invalid vocab data", { status: 500 });
    }

    const random = data[Math.floor(Math.random() * data.length)];

    const safeWord = {
      word: random.word,
      romanization: random.romanization,
      english_translation: random.english_translation,
      pos: random.pos,
      cefr_level: random.cefr_level,
      example_sentence_native: random.example_sentence_native,
      example_sentence_english: random.example_sentence_english
    };

    return new Response(JSON.stringify(safeWord), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (err) {
    return new Response("Server error", { status: 500 });
  }
}
