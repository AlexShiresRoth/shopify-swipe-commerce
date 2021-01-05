import Head from "next/head";
import { Page, Layout, EmptyState } from "@shopify/polaris";
import { ResourcePicker, TitleBar } from "@shopify/app-bridge-react";
import { useState } from "react";
import ResourceList from "../components/queries/ResourceList";
import store from "store-js";
export default function Home() {
  const [open, toggleOpen] = useState(false);

  const handleSelection = (resources) => {
    const idsFromResources = resources.selection.map((product) => product.id);
    toggleOpen(false);
    console.log(idsFromResources);
    store.set("ids", idsFromResources);
  };
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
        <Layout>
          <EmptyState
            heading={"Setup your store"}
            action={{
              content: "Select Products",
              onAction: () => toggleOpen(true),
            }}
            image={
              "https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
            }
          ></EmptyState>
        </Layout>
        <ResourceList />
      </Page>
    </>
  );
}
