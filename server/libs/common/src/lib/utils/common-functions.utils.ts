import { IMediaUpload } from '@vsd-common/lib';

export function buildImageUrl(images: IMediaUpload[], baseUrl: string): IMediaUpload[] {
  if (!images || images.length === 0) {
    return images;
  }
  return images.map((image, i) => {
    image.webUrl = `${baseUrl}/${image.webUrl}`;
    return image;
  });
}
