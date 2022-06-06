type ProductImageGalleryProps = {
  images?: string[];
  title: string;
};

type FullscreenGalleryProps = {
  images: FormatImagesFullscreen[];
  toggleFullscreen: () => void;
  fullscreenIndex: number;
  slideToIndex: (index: number) => void;
  isFullscreen: boolean;
};

type FormatImagesFullscreen = {
  src: string;
  caption: string;
};

export type {
  ProductImageGalleryProps,
  FullscreenGalleryProps,
  FormatImagesFullscreen,
};
