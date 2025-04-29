export interface GenerateAbsContentInput {
  inputS3Key: string; // here we know it comes from bucket 1
  baseOutputS3Key: string; // here it will be saved on bucket 2
  tags?: any;
}

export interface AbsContentPathParams {
  s3Key: string;
}
