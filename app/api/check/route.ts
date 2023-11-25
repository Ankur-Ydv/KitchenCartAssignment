import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const url = searchParams.get("url") as string;
    const response = await fetch(url);
    const html = await response.text();

    const regex = /<a[^>]+href=["'](https?:\/\/[^"']+)["'][^>]*>/g;
    const links: string[] = [];
    let match;

    while ((match = regex.exec(html)) !== null) {
      links.push(match[1]);
    }

    const validLinks: string[] = [];
    const results = await Promise.all(
      links.map(async (link) => {
        try {
          const linkResponse = await fetch(link);
          if (!linkResponse.ok) {
            return link;
          }
          validLinks.push(link);
          return null;
        } catch (error) {
          console.error("Error checking link:", error);
          return null;
        }
      })
    );

    const brokenLinks = results.filter((link) => link !== null);
    return NextResponse.json({ brokenLinks, validLinks }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
