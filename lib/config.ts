export const configs = {
  S3BucketName: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME!,
  S3Region: process.env.NEXT_PUBLIC_AWS_S3_REGION!,
  S3AccessKey: process.env.AWS_S3_ACCESS_KEY!,
  S3SecretKey: process.env.AWS_S3_SECRET_KEY!,
  backendBaseUrl: process.env.NEXT_PUBLIC_BE_BASE_URL || '',

  apiKey: process.env.NEXT_PUBLIC_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_APP_ID!,
};
