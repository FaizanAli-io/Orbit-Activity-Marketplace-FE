import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { NextResponse } from 'next/server';
import { v4 as uuid } from 'uuid';
import z from 'zod';
import { S3 } from '@/lib/s3-client';
import { configs } from '@/lib/config';

const schema = z.object({
  fileName: z.string(),
  contentType: z.string(),
  size: z.number(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { success, data } = schema.safeParse(body);

    if (!success)
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );

    const { contentType, fileName, size } = data;
    const uniqueKey = `${uuid()}-${fileName}`;

    const command = new PutObjectCommand({
      Bucket: configs.S3BucketName,
      Key: uniqueKey,
      ContentType: contentType,
      ContentLength: size,
    });

    const presignedUrl = await getSignedUrl(S3, command, {
      expiresIn: 360, // 6 minutes
    });

    const response = {
      presignedUrl,
      key: uniqueKey,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
