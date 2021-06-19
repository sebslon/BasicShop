import NPprogress from 'nprogress';
import Router from 'next/router';

import Page from "../components/Page";

import '../components/styles/nprogress.css';
Router.events.on('routeChangeStart', () => NPprogress.start());
Router.events.on('routeChangeComplete', () => NPprogress.done());
Router.events.on('routeChangeError', () => NPprogress.done());

export default function App({ Component, pageProps }) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  );
}
