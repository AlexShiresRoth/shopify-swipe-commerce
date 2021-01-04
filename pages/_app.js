import "../styles/globals.css";
import Head from "next/head";
import { AppProvider } from "@shopify/polaris";
import { Provider } from "@shopify/app-bridge-react";
import "@shopify/polaris/dist/styles.css";
import translations from "@shopify/polaris/locales/en.json";
import Cookies from "js-cookie";
import Navigation from "../components/Navigation";

const shoporigin = Cookies.get("shopOrigin");

function MyApp({ Component, pageProps, shopOrigin, API_KEY }) {
  const config = {
    apiKey: API_KEY,
    shopOrigin,
    forceRedirect: true,
  };
  console.log(shoporigin);
  return (
    <>
      <Head>
        <title>SwipeCommerce App</title>
      </Head>
      <Provider config={config}>
        <Navigation />
        <AppProvider i18n={translations}>
          <Component {...pageProps} />
        </AppProvider>
      </Provider>
    </>
  );
}

MyApp.getInitialProps = async ({ ctx }) => {
  const API_KEY = process.env.SHOPIFY_API_KEY;
  console.log(ctx.query.shop);
  return {
    shopOrigin: await ctx.query.shop,
    API_KEY,
  };
};

export default MyApp;
