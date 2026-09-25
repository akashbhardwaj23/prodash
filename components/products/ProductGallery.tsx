"use client";

import {
  useState,
} from "react";

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export default function ProductGallery({
  images,
  title,
}: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] =
    useState(
      images[0] || ""
    );

  if (!images.length) {
    return (
      <div className="flex h-96 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600">
        No image available
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-lg border-2 bg-background">
        <img
          src={selectedImage}
          alt={title}
          className="h-100 w-full object-contain"
        />
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2">
        {images.map(
          (image, index) => (
            <button
              key={`${image}-${index}`}
              onClick={() =>
                setSelectedImage(image)
              }
              className={`
                h-20 w-20 flex-shrink-0
                overflow-hidden rounded-lg
                border-2
                ${
                  selectedImage === image
                    ? "border-neutral-900"
                    : "border-neutral-100"
                }
              `}
            >
              <img
                src={image}
                alt={`${title} ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          )
        )}
      </div>
    </div>
  );
}