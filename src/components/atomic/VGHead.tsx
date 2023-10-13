import Head from "next/head";
import { useEffect, useState } from "react";

export default function VGHead(props: { children: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? (
    <Head>
      <title>Seller - {props.children} | VCGamers</title>
    </Head>
  ) : (
    <Head>
      <title>Seller | VCGamers</title>
    </Head>
  );
}
