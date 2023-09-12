import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { useAtom, useAtomValue } from "jotai";

import { codeConfirmAtom, managePromoFormAtom } from "~/atom/managePromo";
import {
  type BodyPromo,
  promoSchema,
  promoSchemaMerge,
} from "~/services/managePromo/types";
import {
  useCheckPromoCode,
  useGetPromoDetailMapped,
} from "~/services/managePromo/hooks";
import ManagePromoForm from "./ManagePromoForm";

export default function ReusePromoForm() {
  const managePromoForm = useAtomValue(managePromoFormAtom);
  const [, setCodeConfirm] = useAtom(codeConfirmAtom);
  const checkCodeMutation = useCheckPromoCode();
  const { data } = useGetPromoDetailMapped(
    managePromoForm.promoId,
    managePromoForm.isOpen
  );
  const form = useForm<BodyPromo>({
    resolver: zodResolver(
      promoSchema.merge(
        promoSchemaMerge((body) =>
          checkCodeMutation.mutateAsync(body, {
            onSuccess: () => {
              setCodeConfirm(true);
            },
          })
        )
      ),
      undefined,
      {
        mode: "async",
      }
    ),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    values: data?.data,
  });
  const productForm = useFieldArray<BodyPromo, "items", "id">({
    control: form.control,
    name: "items",
    rules: { minLength: 1 },
  });

  useEffect(() => {
    if (!managePromoForm.isOpen) {
      form.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [managePromoForm.isOpen]);

  return (
    ["edit", "reuse", "disabled"].includes(managePromoForm.type ?? "") && (
      <ManagePromoForm
        form={form}
        productForm={productForm}
        promoDetailData={data}
      />
    )
  );
}
