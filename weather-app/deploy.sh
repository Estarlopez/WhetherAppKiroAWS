#!/bin/bash

# Build the app
npm run build

# Deploy to S3 (replace with your bucket name)
BUCKET_NAME="your-weather-app-bucket"
aws s3 sync build/ s3://$BUCKET_NAME --delete

# Invalidate CloudFront cache (replace with your distribution ID)
DISTRIBUTION_ID="YOUR_CLOUDFRONT_DISTRIBUTION_ID"
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"

echo "Deployment complete!"