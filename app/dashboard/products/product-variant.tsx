"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VariantsWithImagesTags } from "@/lib/infer-type";
import { VariantSchema } from "@/types/VariantSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputTags } from "./input-tags";
import VariantImages from "./variant-images";
import { forwardRef, useEffect, useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { createVariant } from "@/server/actions/create-variant";
import { toast } from "sonner";
import { deleteVariant } from "@/server/actions/delete-variant";

type VariantProps = {
  editMode: boolean;
  productID?: number;
  variant?: VariantsWithImagesTags;
  children: React.ReactNode;
};

export const ProductVariant = forwardRef<HTMLDivElement, VariantProps>(
  ({ editMode, productID, variant, children }, ref) => {
    const form = useForm<z.infer<typeof VariantSchema>>({
      resolver: zodResolver(VariantSchema),
      defaultValues: {
        tags: [],
        variantImages: [],
        color: "#000000",
        editMode,
        id: undefined,
        productID,
        productType: "",
      },
    });

    const [open, setOpen] = useState(false);

    const setEdit = () => {
      if (!editMode) {
        form.reset();
        return;
      }
      if (editMode && variant) {
        form.setValue("editMode", true);
        form.setValue("id", variant.id);
        form.setValue("productID", variant.productID);
        form.setValue("productType", variant.productType);
        form.setValue("color", variant.color);
        form.setValue(
          "tags",
          variant.variantTags.map((tag) => tag.tag)
        );
        form.setValue(
          "variantImages",
          variant.variantImages.map((img) => ({
            name: img.name,
            size: img.size,
            url: img.url,
          }))
        );
      }
    };

    useEffect(() => {
      setEdit();
    }, []);

    const { execute, status } = useAction(createVariant, {
      onExecute() {
        toast.loading("Creating variant");
        setOpen(false);
      },
      onSuccess(data) {
        toast.dismiss();
        if (data?.error) {
          toast.error(data.error);
        }
        if (data?.success) {
          toast.success(data.success);
        }
      },
    });

    const deleteVariantAction = useAction(deleteVariant, {
      onExecute() {
        toast.loading("Deleting variant");
        setOpen(false);
      },
      onSuccess(data) {
        toast.dismiss();

        if (data?.error) {
          toast.error(data.error);
        }
        if (data?.success) {
          toast.success(data.success);
        }
      },
    });

    function onSubmit(values: z.infer<typeof VariantSchema>) {
      execute(values);
    }

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent className="lg:max-w-screen-lg overflow-y-scroll max-h-[680px] rounded-md">
          <DialogHeader>
            <DialogTitle>
              {editMode ? "Edit" : "Create"} your variant
            </DialogTitle>
            <DialogDescription>
              Manage your product variants here
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="productType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Variant Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Pick a title for your variant"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Variant color</FormLabel>
                    <FormControl>
                      <Input type="color" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Variant Tags</FormLabel>
                    <FormControl>
                      <InputTags
                        {...field}
                        onChange={(e) => field.onChange(e)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <VariantImages />
              <div className="flex gap-4 items-center">
                {editMode && variant && (
                  <Button
                    variant={"destructive"}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      deleteVariantAction.execute({ id: variant.id });
                    }}
                  >
                    Delete Variant
                  </Button>
                )}
                <Button
                  disabled={
                    status === "executing" ||
                    !form.formState.isDirty ||
                    !form.formState.isValid
                  }
                  type="submit"
                >
                  {editMode ? "Update Variant" : "Create Variant"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  }
);

ProductVariant.displayName = "ProductVariant";
