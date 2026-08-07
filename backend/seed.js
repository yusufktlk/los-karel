const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding LOS KAREL database...");

  // Clear existing
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.collection.deleteMany();
  await prisma.journalArticle.deleteMany();

  // Seed Collection
  const heritageCollection = await prisma.collection.create({
    data: {
      slug: "heritage-collection",
      nameTR: "Heritage Collection",
      nameEN: "Heritage Collection",
      description: "Anadolu zanaatı ve İznik çinilerinden ilham alan koleksiyon.",
    },
  });

  // Seed Products
  await prisma.product.createMany({
    data: [
      {
        slug: "iznik-heritage",
        name: "İznik Heritage Tee",
        collectionId: heritageCollection.id,
        price: 1290,
        currency: "₺",
        description:
          "İznik çini sanatının zamansız güzelliğinden ilham alan bu parça, XVI. yüzyılın çiçek motiflerini modern bir silüetle buluşturuyor. Önde minimal LOS KAREL logosu, arkada ise İznik'in ikonik lale ve karanfil motiflerinden oluşan detaylı bir sanat eseri yer alıyor.",
        story:
          "İznik, Osmanlı İmparatorluğu'nun en nadide çini atölyelerinin kalbi. XVI. yüzyılda zirveye ulaşan bu sanat formu, kobalt mavisi, firuze ve mercan kırmızısı tonlarıyla tanınır. Her bir motif, doğanın sonsuz döngüsünü ve cennetin bahçelerini simgeler. Bu tişört, o mirası bugüne taşıyor — geçmişe kök salmış, bugün için yapılmış.",
        inspiration: "Inspired by İznik Heritage · XVI. YY",
        sizes: JSON.stringify(["S", "M", "L", "XL"]),
        details: JSON.stringify([
          "250 GSM premium pamuk",
          "Oversize kesim",
          "Ribana yaka detayı",
          "Arka baskı: İznik çini motifi",
          "Ön baskı: Minimal logo",
          "Özel dokuma LOS KAREL etiketi",
          "Türkiye'de üretilmiştir",
        ]),
        tags: JSON.stringify(["İznik", "Heritage", "Çini", "Ottoman"]),
        backImage: "/products/iznik_heritage/back.png",
        frontImage: "/products/iznik_heritage/front.png",
        tshirtImage: "/products/iznik_heritage/tshirt.png",
        erkekImage: "/products/iznik_heritage/erkek.jpeg",
        kadinImage: "/products/iznik_heritage/kadın.jpeg",
        kolajImage: "/products/iznik_heritage/kolaj.jpeg",
      },
      {
        slug: "woven-heritage",
        name: "Woven Heritage Tee",
        collectionId: heritageCollection.id,
        price: 1290,
        currency: "₺",
        description:
          "Anadolu'nun kadim kilim dokuma geleneğinden ilham alan bu parça, geometrik motiflerin ritmini çağdaş moda anlayışıyla harmanlıyor. Önde minimal LOS KAREL logosu, arkada ise Anadolu kilimlerinin sembolik diliyle bezenmiş bir anlatı yer alıyor.",
        story:
          "Anadolu'nun her köyünde, her evin tezgâhında bir hikâye dokunur. Kilim motifleri, yalnızca süs değil; bereket, koruma, aşk ve umut gibi derin anlamlar taşır. Elibelinde motifi anneliği, koçboynuzu gücü, yıldızlar ise mutluluğu simgeler. Bu tişört, nesiller boyu aktarılan o sessiz dili giyilebilir bir sanata dönüştürüyor.",
        inspiration: "Inspired by Anatolian Heritage · MMXXVI",
        sizes: JSON.stringify(["S", "M", "L", "XL"]),
        details: JSON.stringify([
          "250 GSM premium pamuk",
          "Oversize kesim",
          "Ribana yaka detayı",
          "Arka baskı: Anadolu kilim motifi",
          "Ön baskı: Minimal logo",
          "Özel dokuma LOS KAREL etiketi",
          "Türkiye'de üretilmiştir",
        ]),
        tags: JSON.stringify(["Kilim", "Anatolian", "Woven", "Heritage"]),
        backImage: "/products/woven_heritage/back.png",
        frontImage: "/products/woven_heritage/front.png",
        tshirtImage: "/products/woven_heritage/tshirt.png",
        erkekImage: "/products/woven_heritage/erkek.jpeg",
        kadinImage: "/products/woven_heritage/kadın.jpeg",
        kolajImage: "/products/woven_heritage/kolaj.jpeg",
      },
    ],
  });

  // Seed Journal Articles
  await prisma.journalArticle.createMany({
    data: [
      {
        slug: "iznik-artistry-narrative",
        titleTR: "İznik Çini Sanatı: XVI. Yüzyıl Osmanlı Çiçek Motifleri",
        titleEN: "İznik Tile Art: XVI. Century Ottoman Floral Motifs",
        subtitleTR: "Kobalt mavisi ve mercan kırmızısının çağdaş kumaşlar üzerindeki yeniden doğuşu.",
        subtitleEN: "The rebirth of cobalt blue and coral red on contemporary fabrics.",
        date: "MMXXVI · OCT",
        author: "LOS KAREL Editorial",
        readTime: "4 MIN READ",
        image: "/products/iznik_heritage/kolaj.jpeg",
        contentTR: JSON.stringify([
          "İznik, Osmanlı İmparatorluğu'nun en parlak döneminde saray çiniciliğinin kalbi ve sanatsal mükemmelliğin sembolü olmuştur. XVI. yüzyılda, mimar Sinan yapılarından saray duvarlarına kadar her yerde İznik çinilerinin büyüleyici zarafeti yer alıyordu.",
          "Bu sanat biçiminin en belirgin özelliği; kobalt mavisi, firuze ve o dönemin kimyasal sır sırrı sayılan mercan kırmızısının harmonisidir. Çinilerde resmedilen lale, karanfil ve hatayi motifleri yalnızca birer doğa tasviri değil, aynı zamanda cennetin sonsuz güzelliğine duyulan ruhani bir saygıdır.",
          "LOS KAREL olarak İznik Heritage edisyonumuzda, bu kadim zanaatı çağdaş sokak modası ve minimalist gardırop anlayışıyla harmanladık. Ön yüzün sadeliği saray edebiyatının vakurluğunu temsil ederken, arka yüzdeki büyük çini kompozisyonu taşıyıcısına giyilebilir bir tarih mirası sunar."
        ]),
        contentEN: JSON.stringify([
          "İznik was the beating heart of imperial pottery and artistic perfection during the height of the Ottoman Empire. In the 16th century, from the architectural masterpieces of Mimar Sinan to palace walls, the breathtaking elegance of İznik tiles was present everywhere.",
          "The defining characteristic of this art form is the harmony of cobalt blue, turquoise, and coral red — considered a guarded secret of glaze chemistry at the time. The tulips, carnations, and hatayi motifs were not merely naturalistic drawings, but spiritual gestures toward eternal paradise.",
          "In our LOS KAREL İznik Heritage edition, we translated this ancient craft into the vocabulary of contemporary streetwear. While the minimal front represents dignified restraint, the back composition turns the wearer into a custodian of living heritage."
        ]),
      },
      {
        slug: "woven-kilim-symbolism",
        titleTR: "Anadolu Kilim Motifleri: Dokunan Dokunun Gizli Dili",
        titleEN: "Anatolian Kilim Symbols: The Hidden Language of Woven Art",
        subtitleTR: "Elibelinde, koçboynuzu ve yıldızların geometrik evreni.",
        subtitleEN: "The geometric universe of elibelinde, ram’s horn, and cosmic stars.",
        date: "MMXXVI · NOV",
        author: "LOS KAREL Editorial",
        readTime: "5 MIN READ",
        image: "/products/woven_heritage/kolaj.jpeg",
        contentTR: JSON.stringify([
          "Anadolu coğrafyasında yazılı tarihten çok önce, duygular, dualar ve koruma arzuları tezgahların üzerinde ilmik ilmik dokunurdu. Kilimler, göçebe toplulukların kişisel günlükleri ve görsel destanlarıydı.",
          "'Elibelinde' motifi dişiliği, bereketi ve analığı simgelerken; 'Koçboynuzu' motifi gücü ve kahramanlığı temsil eder. Geometrik simetri ise kozmik düzeni ve insanın doğayla olan kopmaz bağını yansıtır.",
          "Woven Heritage tişört edisyonumuzda, bu sessiz dili modern grafik tasarımın keskin çizgileriyle yeniden hayat bulmaya davet ettik. Ağır gramajlı 250 GSM pamuk zemin üzerinde, nesiller boyu aktarılan bu kutsal sembolizm bugünün sokaklarında yaşamaya devam ediyor."
        ]),
        contentEN: JSON.stringify([
          "Long before written records in Anatolian geography, emotions, prayers, and protective desires were woven knot by knot onto looms. Kilims served as personal diaries and visual epics for nomadic communities.",
          "While the 'Elibelinde' (Hands on Hips) symbol signifies femininity and fertility, the 'Koçboynuzu' (Ram's Horn) embodies strength and heroism. The sharp geometric symmetry mirrors the cosmic order.",
          "In our Woven Heritage edition, we invited this silent symbolic language to come alive through modern graphic precision. Printed on heavyweight 250 GSM cotton, these sacred motifs continue to walk the streets of today."
        ]),
      },
    ],
  });

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
