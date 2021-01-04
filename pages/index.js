import Head from "next/head";
import { TextStyle, Page, Layout, EmptyState } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
export default function Home() {
  return (
    <>
      <Head>
        <title>SwipeCommerce</title>
      </Head>
      <Page>
        <TitleBar
          title="Ecommerce made engaging"
          primaryAction={{
            content: "Select products",
          }}
        />
        <Layout>
          <EmptyState
            heading={"Setup your store"}
            action={{
              content: "Get Started",
              onAction: () => console.log("clicky"),
            }}
            image={
              "https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
            }
          ></EmptyState>
        </Layout>
      </Page>
    </>
  );
}
