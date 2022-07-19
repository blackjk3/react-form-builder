import Head from 'next/head';

// stylings
import 'react-form-builder2/dist/app.css';
import '../styles/site.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.13.0/css/all.css" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
