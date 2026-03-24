const CLIENT_ID = process.env.CLIENT_ID as string;
const CLIENT_SECRET = process.env.CLIENT_SECRET as string;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN as string;

export async function getZohoOAuthToken() {
    if (!REFRESH_TOKEN) {
        console.log("Missing refresh token in env")
        return;
    }

    const params = new URLSearchParams();
    params.append("refresh_token", REFRESH_TOKEN);
    params.append("client_id", CLIENT_ID);
    params.append("client_secret", CLIENT_SECRET);
    params.append("grant_type", "refresh_token");

    try {
        const response = await fetch("https://accounts.zoho.com/oauth/v2/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params.toString(),
        });

        const data = await response.json();

        if (data.access_token) {
            console.log("✅ Refreshed Access Token:", data.access_token);
            return data.access_token;
        } else {
            console.log("Failed to refresh token");
        }
    } catch (err) {
        console.log("Something went wrong");
    }
}
