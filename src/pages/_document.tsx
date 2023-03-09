import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBKDVz0BhZqfyqqhEaklEz661KNU-VA2yo&libraries=places"
          async
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
