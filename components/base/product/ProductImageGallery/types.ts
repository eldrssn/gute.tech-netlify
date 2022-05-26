type ProductImageGalleryProps = {
  images?: string[];
  title: string;
};

type FullscreenGalleryProps = {
  images: string[];
  title: string;
  toggleFullscreen: () => void;
  fullscreenIndex: number;
  slideToIndex: (index: number) => void;
};

export type { ProductImageGalleryProps, FullscreenGalleryProps };
