# Adaptive Bitrate Streaming Video App

This Project uses:

- React + Vite on Frontend
- NestJS(NodeJS) on Backend
- AWS Cloudfront to distribute content
  - The content on Cloudfront is protected using Signed Cookies
  - The data comes from a S3 bucket connected to the Cloudfront distribution
- HLS (HTTP Live Streaming) data came from AWS Media Convert, using a regular .mp4 file

## Motivation

- I struggled for months to make Signed Cookies to work on AWS. I found many people on Github issues who struggled with same issue. Some of them decided to pay Premium Support on AWS to get the problem fixed, but (as long as I know) none of those who paid the Premium support, shared their solution to the world. So when I found a solution, I decided to do it for free

### Author: https://www.linkedin.com/in/mpcsj/
