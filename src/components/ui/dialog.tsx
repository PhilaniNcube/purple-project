"use client";

import * as React from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { useLenis } from "lenis/react";
import { cn } from "cn";

/**
 * Accessible modal dialog built on Base UI, styled to Purple Project's
 * square-cornered tonal system and synchronized with Lenis smooth scrolling.
 */
function Dialog({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  ...props
}: DialogPrimitive.Root.Props) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;
  const lenis = useLenis();

  React.useEffect(() => {
    if (!lenis) return;

    if (isOpen) {
      lenis.stop();
      return () => {
        lenis.start();
      };
    }

    lenis.start();
    return undefined;
  }, [isOpen, lenis]);

  function handleOpenChange(
    nextOpen: boolean,
    eventDetails: DialogPrimitive.Root.ChangeEventDetails,
  ) {
    if (!isControlled) {
      setUncontrolledOpen(nextOpen);
    }
    onOpenChange?.(nextOpen, eventDetails);
  }

  return (
    <DialogPrimitive.Root
      data-slot="dialog"
      {...(isControlled ? { open: controlledOpen } : { defaultOpen })}
      onOpenChange={handleOpenChange}
      {...props}
    />
  );
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogBackdrop({
  className,
  ...props
}: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-backdrop"
      className={cn(
        "fixed inset-0 z-60 bg-brand-950/75 backdrop-blur-xs transition-opacity duration-200 ease-brand data-starting-style:opacity-0 data-ending-style:opacity-0",
        className,
      )}
      {...props}
    />
  );
}

function DialogViewport({
  className,
  ...props
}: DialogPrimitive.Viewport.Props) {
  return (
    <DialogPrimitive.Viewport
      data-slot="dialog-viewport"
      data-lenis-prevent=""
      className={cn(
        "fixed inset-0 z-60 flex items-center justify-center p-4 sm:p-6",
        className,
      )}
      {...props}
    />
  );
}

function DialogPopup({
  className,
  children,
  ...props
}: DialogPrimitive.Popup.Props) {
  return (
    <DialogPortal>
      <DialogBackdrop />
      <DialogViewport>
        <DialogPrimitive.Popup
          data-slot="dialog-popup"
          data-lenis-prevent=""
          className={cn(
            "relative flex w-full [max-inline-size:36rem] [max-block-size:min(88dvh,46rem)] flex-col overflow-clip rounded-none border border-brand-200 bg-white text-foreground shadow-xl transition-opacity duration-200 ease-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 data-starting-style:opacity-0 data-ending-style:opacity-0 motion-safe:transition-[opacity,transform] motion-safe:data-starting-style:translate-y-2 motion-safe:data-starting-style:scale-[0.98] motion-safe:data-ending-style:translate-y-2 motion-safe:data-ending-style:scale-[0.98]",
            className,
          )}
          {...props}
        >
          {children}
        </DialogPrimitive.Popup>
      </DialogViewport>
    </DialogPortal>
  );
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("font-heading text-foreground", className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogDescription,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DialogViewport,
};
