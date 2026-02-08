#!/bin/bash

# PhishGuard Frontend Deployment Script for AWS S3

BUCKET_NAME="phish-guard-frontend-$(date +%s)"
REGION="us-east-1"

echo "🚀 Deploying PhishGuard Frontend to AWS S3..."

# Create S3 bucket
echo "📦 Creating S3 bucket: $BUCKET_NAME"
aws s3 mb s3://$BUCKET_NAME --region $REGION

# Enable static website hosting
echo "🌐 Enabling static website hosting..."
aws s3 website s3://$BUCKET_NAME --index-document index.html --error-document index.html

# Upload build files
echo "📤 Uploading files..."
aws s3 sync dist/ s3://$BUCKET_NAME --delete

# Make bucket public
echo "🔓 Setting bucket policy for public access..."
cat > bucket-policy.json << EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::$BUCKET_NAME/*"
    }
  ]
}
EOF

aws s3api put-bucket-policy --bucket $BUCKET_NAME --policy file://bucket-policy.json

# Get website URL
WEBSITE_URL="http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com"

echo ""
echo "✅ Deployment complete!"
echo "🌍 Your website is live at: $WEBSITE_URL"
echo ""
echo "Note: Save this URL for your resume and portfolio!"
