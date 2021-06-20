import NPprogress from "nprogress";
import Router from "next/router";
import { ApolloProvider } from "@apollo/client";

import apolloWithData from "../lib/apolloWithData";
import Page from "../components/Page";

import "../components/styles/nprogress.css";
Router.events.on("routeChangeStart", () => NPprogress.start());
Router.events.on("routeChangeComplete", () => NPprogress.done());
Router.events.on("routeChangeError", () => NPprogress.done());

function App({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  );
}

App.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  pageProps.query = ctx.query;
  return { pageProps };
};

export default apolloWithData(App);
