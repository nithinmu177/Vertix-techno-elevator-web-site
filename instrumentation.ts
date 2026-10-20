export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Only run keep-alive in production
    if (process.env.NODE_ENV === "production") {
      const siteUrl = (
        process.env.NEXT_PUBLIC_SITE_URL ||
        process.env.NEXTAUTH_URL ||
        "https://vertix-techno-elevator-web-site.onrender.com"
      ).replace(/\/$/, "");

      const PING_INTERVAL_MS = 10 * 60 * 1000; // 10 minutes (Render sleeps after 15 minutes)

      console.log(`[Render Keep-Alive] Initializing background self-ping loop targeting ${siteUrl}/api/health every 10 minutes.`);

      // Initial ping after 1 minute of starting up
      setTimeout(() => {
        ping(siteUrl);
      }, 60 * 1000);

      // Recurring ping every 10 minutes
      setInterval(() => {
        ping(siteUrl);
      }, PING_INTERVAL_MS);
    }
  }
}

async function ping(siteUrl: string) {
  try {
    const res = await fetch(`${siteUrl}/api/health`, {
      headers: { "x-keep-alive": "true" },
      cache: "no-store"
    });
    console.log(`[Render Keep-Alive] Ping successful! Status: ${res.status}`);
  } catch (error) {
    console.error("[Render Keep-Alive] Ping request encountered an error:", error);
  }
}
