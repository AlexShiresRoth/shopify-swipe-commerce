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
import { useMutation } from "react-apollo";

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
  const [updatePrice, { data, loading, error }] = useMutation(UPDATE_PRICE);
  const [productData, setData] = useState({
    discount: "",
    price: "",
    variantId: "",
  });
  const [toastVisibility, setToast] = useState(false);

  const { discount, price, variantId } = productData;

  const [processing, setProcessing] = useState(false);

  const [showBanner, bannerVisibility] = useState(false);

  const [name, setName] = useState("");

  const itemToBeConsumed = () => {
    const item = store.get("item");
    const price = item.variants.edges[0].node.price;
    const variantId = item.variants.edges[0].node.id;
    const discounter = price * 0.1;
    setData((prevData) => ({ ...prevData, price, variantId }));
    return (price - discounter).toFixed(2);
  };

  const handleChange = (field) => (value) =>
    setData((prevData) => ({ ...prevData, [field]: value }));

  const toggleToastVisibility = () => setToast(!toastVisibility);

  useEffect(() => {
    setData((prevData) => ({ ...prevData, discount: itemToBeConsumed() }));
  }, []);

  useEffect(() => {
    if (data && data.productVariantUpdate) {
      toggleToastVisibility(!toastVisibility);
      setProcessing(false);
    }

    if (loading) {
      setProcessing(true);
    }

    if (error) {
      bannerVisibility(true);
    }
  }, [data, loading, error]);

  console.log("data:" + data, "loading:" + loading, "error:" + error);
  return (
    <Frame>
      <Page>
        {/* {toastVisibility ? (
          <Toast
            content="Successfully Updated"
            onDismiss={toggleToastVisibility}
          />
        ) : null}
        <Layout.Section>
          {showBanner ? <Banner status="critical"></Banner> : null}
        </Layout.Section> */}
        <Layout.sectioned>
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
                    onAction: (e) => {
                      e.preventDefault();

                      const productVariableInput = {
                        id: variantId,
                        price: discount,
                      };
                      updatePrice({
                        variables: { input: productVariableInput },
                      });
                    },
                  },
                ]}
                secondaryActions={[
                  {
                    content: "Remove Discount",
                    onAction: () => {
                      setData((prevData) => ({
                        ...prevData,
                        discount: "",
                      }));
                    },
                  },
                ]}
              />
            </Form>
          </Layout.Section>
        </Layout.sectioned>
      </Page>
    </Frame>
  );
};

editproducts.propTypes = {};

export default editproducts;
