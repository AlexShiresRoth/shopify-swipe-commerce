import React, { useState } from "react";
import PropTypes from "prop-types";
import { Page, EmptyState, Layout } from "@shopify/polaris";
import { ResourcePicker } from "@shopify/app-bridge-react";
import ProductList from "../components/queries/ProductList";
import store from "store-js";

const Products = (props) => {
  const [open, toggleOpen] = useState(false);

  const handleSelection = (resources) => {
    const idsFromResources = resources.selection.map((product) => product.id);
    toggleOpen(false);
    console.log(idsFromResources);
    store.set("ids", idsFromResources);
  };

  const emptyState = !store.get("ids");
  return (
    <Page>
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
              content: "Add Products",
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
  );
};

Products.propTypes = {};

export default Products;
