import { prisma } from "../lib/db/prisma";

async function main() {
  console.log("Starting media attachment to Projects & Products...");

  const allMedia = await prisma.media.findMany({
    orderBy: { createdAt: "desc" },
    take: 30
  });

  const mediaMap = new Map(allMedia.map((m) => [m.id, m]));
  console.log(`Loaded ${allMedia.length} recent media records.`);

  // 1. NS Elevators & Vertix Live Installations Showcase
  const nsProject = await prisma.project.findFirst({ where: { slug: "ns-elevators-live-installations" } });
  if (nsProject) {
    await prisma.projectMedia.deleteMany({ where: { projectId: nsProject.id } });
    console.log("Attaching media to:", nsProject.name);

    // Primary cover and video
    const coverId = "cmuk2hmaz000vlc2aq6h0ndf7"; // on-site image
    const mainVideoId = "cmuk2fez40007lc2an6yz9f33"; // 27.6MB video

    await prisma.projectMedia.create({ data: { projectId: nsProject.id, mediaId: coverId, role: "COVER", sortOrder: 0 } });
    await prisma.projectMedia.create({ data: { projectId: nsProject.id, mediaId: mainVideoId, role: "VIDEO", sortOrder: 1 } });

    // Gallery with all other videos & images
    let order = 2;
    for (const m of allMedia) {
      if (m.id !== coverId && m.id !== mainVideoId) {
        await prisma.projectMedia.create({
          data: { projectId: nsProject.id, mediaId: m.id, role: "GALLERY", sortOrder: order++ }
        });
      }
    }
    console.log(`Attached ${order} media items to ${nsProject.name}`);
  }

  // 2. Skyline Prestige Corporate Tower
  const skylineProject = await prisma.project.findFirst({ where: { slug: "skyline-prestige-tower" } });
  if (skylineProject) {
    await prisma.projectMedia.deleteMany({ where: { projectId: skylineProject.id } });
    const coverId = "cmuk2ieje0015lc2aqhf7yaog";
    const videoId = "cmuk2h0o3000plc2a4e5ko8q2";
    await prisma.projectMedia.create({ data: { projectId: skylineProject.id, mediaId: coverId, role: "COVER", sortOrder: 0 } });
    await prisma.projectMedia.create({ data: { projectId: skylineProject.id, mediaId: videoId, role: "VIDEO", sortOrder: 1 } });
    const galleryIds = ["cmuk2igl40019lc2akwu3dz91", "cmuk2guwg000llc2aqawlw728", "cmuk2f14b0001lc2agvybmf3s"];
    for (let i = 0; i < galleryIds.length; i++) {
      if (mediaMap.has(galleryIds[i])) {
        await prisma.projectMedia.create({ data: { projectId: skylineProject.id, mediaId: galleryIds[i], role: "GALLERY", sortOrder: i + 2 } });
      }
    }
    console.log(`Attached media to ${skylineProject.name}`);
  }

  // 3. The Elysium Luxury Villa Estate
  const elysiumProject = await prisma.project.findFirst({ where: { slug: "elysium-residence-villa" } });
  if (elysiumProject) {
    await prisma.projectMedia.deleteMany({ where: { projectId: elysiumProject.id } });
    const coverId = "cmuk2hlab000tlc2afl6p9uo7";
    const videoId = "cmuk2hq17000zlc2assg37tcp";
    await prisma.projectMedia.create({ data: { projectId: elysiumProject.id, mediaId: coverId, role: "COVER", sortOrder: 0 } });
    await prisma.projectMedia.create({ data: { projectId: elysiumProject.id, mediaId: videoId, role: "VIDEO", sortOrder: 1 } });
    const galleryIds = ["cmuk2ihhl001blc2a7gihe6hu", "cmuk2g2st000blc2akunbyagd", "cmuk2g8qt000flc2aw18noj0u"];
    for (let i = 0; i < galleryIds.length; i++) {
      if (mediaMap.has(galleryIds[i])) {
        await prisma.projectMedia.create({ data: { projectId: elysiumProject.id, mediaId: galleryIds[i], role: "GALLERY", sortOrder: i + 2 } });
      }
    }
    console.log(`Attached media to ${elysiumProject.name}`);
  }

  // Products mapping
  const productMappings = [
    {
      slugs: ["passenger-lift"],
      main: "cmuk2hmaz000vlc2aq6h0ndf7",
      video: "cmuk2h0o3000plc2a4e5ko8q2",
      gallery: ["cmuk2ieje0015lc2aqhf7yaog", "cmuk2gxgh000nlc2a0jgt2p2d", "cmuk2f14b0001lc2agvybmf3s"]
    },
    {
      slugs: ["home-lift"],
      main: "cmuk2hlab000tlc2afl6p9uo7",
      video: "cmuk2hq17000zlc2assg37tcp",
      gallery: ["cmuk2ixyg001flc2a2ucoj7wc", "cmuk2g8qt000flc2aw18noj0u", "cmuk2g2st000blc2akunbyagd"]
    },
    {
      slugs: ["hospital-lift"],
      main: "cmuk2ifkv0017lc2ablq1pzea",
      video: "cmuk2hrsp0011lc2a80lsufaa",
      gallery: ["cmuk2idd60013lc2a363mb5ii", "cmuk2gr99000jlc2at7lcqj8s"]
    },
    {
      slugs: ["hydraulic-lift", "hydraulic-elevators"],
      main: "cmuk2ix2a001dlc2aj7kif58l",
      video: "cmuk2gavc000hlc2arz8k93kc",
      gallery: ["cmuk2g5hl000dlc2alz9c9ekf", "cmuk2f86p0005lc2a9qzutcae"]
    },
    {
      slugs: ["goods-lift", "goods-elevators", "freight-elevators"],
      main: "cmuk2igl40019lc2akwu3dz91",
      video: "cmuk2f86p0005lc2a9qzutcae",
      gallery: ["cmuk2f4po0003lc2add1zmtr9", "cmuk2kxwrrrh5i0fn7y8aqilx"]
    },
    {
      slugs: ["mrl-lift", "mrl-elevators"],
      main: "cmuk2ihhl001blc2a7gihe6hu",
      video: "cmuk2g01k0009lc2a1p8gir4j",
      gallery: ["cmuk2h28g000rlc2aglc4h8cv", "cmuk2guwg000llc2aqawlw728"]
    }
  ];

  for (const mapping of productMappings) {
    for (const slug of mapping.slugs) {
      const product = await prisma.product.findFirst({ where: { slug } });
      if (!product) continue;
      await prisma.productMedia.deleteMany({ where: { productId: product.id } });

      if (mediaMap.has(mapping.main)) {
        await prisma.productMedia.create({
          data: { productId: product.id, mediaId: mapping.main, role: "MAIN", sortOrder: 0 }
        });
      }
      if (mapping.video && mediaMap.has(mapping.video)) {
        await prisma.productMedia.create({
          data: { productId: product.id, mediaId: mapping.video, role: "VIDEO", sortOrder: 1 }
        });
      }
      for (let i = 0; i < mapping.gallery.length; i++) {
        const gId = mapping.gallery[i];
        if (mediaMap.has(gId)) {
          await prisma.productMedia.create({
            data: { productId: product.id, mediaId: gId, role: "GALLERY", sortOrder: i + 2 }
          });
        }
      }
      console.log(`Attached media to product: ${product.name} (${slug})`);
    }
  }

  console.log("All media successfully attached to Projects & Products!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
