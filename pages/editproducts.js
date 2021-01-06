import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Card,
  DisplayText,
  Form,
  FormLayout,
  Layout,
  Page,
  PageActions,
  TextField,
  Banner,
  Frame,
  Toast,
} from "@shopify/polaris";
import store from "store-js";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const UPDATE_PRICE = gql`
  mutation productVariantUpdate($input: ProductVariantInput!) {
    productVariantUpdate(input: $input) {
      product {
        title
      }
      productVariant {
        id
        price
      }
    }
  }
`;

const editproducts = (props) => {
  const [data, setData] = useState({
    discount: "",
    price: "",
    variantId: "",
    showToast: false,
  });

  const { discount, price, variantId } = data;

  const [name, setName] = useState("");

  const itemToBeConsumed = () => {
    const item = store.get("item");
    const price = item.variants.edges[0].node.price;
    const variantId = item.variants.edges[0].node.id;
    const discounter = price * 0.1;
    setData((prevData) => ({ ...prevData, price, variantId }));
    return (price - discounter).toFixed(2);
  };

  const handleChange = (field) => {
    return (value) => setData((prevData) => ({ ...prevData, [field]: value }));
  };

  useEffect(() => {
    setData((prevData) => ({ ...prevData, discount: itemToBeConsumed() }));
  }, []);

  return (
    <Mutation mutation={UPDATE_PRICE}>
      {(handleSubmit, { error, data }) => {
        const showError = error && (
          <Banner status="critical">{error.message}</Banner>
        );
        const showToast = data && data.productVariantUpdate && (
          <Toast
            content="Successfully updated"
            onDismiss={() =>
              setData((prevData) => ({ ...prevData, showToast: false }))
            }
          />
        );
        return (
          <Frame>
            <Page>
              <Layout>
                <Layout.Section>
                  <DisplayText size="large">{name}</DisplayText>
                  <Form>
                    <Card sectioned>
                      <FormLayout>
                        <FormLayout.Group>
                          <TextField
                            prefix="$"
                            value={price}
                            disabled={true}
                            label="Original Price"
                            type="price"
                          />
                          <TextField
                            prefix="$"
                            value={discount}
                            onChange={handleChange("discount")}
                            label="Discounted"
                            type="discount"
                          />
                        </FormLayout.Group>
                      </FormLayout>
                    </Card>
                    <PageActions
                      primaryAction={[
                        {
                          content: "Save",
                          onAction: () => {
                            const productVariableInput = {
                              id: variantId,
                              price: discount,
                            };
                            handleSubmit({
                              variables: { input: productVariableInput },
                            });
                          },
                        },
                      ]}
                      secondaryActions={[{ content: "Remove Discount" }]}
                    />
                  </Form>
                </Layout.Section>
              </Layout>
            </Page>
          </Frame>
        );
      }}
    </Mutation>
  );
};

editproducts.propTypes = {};

export default editproducts;
