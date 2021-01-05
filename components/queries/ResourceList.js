import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Card } from "@shopify/polaris";
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import store from "store-js";

const GET_PRODUCTS_BY_ID = gql`
  query getProducts($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Product {
        title
        handle
        descriptionHtml
        id
        images(first: 1) {
          edges {
            node {
              originalSrc
              altText
            }
          }
        }
        variants(first: 1) {
          edges {
            node {
              price
              id
            }
          }
        }
      }
    }
  }
`;

const ResourceList = (props) => {
  console.log(store);
  return (
    <Query query={GET_PRODUCTS_BY_ID} variables={{ ids: store.get("ids") }}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading…</div>;
        if (error) return <div>{error.message}</div>;
        console.log(data);
        return (
          <Card>
            <p>stuff here</p>
          </Card>
        );
      }}
    </Query>
  );
};

ResourceList.propTypes = {
  props: PropTypes.any,
};

export default ResourceList;
