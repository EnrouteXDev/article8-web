import { NextResponse } from 'next/server';

export async function GET() {
  const moments = [
    {
      id: 1,
      title: 'Fashion',
      description: 'High-end fashion photography.',
      cover: 'https://res.cloudinary.com/demo/image/upload/woman.jpg',
    },
    {
      id: 2,
      title: 'Nature',
      description: 'Landscapes and wildlife shots.',
      cover: 'https://res.cloudinary.com/demo/image/upload/mountain.jpg',
    },
    {
      id: 3,
      title: 'Architecture',
      description: 'Modern and classic buildings.',
      cover: 'https://res.cloudinary.com/demo/image/upload/building.jpg',
    },
  ];

  return NextResponse.json(moments);
}
