import sharp from "sharp";
import fs from "fs";
import path from "path";

const PUBLIC_DIR = path.join(process.cwd(), "public", "images");

// Ensure directories exist
const dirs = [
  path.join(PUBLIC_DIR, "doctors"),
  path.join(PUBLIC_DIR, "treatments"),
  path.join(PUBLIC_DIR, "gallery"),
  path.join(PUBLIC_DIR, "reviews"),
];

for (const d of dirs) {
  if (!fs.existsSync(d)) {
    fs.mkdirSync(d, { recursive: true });
  }
}

async function downloadAndSave(url, targetPath, width, height) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error ${res.status} for ${url}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    let pipeline = sharp(buffer);
    if (width && height) {
      pipeline = pipeline.resize(width, height, { fit: "cover", position: "center" });
    }
    await pipeline.webp({ quality: 85 }).toFile(targetPath);
    console.log(`Saved: ${targetPath}`);
  } catch (err) {
    console.error(`Failed to process ${targetPath}:`, err.message);
  }
}

async function processLocal(sourcePath, targetPath, width, height) {
  try {
    if (!fs.existsSync(sourcePath)) {
      console.warn(`Source not found: ${sourcePath}`);
      return;
    }
    let pipeline = sharp(sourcePath);
    if (width && height) {
      pipeline = pipeline.resize(width, height, { fit: "cover", position: "center" });
    }
    await pipeline.webp({ quality: 88 }).toFile(targetPath);
    console.log(`Processed local: ${targetPath}`);
  } catch (err) {
    console.error(`Failed local processing ${targetPath}:`, err.message);
  }
}

async function main() {
  console.log("Preparing dental website image assets...");

  // 1. Process Hero Images
  const heroSrc = path.join(PUBLIC_DIR, "dental-hero.jpg");
  await processLocal(heroSrc, path.join(PUBLIC_DIR, "hero-desktop.webp"), 1600, 900);
  await processLocal(heroSrc, path.join(PUBLIC_DIR, "hero-mobile.webp"), 800, 1000);

  // 2. Process Clinic Interior
  const interiorSrc = path.join(PUBLIC_DIR, "clinic-interior.jpg");
  await processLocal(interiorSrc, path.join(PUBLIC_DIR, "clinic-interior.webp"), 1200, 800);
  await processLocal(interiorSrc, path.join(PUBLIC_DIR, "cta-banner.webp"), 1600, 700);

  // 3. Process Dr. Ananya Roy
  const drAnanyaSrc = path.join(PUBLIC_DIR, "doctor-ananya-roy.jpg");
  await processLocal(drAnanyaSrc, path.join(PUBLIC_DIR, "doctors", "dr-ananya-roy.webp"), 480, 600);

  // 4. Curated Dental Specialists
  // Dr. Vikram Singhania - Experienced Male Implantologist
  await downloadAndSave(
    "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80",
    path.join(PUBLIC_DIR, "doctors", "dr-vikram-singhania.webp"),
    480,
    600
  );

  // Dr. Neha Kapoor - Female Endodontist
  await downloadAndSave(
    "https://images.unsplash.com/photo-1594824813589-9a2cfb2d18da?auto=format&fit=crop&w=600&q=80",
    path.join(PUBLIC_DIR, "doctors", "dr-neha-kapoor.webp"),
    480,
    600
  );

  // Dr. Siddharth Verma - Pediatric Dentist
  await downloadAndSave(
    "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80",
    path.join(PUBLIC_DIR, "doctors", "dr-siddharth-verma.webp"),
    480,
    600
  );

  // 5. 9 Dental Treatments
  const treatments = [
    {
      slug: "dental-implants",
      url: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
    },
    {
      slug: "braces-and-aligners",
      url: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80",
    },
    {
      slug: "root-canal",
      url: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80",
    },
    {
      slug: "teeth-whitening",
      url: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=800&q=80",
    },
    {
      slug: "smile-design-veneers",
      url: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&w=800&q=80",
    },
    {
      slug: "pediatric-dentistry",
      url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
    },
    {
      slug: "gum-treatment",
      url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80",
    },
    {
      slug: "wisdom-tooth-removal",
      url: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
    },
    {
      slug: "dentures-and-crowns",
      url: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80",
    },
  ];

  for (const t of treatments) {
    await downloadAndSave(
      t.url,
      path.join(PUBLIC_DIR, "treatments", `${t.slug}.webp`),
      800,
      500
    );
  }

  // 6. Before / After Gallery Images (6 Cases)
  // Case 1: Aligners
  await downloadAndSave(
    "https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&w=600&q=80",
    path.join(PUBLIC_DIR, "gallery", "case-1-before.webp"),
    600,
    600
  );
  await downloadAndSave(
    "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=600&q=80",
    path.join(PUBLIC_DIR, "gallery", "case-1-after.webp"),
    600,
    600
  );

  // Case 2: Implants
  await downloadAndSave(
    "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80",
    path.join(PUBLIC_DIR, "gallery", "case-2-before.webp"),
    600,
    600
  );
  await downloadAndSave(
    "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=600&q=80",
    path.join(PUBLIC_DIR, "gallery", "case-2-after.webp"),
    600,
    600
  );

  // Case 3: Veneers
  await downloadAndSave(
    "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=600&q=80",
    path.join(PUBLIC_DIR, "gallery", "case-3-before.webp"),
    600,
    600
  );
  await downloadAndSave(
    "https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&w=600&q=80",
    path.join(PUBLIC_DIR, "gallery", "case-3-after.webp"),
    600,
    600
  );

  // Case 4: Whitening
  await downloadAndSave(
    "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=600&q=80",
    path.join(PUBLIC_DIR, "gallery", "case-4-before.webp"),
    600,
    600
  );
  await downloadAndSave(
    "https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&w=600&q=80",
    path.join(PUBLIC_DIR, "gallery", "case-4-after.webp"),
    600,
    600
  );

  // 7. Patient Review Avatars
  const reviews = [
    {
      id: "rev-1",
      url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
    {
      id: "rev-2",
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    },
    {
      id: "rev-3",
      url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    },
    {
      id: "rev-4",
      url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    },
  ];

  for (const r of reviews) {
    await downloadAndSave(
      r.url,
      path.join(PUBLIC_DIR, "reviews", `${r.id}.webp`),
      150,
      150
    );
  }

  console.log("All dental assets prepared successfully!");
}

main().catch(console.error);
