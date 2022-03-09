import * as z from "zod"
import { Locale } from "@prisma/client"

export const ProductModel = z.object({
  id: z.number().int(),
  title: z.string(),
  price: z.string(),
  stripePriceId: z.string(),
  locale: z.nativeEnum(Locale),
  imageUrl: z.string(),
})
