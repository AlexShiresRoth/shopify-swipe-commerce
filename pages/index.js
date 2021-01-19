import Head from "next/head";
import { Page, Layout, EmptyState } from "@shopify/polaris";
import { ResourcePicker, TitleBar } from "@shopify/app-bridge-react";
import { useState } from "react";
import store from "store-js";
import ProductList from "../components/queries/ProductList";
export default function Home() {
  const [open, toggleOpen] = useState(false);

  const handleSelection = (resources) => {
    const idsFromResources = resources.selection.map((product) => product.id);
    toggleOpen(false);
    store.set("ids", idsFromResources);
  };

  const emptyState = !store.get("ids");

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
            onAction: () => toggleOpen(true),
          }}
        />
        <ResourcePicker
          resourceType="Product"
          showVariants={false}
          open={open}
          onSelection={(resources) => handleSelection(resources)}
          onCancel={() => toggleOpen(false)}
        />
        {emptyState ? (
          <Layout>
            <EmptyState
              heading={"Setup your store"}
              action={{
                content: "Setup your store",
                onAction: () => toggleOpen(true),
              }}
              image={
                "https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
              }
            ></EmptyState>
          </Layout>
        ) : (
          <ProductList />
        )}
      </Page>
    </>
  );
}
