import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const publicLogoPath = path.join(process.cwd(), "public", "yuva-logo.png");
  const uploadedLogoPath = "C:\\Users\\viswa\\.gemini\\antigravity\\brain\\ab10e7cf-aa40-4e5c-bb9b-1aa6765a452e\\.user_uploaded\\media__1785480269536.jpg";

  try {
    // Always sync the latest uploaded logo to public/yuva-logo.png if uploaded logo exists
    if (fs.existsSync(uploadedLogoPath)) {
      try {
        fs.copyFileSync(uploadedLogoPath, publicLogoPath);
      } catch {
        // Ignore copy errors
      }
    }

    if (fs.existsSync(publicLogoPath)) {
      const buffer = fs.readFileSync(publicLogoPath);
      return new NextResponse(buffer, {
        headers: {
          "Content-Type": "image/jpeg",
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }

    if (fs.existsSync(uploadedLogoPath)) {
      const buffer = fs.readFileSync(uploadedLogoPath);
      return new NextResponse(buffer, {
        headers: {
          "Content-Type": "image/jpeg",
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }
  } catch {
    // Fallback error response
  }

  return new NextResponse("Yuva Naturals logo image not found", { status: 404 });
}
