import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Card,
  Layout,
  Page,
  Button,
  Form,
  FormLayout,
  Stack,
  TextField,
  TextStyle,
  SettingToggle,
} from "@shopify/polaris";

const Annotatedlayout = (props) => {
  const [data, setData] = useState({
    discount: "",
  });

  const [priceUpdate, priceUpdateSettings] = useState({
    enabled: false,
  });

  const { discount } = data;
  const { enabled } = priceUpdate;

  const handleToggle = () =>
    priceUpdateSettings({ ...priceUpdate, enabled: !enabled });

  const settings = !enabled ? "Enable" : "Disable";
  const textStatus = enabled ? "enabled" : "disabled";

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(discount);
  };

  const onChange = (field) => {
    return (value) => setData({ [field]: value });
  };
  return (
    <Page>
      <Layout>
        <Layout.AnnotatedSection
          title="Default Discount"
          description="add a product to this app"
        >
          <Card sectioned>
            <Form onSubmit={handleSubmit}>
              <FormLayout>
                <TextField
                  value={discount}
                  onChange={onChange("discount")}
                  label="Discount percentage"
                  type="discount"
                />
                <Stack distribution="trailing">
                  <Button primary submit>
                    Save
                  </Button>
                </Stack>
              </FormLayout>
            </Form>
          </Card>
        </Layout.AnnotatedSection>
        <Layout.AnnotatedSection
          title="Price updates"
          description="Temporarily disable all Sample App price updates"
        >
          <SettingToggle
            action={{
              content: settings,
              onAction: handleToggle,
            }}
            enabled={enabled}
          >
            This setting is{" "}
            <TextStyle variation="strong">{textStatus}</TextStyle>.
          </SettingToggle>
        </Layout.AnnotatedSection>
      </Layout>
    </Page>
  );
};

Annotatedlayout.propTypes = {};

export default Annotatedlayout;
