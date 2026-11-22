import fs from "fs";
import sharp from "sharp";

async function run() {
  const imgPath = "C:/Users/siddc/.gemini/antigravity/brain/8b3df4c0-e7e5-4976-b8b2-d45fd33ba7dc/.user_uploaded/media_1795321592278_f1f93f21.jpg";
  if (fs.existsSync(imgPath)) {
    const metadata = await sharp(imgPath).metadata();
    console.log("Image size:", metadata.width, "x", metadata.height);

    // Save full building image for clinic exterior into public/images/clinic-exterior.jpg
    await sharp(imgPath)
      .resize({ width: 1200 })
      .jpeg({ quality: 85 })
      .toFile("public/images/clinic-exterior.jpg");

    // Crop signboard main banner
    await sharp(imgPath)
      .extract({
        left: 0,
        top: Math.round(metadata.height * 0.18),
        width: metadata.width,
        height: Math.round(metadata.height * 0.26)
      })
      .toFile("public/images/signboard-banner.jpg");

    // Doctor left (Dr. Anant Kore)
    await sharp(imgPath)
      .extract({
        left: Math.round(metadata.width * 0.03),
        top: Math.round(metadata.height * 0.26),
        width: Math.round(metadata.width * 0.32),
        height: Math.round(metadata.height * 0.08)
      })
      .toFile("public/images/doctor-anant-crop.jpg");

    // Doctor right (Dr. Kiran Kore)
    await sharp(imgPath)
      .extract({
        left: Math.round(metadata.width * 0.65),
        top: Math.round(metadata.height * 0.34),
        width: Math.round(metadata.width * 0.32),
        height: Math.round(metadata.height * 0.09)
      })
      .toFile("public/images/doctor-kiran-crop.jpg");

    // Address bottom banner
    await sharp(imgPath)
      .extract({
        left: Math.round(metadata.width * 0.08),
        top: Math.round(metadata.height * 0.32),
        width: Math.round(metadata.width * 0.82),
        height: Math.round(metadata.height * 0.12)
      })
      .toFile("public/images/address-banner-crop.jpg");

    // Small wall board on the right
    await sharp(imgPath)
      .extract({
        left: Math.round(metadata.width * 0.83),
        top: Math.round(metadata.height * 0.53),
        width: Math.round(metadata.width * 0.14),
        height: Math.round(metadata.height * 0.22)
      })
      .toFile("public/images/wall-board-crop.jpg");

    console.log("All crops saved to public/images!");
  } else {
    console.log("File does not exist:", imgPath);
  }
}

run().catch(console.error);
