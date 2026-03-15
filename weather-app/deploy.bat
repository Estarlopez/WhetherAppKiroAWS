@echo off
echo Building React app...
call npm run build

echo Copying files to AWS MCP working directory...
xcopy "build" "C:\Users\ADMINI~1\AppData\Local\Temp\2\aws-api-mcp\workdir\build" /E /I /Y

echo Uploading to S3...
aws s3 sync C:\Users\ADMINI~1\AppData\Local\Temp\2\aws-api-mcp\workdir\build\ s3://weather-app-kiro-xyz789 --delete

echo Creating CloudFront invalidation...
aws cloudfront create-invalidation --distribution-id E1DGV2HEPBN07D --paths "/*"

echo Deployment complete!
echo.
echo Your app is available at:
echo S3 Website: http://weather-app-kiro-xyz789.s3-website-us-east-1.amazonaws.com
echo CloudFront (HTTPS): https://d6hpe06k8nhfi.cloudfront.net