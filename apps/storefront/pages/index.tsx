import type { NextPage } from "next";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";
import useSWR from "swr";
import jp from "../locales/jp";
import en from "../locales/en";
import { browserEnv } from "../env/browser";
import {
  apiFetcher,
  createCheckoutSession,
  createCheckoutSessionsScheme,
  productsScheme,
} from "../lib/fetcher";

loadStripe(browserEnv.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const Home: NextPage = () => {
  const router = useRouter();
  const locale = router.locale;
  const t = locale === "jp" ? jp : en;
  const { data, error } = useSWR(
    { url: "/api/products", query: { locale } },
    apiFetcher(productsScheme)
  );
  if (error) return <div>{error}</div>;
  if (!data) return <div>loading...</div>;
  return (
    <div className="flex min-h-screen bg-red-50 flex-col">
      <Head>
        <title>Demo Shop</title>
        <meta name="description" content="Demo Shop powered by Stripe" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative px-8 py-8">
        <div className="flex justify-between">
          <Image src="/logo.png" width={"349"} height={44} alt="logo" />
          <select
            className="bg-transparent text-gray-600"
            onChange={(e) => {
              const locale = e.target.value;
              router.push(router.pathname, router.asPath, { locale });
            }}
            value={locale}
          >
            <option value="en">English</option>
            <option value="jp">日本語</option>
          </select>
        </div>
      </div>
      <div className="flex justify-center md:items-center flex-1">
        <div className="flex flex-wrap">
          {data.products.map((product) => (
            <section className="p-4" key={product.title}>
              <article className="flex flex-col bg-white p-4 rounded space-y-2 w-96">
                <div className="relative h-72">
                  <Image
                    src={`/products/${product.imageUrl}`}
                    alt="product image"
                    layout="fill"
                    objectFit={"cover"}
                  />
                </div>

                <section>
                  <h2 className="text-2xl">{product.title}</h2>
                  <p className="text-xl text-gray-500">{product.price}</p>
                </section>
                <form
                  className="w-full"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const { url } = await createCheckoutSession(product.id);
                    router.push(url);
                  }}
                >
                  <button className="bg-indigo-500 text-white py-2 rounded w-full">
                    Checkout
                  </button>
                </form>
              </article>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
