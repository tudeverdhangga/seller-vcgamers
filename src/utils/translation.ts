import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { type GetStaticProps } from "next";

import nextI18nConfig from "../../next-i18next.config.mjs";

export function mergeStaticPropsWithTrans(
  callback?: GetStaticProps,
  namespaces?: Array<string>
) {
  return async function getStaticProps(props: { locale: string }) {
    const { locale } = props;
    const staticProps = callback ? await callback(props) : undefined;

    if (typeof staticProps !== "undefined" && "props" in staticProps) {
      const { props, ...other } = staticProps;
      return {
        ...other,
        props: {
          ...(await serverSideTranslations(locale, namespaces, nextI18nConfig)),
          ...props,
        },
      };
    }

    return await getStaticPropsWithTrans(props);
  };
}

export function getStaticPropsWithTransNamespace(namespaces: string[]) {
  return async function getStaticProps(props: { locale: string }) {
    return {
      props: {
        ...(await serverSideTranslations(
          props.locale,
          ["common", "layout", ...namespaces],
          nextI18nConfig
        )),
      },
    };
  };
}

export async function getStaticPropsWithTrans({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        ["common", "layout"],
        nextI18nConfig
      )),
    },
  };
}
