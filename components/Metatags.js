import Head from "next/head";

export default function Metatags({
  title = "Devmedium - A Blog with Next.js",
  description = "A Medium and Dev.to like blogging platform built with Next.js and Firebase",
  image = "https://manuarora.in/logo.png",
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@fireship_dev" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Head>
  );
}
