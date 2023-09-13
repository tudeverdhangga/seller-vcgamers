import Head from "next/head";

export default function VGHead(props: { children: string }) {
  return (
    <Head>
      <title>Seller - {props.children} | VCGamers</title>
    </Head>
  );
}
