import { useRouter, withRouter } from "next/router";

const ClientRouter = (props) => {
  const router = useRouter();
  return <AppBridgeClientRouter history={router} />;
};

export default withRouter(ClientRouter);
