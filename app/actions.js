"use server";

const engineId = "stable-diffusion-v1-6";
const apiHost = process.env.API_HOST ?? "https://api.stability.ai";
const apiKey = process.env.STABILITY_API_KEY;

export async function generateImage(detail) {
  if (!apiKey) throw new Error("Missing Stability API key.");

  const response = await fetch(
    `${apiHost}/v1/generation/${engineId}/text-to-image`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        text_prompts: [
          {
            text: `${detail}`,
          },
        ],
        cfg_scale: 7,
        height: 1024,
        width: 1024,
        steps: 30,
        samples: 1,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Non-200 response: ${await response.text()}`);
  }

  /** @type {{ artifacts: { base64: string, seed: number, finishReason: string }[] }} */
  const responseJSON = await response.json();

  // Store the final output in a variable
  const generatedImages = responseJSON.artifacts.map((image) => ({
    base64: image.base64,
    seed: image.seed,
    finishReason: image.finishReason,
  }));

  return generatedImages;
}

// FETCH FONT FROM GOOGLE
export async function getFontFamilies() {
  const apiKey = process.env.GOOGLE_API_KEY; // Ensure your API key is stored in .env.local
  const response = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}&sort=popularity`);
  const data = await response.json();
  const fontFamilies = data.items.map(font => font.family);
  return fontFamilies;
}
