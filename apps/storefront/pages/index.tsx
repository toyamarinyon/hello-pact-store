import type { NextPage } from "next";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";
import jp from "../locales/jp";
import en from "../locales/en";
import { browserEnv } from "../env/browser";

loadStripe(browserEnv.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const Home: NextPage = () => {
  const router = useRouter();
  const locale = router.locale;
  const t = locale === "jp" ? jp : en;
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
          >
            <option value="en">English</option>
            <option value="jp">日本語</option>
          </select>
        </div>
      </div>
      <div className="flex justify-center md:items-center flex-1">
        <div className="md:w-96">
          <article className="flex flex-col bg-white p-4 rounded space-y-2">
            <div className="relative h-72">
              <Image
                src="/products/hair01.jpeg"
                alt="product image"
                layout="fill"
                objectFit={"cover"}
              />
            </div>

            <section>
              <h2 className="text-2xl">{t.productName}</h2>
              <p className="text-xl text-gray-500">$20.00</p>
            </section>
            <form
              action="/api/checkout_sessions"
              method="POST"
              className="w-full"
            >
              <button className="bg-indigo-500 text-white py-2 rounded w-full">
                Checkout
              </button>
            </form>
          </article>
        </div>
      </div>
    </div>
  );
};

export default Home;
