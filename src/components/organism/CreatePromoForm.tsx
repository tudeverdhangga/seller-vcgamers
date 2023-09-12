import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { useAtom, useAtomValue } from "jotai";

import { codeConfirmAtom, managePromoFormAtom } from "~/atom/managePromo";
import {
  type BodyPromo,
  promoSchema,
  promoSchemaMerge,
  emptyPromo,
} from "~/services/managePromo/types";
import { useCheckPromoCode } from "~/services/managePromo/hooks";
import ManagePromoForm from "./ManagePromoForm";

export default function CreatePromoForm() {
  const [, setCodeConfirm] = useAtom(codeConfirmAtom);
  const managePromoForm = useAtomValue(managePromoFormAtom);
  const checkCodeMutation = useCheckPromoCode();
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
    defaultValues: emptyPromo,
  });
  const productForm = useFieldArray<BodyPromo, "items", "id">({
    control: form.control,
    name: "items",
    rules: { minLength: 1 },
  });

  useEffect(() => {
    if (!managePromoForm.isOpen) {
      productForm.remove();
      form.reset(emptyPromo);
    } else {
      if (
        managePromoForm.type === "create" &&
        productForm.fields.length === 0
      ) {
        productForm.append({ category_id: "", brand_id: [] });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [managePromoForm.isOpen, managePromoForm.type]);

  return (
    managePromoForm.type === "create" && (
      <ManagePromoForm form={form} productForm={productForm} />
    )
  );
}
