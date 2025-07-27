import { S3Client } from '@aws-sdk/client-s3';
import { configs } from './config';

export const S3 = new S3Client({
  region: configs.S3Region,
  credentials: {
    accessKeyId: configs.S3AccessKey,
    secretAccessKey: configs.S3SecretKey,
  },
});
