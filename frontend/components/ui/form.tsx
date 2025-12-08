"use client";

import * as React from "react";
import {
  FormProvider,
  useFormContext,
  Controller,
  type FieldValues,
  type FieldPath,
  type ControllerProps,
} from "react-hook-form";

export function Form({ children, ...props }: any) {
  return <FormProvider {...props}>{children}</FormProvider>;
}

export function FormField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>(props: ControllerProps<TFieldValues, TName>) {
  const form = useFormContext<TFieldValues>();
  return <Controller {...props} control={form.control} />;
}

export const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  return <div ref={ref} className="space-y-2" {...props} />;
});

export const FormLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>((props, ref) => {
  return <label ref={ref} className="text-sm font-medium" {...props} />;
});

export const FormControl = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  return <div ref={ref} {...props} />;
});

export const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>((props, ref) => {
  return <p ref={ref} className="text-sm text-muted-foreground" {...props} />;
});

export const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>((props, ref) => {
  if (!props.children) return null;
  return (
    <p ref={ref} className="text-sm font-medium text-destructive" {...props} />
  );
});
