export interface Article {
  id: string;
  slug: string;
  titleTR: string;
  titleEN: string;
  subtitleTR: string;
  subtitleEN: string;
  date: string;
  author: string;
  readTime: string;
  image: string;
  contentTR: string[];
  contentEN: string[];
  relatedProductSlug?: string;
}

export const articles: Article[] = [
  {
    id: "iznik-artistry-narrative",
    slug: "iznik-artistry-narrative",
    titleTR: "İznik Çini Sanatı: XVI. Yüzyıl Osmanlı Çiçek Motifleri",
    titleEN: "İznik Tile Art: XVI. Century Ottoman Floral Motifs",
    subtitleTR: "Kobalt mavisi ve mercan kırmızısının çağdaş kumaşlar üzerindeki yeniden doğuşu.",
    subtitleEN: "The rebirth of cobalt blue and coral red on contemporary fabrics.",
    date: "MMXXVI · OCT",
    author: "LOS KAREL Editorial",
    readTime: "4 MIN READ",
    image: "/products/iznik_heritage/kolaj.jpeg",
    relatedProductSlug: "iznik-heritage",
    contentTR: [
      "İznik, Osmanlı İmparatorluğu'nun en parlak döneminde saray çiniciliğinin kalbi ve sanatsal mükemmelliğin sembolü olmuştur. XVI. yüzyılda, mimar Sinan yapılarından saray duvarlarına kadar her yerde İznik çinilerinin büyüleyici zarafeti yer alıyordu.",
      "Bu sanat biçiminin en belirgin özelliği; kobalt mavisi, firuze ve o dönemin kimyasal sır sırrı sayılan mercan kırmızısının harmonisidir. Çinilerde resmedilen lale, karanfil ve hatayi motifleri yalnızca birer doğa tasviri değil, aynı zamanda cennetin sonsuz güzelliğine duyulan ruhani bir saygıdır.",
      "LOS KAREL olarak İznik Heritage edisyonumuzda, bu kadim zanaatı çağdaş sokak modası ve minimalist gardırop anlayışıyla harmanladık. Ön yüzün sadeliği saray edebiyatının vakurluğunu temsil ederken, arka yüzdeki büyük çini kompozisyonu taşıyıcısına giyilebilir bir tarih mirası sunar."
    ],
    contentEN: [
      "İznik was the beating heart of imperial pottery and artistic perfection during the height of the Ottoman Empire. In the 16th century, from the architectural masterpieces of Mimar Sinan to palace walls, the breathtaking elegance of İznik tiles was present everywhere.",
      "The defining characteristic of this art form is the harmony of cobalt blue, turquoise, and coral red — considered a guarded secret of glaze chemistry at the time. The tulips, carnations, and hatayi motifs were not merely naturalistic drawings, but spiritual gestures toward eternal paradise.",
      "In our LOS KAREL İznik Heritage edition, we translated this ancient craft into the vocabulary of contemporary streetwear. While the minimal front represents dignified restraint, the back composition turns the wearer into a custodian of living heritage."
    ]
  },
  {
    id: "woven-kilim-symbolism",
    slug: "woven-kilim-symbolism",
    titleTR: "Anadolu Kilim Motifleri: Dokunan Dokunun Gizli Dili",
    titleEN: "Anatolian Kilim Symbols: The Hidden Language of Woven Art",
    subtitleTR: "Elibelinde, koçboynuzu ve yıldızların geometrik evreni.",
    subtitleEN: "The geometric universe of elibelinde, ram’s horn, and cosmic stars.",
    date: "MMXXVI · NOV",
    author: "LOS KAREL Editorial",
    readTime: "5 MIN READ",
    image: "/products/woven_heritage/kolaj.jpeg",
    relatedProductSlug: "woven-heritage",
    contentTR: [
      "Anadolu coğrafyasında yazılı tarihten çok önce, duygular, dualar ve koruma arzuları tezgahların üzerinde ilmik ilmik dokunurdu. Kilimler, göçebe toplulukların kişisel günlükleri ve görsel destanlarıydı.",
      "'Elibelinde' motifi dişiliği, bereketi ve analığı simgelerken; 'Koçboynuzu' motifi gücü ve kahramanlığı temsil eder. Geometrik simetri ise kozmik düzeni ve insanın doğayla olan kopmaz bağını yansıtır.",
      "Woven Heritage tişört edisyonumuzda, bu sessiz dili modern grafik tasarımın keskin çizgileriyle yeniden hayat bulmaya davet ettik. Ağır gramajlı 250 GSM pamuk zemin üzerinde, nesiller boyu aktarılan bu kutsal sembolizm bugünün sokaklarında yaşamaya devam ediyor."
    ],
    contentEN: [
      "Long before written records in Anatolian geography, emotions, prayers, and protective desires were woven knot by knot onto looms. Kilims served as personal diaries and visual epics for nomadic communities.",
      "While the 'Elibelinde' (Hands on Hips) symbol signifies femininity and fertility, the 'Koçboynuzu' (Ram's Horn) embodies strength and heroism. The sharp geometric symmetry mirrors the cosmic order.",
      "In our Woven Heritage edition, we invited this silent symbolic language to come alive through modern graphic precision. Printed on heavyweight 250 GSM cotton, these sacred motifs continue to walk the streets of today."
    ]
  }
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
