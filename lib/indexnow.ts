export async function submitToIndexNow(urls: string[]) {
  try {
    if (!Array.isArray(urls) || urls.length === 0) {
      console.warn("IndexNow: no URLs to submit");
      return { ok: false, message: "no urls" };
    }

    const body = {
      host: "www.thedentistryinsight.com",
      key: "7e153f499fa84bd5b5f68f7d1aa0735c",
      keyLocation: "https://www.thedentistryinsight.com/7e153f499fa84bd5b5f68f7d1aa0735c.txt",
      urlList: urls,
    };

    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const text = await res.text();
    if (!res.ok) {
      console.error("IndexNow submission failed:", res.status, text);
      return { ok: false, status: res.status, text };
    }

    return { ok: true, status: res.status, text };
  } catch (err) {
    console.error("IndexNow submission error:", err);
    return { ok: false, error: String(err) };
  }
}
