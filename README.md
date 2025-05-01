# Adaptive Bitrate Streaming Video App

This Project uses:

- React + Vite on Frontend
- NestJS(NodeJS) on Backend
- AWS Cloudfront to distribute content
  - The content on Cloudfront is protected using Signed Cookies
  - The data comes from a S3 bucket connected to the Cloudfront distribution
- HLS (HTTP Live Streaming) data came from AWS Media Convert, using a regular .mp4 file
