import React from "react";
import PropTypes from "prop-types";
import { Page, EmptyState, Layout } from "@shopify/polaris";

const Products = (props) => {
  return (
    <Page>
      <Layout>
        <EmptyState
          heading={"Setup your store"}
          action={{
            content: "Add Products",
            onAction: () => console.log("clicky"),
          }}
          image={
            "https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
          }
        ></EmptyState>
      </Layout>
    </Page>
  );
};

Products.propTypes = {};

export default Products;
