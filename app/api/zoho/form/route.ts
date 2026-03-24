import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.text();

    const zohoResponse = await fetch("https://forms.zohopublic.com/supportlmswche1/form/TutorSessionForm/formperma/clkmFlCsBWcs_3ijVWHEwLI2326IGqt6OivE5dcgwaI/htmlRecords/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });

    const responseText = await zohoResponse.text();

    if (zohoResponse.ok && responseText.toLowerCase().includes("thank you")) {
      return NextResponse.json({ success: true, message: "Form submitted successfully!" });
    }

    return NextResponse.json({ success: false, message: "Form submission failed", response: responseText });
  } catch (error) {
    console.error("Zoho Form Submit Error:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error", error });
  }
}
