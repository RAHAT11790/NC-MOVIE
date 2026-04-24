const IMGBB_API_KEY = "a26bed1b2fd07ba03bff75343d0834fe";

export async function uploadToImgbb(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("key", IMGBB_API_KEY);

  const res = await fetch("https://api.imgbb.com/1/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("ImgBB upload failed");
  }

  const json = await res.json();
  if (!json.data?.url) {
    throw new Error("ImgBB: no URL returned");
  }

  return json.data.url;
}
