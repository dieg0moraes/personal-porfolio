import { TwitterApi } from "twitter-api-v2";

function getTwitterClient(): TwitterApi | null {
  const apiKey = process.env.X_API_KEY;
  const apiSecret = process.env.X_API_SECRET;
  const accessToken = process.env.X_ACCESS_TOKEN;
  const accessTokenSecret = process.env.X_ACCESS_TOKEN_SECRET;

  if (!apiKey || !apiSecret || !accessToken || !accessTokenSecret) {
    console.error("Twitter API credentials not configured");
    return null;
  }

  return new TwitterApi({
    appKey: apiKey,
    appSecret: apiSecret,
    accessToken: accessToken,
    accessSecret: accessTokenSecret,
  });
}

export async function postToX(
  title: string,
  slug: string,
  tags: string[]
): Promise<string | null> {
  const client = getTwitterClient();

  if (!client) {
    return null;
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://techbydie.dev";
  const thoughtUrl = `${siteUrl}/thoughts/${slug}`;

  const hashtags = tags.length > 0 ? `\n\n${tags.map((t) => `#${t}`).join(" ")}` : "";
  const tweet = `${title}\n\n${thoughtUrl}${hashtags}`;

  // Ensure tweet is within character limit
  const maxLength = 280;
  const truncatedTweet =
    tweet.length > maxLength ? tweet.substring(0, maxLength - 3) + "..." : tweet;

  try {
    const response = await client.v2.tweet(truncatedTweet);
    return response.data.id;
  } catch (error) {
    console.error("Error posting to X:", error);
    return null;
  }
}
