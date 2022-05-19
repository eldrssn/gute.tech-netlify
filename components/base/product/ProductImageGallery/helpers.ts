import { ReactImageGalleryItem } from 'react-image-gallery';

const formatImages = (images: string[]) =>
  images.reduce((accumulator: ReactImageGalleryItem[], image: string) => {
    const formatedImage = {
      original: image,
      thumbnail: image,
      thumbnailWidth: 92,
      thumbnailClass: 'customThumbnail',
      originalClass: 'customOriginal',
    };
    console.log(image);

    return accumulator.length
      ? [...accumulator, formatedImage]
      : [formatedImage];
  }, []);

export { formatImages };
