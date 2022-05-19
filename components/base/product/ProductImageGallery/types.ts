type ProductImageGalleryProps = {
  images?: string[];
  title: string;
};

type FullscreenGalleryProps = {
  images: string[];
  title: string;
  toggleFullscreen: () => void;
};

export type { ProductImageGalleryProps, FullscreenGalleryProps };
