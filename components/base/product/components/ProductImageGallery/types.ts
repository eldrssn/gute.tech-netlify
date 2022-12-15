type ProductImageGalleryProps = {
  images?: string[];
  title: string;
};

type CustomControlsProps = {
  isFullscreen: boolean;
  title: string;
  closeFullscreen: () => void;
};

export type { ProductImageGalleryProps, CustomControlsProps };
