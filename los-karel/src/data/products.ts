export interface Product {
  id: string;
  slug: string;
  name: string;
  collection: string;
  price: number;
  currency: string;
  description: string;
  story: string;
  details: string[];
  sizes: string[];
  images: {
    back: string;
    front: string;
    tshirt: string;
    erkek: string;
    kadin: string;
    kolaj: string;
  };
  tags: string[];
  inspiration: string;
}

export const products: Product[] = [
  {
    id: "iznik-heritage-tee",
    slug: "iznik-heritage",
    name: "İznik Heritage Tee",
    collection: "Heritage Collection",
    price: 1290,
    currency: "₺",
    description:
      "İznik çini sanatının zamansız güzelliğinden ilham alan bu parça, XVI. yüzyılın çiçek motiflerini modern bir silüetle buluşturuyor. Önde minimal LOS KAREL logosu, arkada ise İznik'in ikonik lale ve karanfil motiflerinden oluşan detaylı bir sanat eseri yer alıyor.",
    story:
      "İznik, Osmanlı İmparatorluğu'nun en nadide çini atölyelerinin kalbi. XVI. yüzyılda zirveye ulaşan bu sanat formu, kobalt mavisi, firuze ve mercan kırmızısı tonlarıyla tanınır. Her bir motif, doğanın sonsuz döngüsünü ve cennetin bahçelerini simgeler. Bu tişört, o mirası bugüne taşıyor — geçmişe kök salmış, bugün için yapılmış.",
    details: [
      "250 GSM premium pamuk",
      "Oversize kesim",
      "Ribana yaka detayı",
      "Arka baskı: İznik çini motifi",
      "Ön baskı: Minimal logo",
      "Özel dokuma LOS KAREL etiketi",
      "Türkiye'de üretilmiştir",
    ],
    sizes: ["S", "M", "L", "XL"],
    images: {
      back: "/products/iznik_heritage/back.png",
      front: "/products/iznik_heritage/front.png",
      tshirt: "/products/iznik_heritage/tshirt.png",
      erkek: "/products/iznik_heritage/erkek.jpeg",
      kadin: "/products/iznik_heritage/kadın.jpeg",
      kolaj: "/products/iznik_heritage/kolaj.jpeg",
    },
    tags: ["İznik", "Heritage", "Çini", "Ottoman"],
    inspiration: "Inspired by İznik Heritage · XVI. YY",
  },
  {
    id: "woven-heritage-tee",
    slug: "woven-heritage",
    name: "Woven Heritage Tee",
    collection: "Heritage Collection",
    price: 1290,
    currency: "₺",
    description:
      "Anadolu'nun kadim kilim dokuma geleneğinden ilham alan bu parça, geometrik motiflerin ritmini çağdaş moda anlayışıyla harmanlıyor. Önde minimal LOS KAREL logosu, arkada ise Anadolu kilimlerinin sembolik diliyle bezenmiş bir anlatı yer alıyor.",
    story:
      "Anadolu'nun her köyünde, her evin tezgâhında bir hikâye dokunur. Kilim motifleri, yalnızca süs değil; bereket, koruma, aşk ve umut gibi derin anlamlar taşır. Elibelinde motifi anneliği, koçboynuzu gücü, yıldızlar ise mutluluğu simgeler. Bu tişört, nesiller boyu aktarılan o sessiz dili giyilebilir bir sanata dönüştürüyor.",
    details: [
      "250 GSM premium pamuk",
      "Oversize kesim",
      "Ribana yaka detayı",
      "Arka baskı: Anadolu kilim motifi",
      "Ön baskı: Minimal logo",
      "Özel dokuma LOS KAREL etiketi",
      "Türkiye'de üretilmiştir",
    ],
    sizes: ["S", "M", "L", "XL"],
    images: {
      back: "/products/woven_heritage/back.png",
      front: "/products/woven_heritage/front.png",
      tshirt: "/products/woven_heritage/tshirt.png",
      erkek: "/products/woven_heritage/erkek.jpeg",
      kadin: "/products/woven_heritage/kadın.jpeg",
      kolaj: "/products/woven_heritage/kolaj.jpeg",
    },
    tags: ["Kilim", "Anatolian", "Woven", "Heritage"],
    inspiration: "Inspired by Anatolian Heritage · MMXXVI",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAllProducts(): Product[] {
  return products;
}
