import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;
  const brainDir = "C:\\Users\\viswa\\.gemini\\antigravity\\brain\\01c25777-f23e-4bea-82a7-f08965334f44";
  const publicProductsDir = path.join(process.cwd(), "public", "products");

  if (!fs.existsSync(publicProductsDir)) {
    try {
      fs.mkdirSync(publicProductsDir, { recursive: true });
    } catch {
      // Ignore directory creation error
    }
  }

  // Check public directory first
  const publicPathJpg = path.join(publicProductsDir, `${name}.jpg`);
  const publicPathPng = path.join(publicProductsDir, `${name}.png`);

  if (fs.existsSync(publicPathJpg)) {
    const buffer = fs.readFileSync(publicPathJpg);
    return new NextResponse(buffer, {
      headers: { "Content-Type": "image/jpeg", "Cache-Control": "public, max-age=31536000, immutable" },
    });
  }
  if (fs.existsSync(publicPathPng)) {
    const buffer = fs.readFileSync(publicPathPng);
    return new NextResponse(buffer, {
      headers: { "Content-Type": "image/png", "Cache-Control": "public, max-age=31536000, immutable" },
    });
  }

  // Check brain directory for generated images matching pattern
  if (fs.existsSync(brainDir)) {
    try {
      const files = fs.readdirSync(brainDir);
      const matchingFile = files.find((f) => f.startsWith(name) && (f.endsWith(".jpg") || f.endsWith(".png")));

      if (matchingFile) {
        const fullPath = path.join(brainDir, matchingFile);
        const ext = matchingFile.endsWith(".png") ? ".png" : ".jpg";
        const destPath = path.join(publicProductsDir, `${name}${ext}`);

        try {
          fs.copyFileSync(fullPath, destPath);
        } catch {
          // Ignore copy error
        }

        const buffer = fs.readFileSync(fullPath);
        const contentType = ext === ".png" ? "image/png" : "image/jpeg";

        return new NextResponse(buffer, {
          headers: { "Content-Type": contentType, "Cache-Control": "public, max-age=31536000, immutable" },
        });
      }
    } catch {
      // Fallback below
    }
  }

  return new NextResponse("Image not found", { status: 404 });
}
