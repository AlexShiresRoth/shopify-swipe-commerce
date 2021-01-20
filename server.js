require("isomorphic-fetch");
const dotenv = require("dotenv");
const Koa = require("koa");
const next = require("next");
const { default: createShopifyAuth } = require("@shopify/koa-shopify-auth");
const { verifyRequest } = require("@shopify/koa-shopify-auth");
const session = require("koa-session");

dotenv.config();
const { default: graphQLProxy } = require("@shopify/koa-shopify-graphql-proxy");
const { ApiVersion } = require("@shopify/koa-shopify-graphql-proxy");
const getSubscriptionUrl = require("./server/getSubscriptionUrl");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const { SHOPIFY_SECRET_KEY, SHOPIFY_API_KEY, HOST } = process.env;
const PORT = parseInt(process.env.PORT, 10) || 3000;

app.prepare().then(() => {
  const server = new Koa();
  server.use(session({ secure: true, sameSite: "none" }, server));
  server.keys = [SHOPIFY_SECRET_KEY];

  server.use(
    createShopifyAuth({
      apiKey: SHOPIFY_API_KEY,
      secret: SHOPIFY_SECRET_KEY,
      scopes: ["read_products", "write_products"],
      accessMode: "offline",
      async afterAuth(ctx) {
        const urlParams = new URLSearchParams(ctx.request.url);
        // const shop = urlParams.get("shop");
        const { shop, accessToken } = ctx.state.shopify;
        ctx.cookies.set("shopOrigin", shop, {
          httpOnly: false,
          secure: true,
          sameSite: "none",
        });

        const returnUrl = `${HOST}?shop=${shop}`;
        const subscriptionUrl = await getSubscriptionUrl(
          accessToken,
          shop,
          returnUrl
        );
        console.log("test sub url", subscriptionUrl);
        ctx.redirect(subscriptionUrl);
      },
    })
  );
  server.use(graphQLProxy({ version: ApiVersion.October20 }));
  server.use(verifyRequest());
  server.use(async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
    return;
  });
  server.listen(PORT, () => {
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
