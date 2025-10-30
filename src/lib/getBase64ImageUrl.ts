import type { ImageProps } from "./types";

const cache = new Map<ImageProps, string>();

export default async function getBase64ImageUrl(
  image: ImageProps,
): Promise<string> {
  const validImageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg']
  const isImage = validImageExtensions.includes(image.format)

  const url = cache.get(image);
  if (url) {
    return url;
  }
  const response = await fetch(
    `${
      isImage
        ? `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_jpg,w_8,q_70/${image.public_id}.${image.format}`
        : `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/f_jpg,w_8,q_70/${image.public_id}.jpg`
    }`,
  );
  const buffer = await response.arrayBuffer();
  const dataUrl = `data:${response.type};base64,${Buffer.from(buffer).toString("base64")}`
  cache.set(image, dataUrl);
  return dataUrl;
}
