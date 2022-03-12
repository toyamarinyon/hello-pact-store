import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const productsCount = await prisma.product.count();
  if (productsCount === 0) {
    await prisma.product.createMany({
      data: [
        {
          title: "Handmade Hair Tie",
          price: "$3.00",
          stripePriceId: "price_1KbQQXJMuLcK5nTcV2H8BT97",
          locale: "en",
          imageUrl: "hair01.jpeg",
        },
        {
          title: "〈入園式にもピッタリ♪〉 春に映えるヘアゴム 苺色",
          price: "￥300",
          stripePriceId: "price_1KbPQcJMuLcK5nTchC1dzJpa",
          locale: "jp",
          imageUrl: "hair01.jpeg",
        },
        {
          title: "Handmade Pin",
          price: "$3.00",
          stripePriceId: "price_1KbQLyJMuLcK5nTcZDTkTCUM",
          locale: "en",
          imageUrl: "hair02.jpeg",
        },
        {
          title: "おめめパッチリ☆メガネバッチ",
          price: "￥300",
          stripePriceId: "price_1KbQRLJMuLcK5nTcmE15TFWl",
          locale: "jp",
          imageUrl: "hair02.jpeg",
        },
      ],
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
