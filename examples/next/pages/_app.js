import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';

// stylings
import 'react-form-builder2/dist/app.css';
import '../styles/site.css';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = { };

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Head>
          <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
          <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous" />
        </Head>
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default MyApp;
