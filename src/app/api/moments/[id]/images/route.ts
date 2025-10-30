/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const mockImages: Record<string, any[]> = {
    '1': [
      {
        id: 101,
        public_id: 'fashion_1',
        format: 'jpg',
        blurDataUrl: '',
        url: 'https://res.cloudinary.com/demo/image/upload/woman.jpg',
      },
      {
        id: 102,
        public_id: 'fashion_2',
        format: 'jpg',
        blurDataUrl: '',
        url: 'https://res.cloudinary.com/demo/image/upload/fashion2.jpg',
      },
    ],
    '2': [
      {
        id: 201,
        public_id: 'nature_1',
        format: 'jpg',
        blurDataUrl: '',
        url: 'https://res.cloudinary.com/demo/image/upload/nature1.jpg',
      },
      {
        id: 202,
        public_id: 'nature_2',
        format: 'jpg',
        blurDataUrl: '',
        url: 'https://res.cloudinary.com/demo/image/upload/nature2.jpg',
      },
    ],
    '3': [
      {
        id: 301,
        public_id: 'architecture_1',
        format: 'jpg',
        blurDataUrl: '',
        url: 'https://res.cloudinary.com/demo/image/upload/architecture1.jpg',
      },
    ],
  };

  const images = mockImages[id] || [];
  return NextResponse.json(images);
}
