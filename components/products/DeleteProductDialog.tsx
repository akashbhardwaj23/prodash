"use client";

import {
  useEffect,
} from "react";

import Button from "@/components/ui/button";

interface DeleteProductDialogProps {
  open: boolean;
  productTitle: string;
  loading: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteProductDialog({
  open,
  productTitle,
  loading,
  onCancel,
  onConfirm,
}: DeleteProductDialogProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        onCancel();
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [open, onCancel]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onMouseDown={onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-md rounded-lg border-4 border-neutral-100/80 bg-background p-6 shadow-xl"
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >
        <h2 className="text-lg font-semibold">
          Delete Product?
        </h2>

        <p className="mt-3 text-sm leading-6 text-neutral-600">
          Are you sure you want to delete{" "}
          <span className="font-medium text-neutral-900">
            "{productTitle}"
          </span>
          ?
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            variant="secondary"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            variant="danger"
            loading={loading}
            onClick={onConfirm}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}