import "../styles/globals.css";
import Head from "next/head";
import { AppProvider } from "@shopify/polaris";
import { Provider } from "@shopify/app-bridge-react";
import "@shopify/polaris/dist/styles.css";
import translations from "@shopify/polaris/locales/en.json";
import Cookies from "js-cookie";
import NavigationRouting from "../components/nav/NavigationRouting";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  fetchOptions: {
    credentials: "include",
  },
});
const shoporigin = Cookies.get("shopOrigin");

function MyApp({ Component, pageProps, shopOrigin, API_KEY }) {
  const config = {
    apiKey: API_KEY,
    shopOrigin: shopOrigin ? shoporigin : shoporigin,
    forceRedirect: true,
  };

  return (
    <>
      <Head>
        <title>SwipeCommerce App</title>
      </Head>
      <Provider config={config}>
        <NavigationRouting />
        <AppProvider i18n={translations}>
          <ApolloProvider client={client}>
            <Component {...pageProps} />
          </ApolloProvider>
        </AppProvider>
      </Provider>
    </>
  );
}

MyApp.getInitialProps = async ({ ctx }) => {
  const API_KEY = process.env.SHOPIFY_API_KEY;

  return {
    shopOrigin: await ctx.query.shop,
    API_KEY,
  };
};

export default MyApp;
