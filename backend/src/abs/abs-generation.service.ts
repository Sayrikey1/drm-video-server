import { Injectable } from '@nestjs/common';
import {
  AWS_MEDIA_CONVERT_IAM_ROLE,
  AWS_MEDIA_CONVERT_QUEUE,
  DEFAULT_HLS_SEGMENT_LENGTH_IN_SEC,
  HLS_CONTENT_PREFIX,
  outputHLS1080p,
  outputHLS360p,
  outputHLS480p,
  outputHLS720p,
} from './abs-generation.constants';
import {
  Output as MediaConvertOutput,
  CreateJobRequest,
  MediaConvertClient,
  CreateJobCommand,
} from '@aws-sdk/client-mediaconvert'; // ES Modules import
import { GenerateAbsContentInput } from './abs.model';

@Injectable()
export class AbsGenerationService {
  private readonly mediaConvert: MediaConvertClient;

  constructor() {
    this.mediaConvert = new MediaConvertClient();
  }

  getOutputQualitiesForVideo() {
    const result: MediaConvertOutput[] = [];

    let videoHeight = 1080; // mocked result

    if (!videoHeight) {
      return undefined;
    }

    if (videoHeight >= 1080) {
      result.push(outputHLS1080p);
    }
    if (videoHeight >= 720) {
      result.push(outputHLS720p);
    }
    if (videoHeight >= 480) {
      result.push(outputHLS480p);
    }
    if (videoHeight >= 360) {
      result.push(outputHLS360p);
    }
    return result;
  }

  /**
   * Entrypoint
   */
  async generateAbsContent({
    inputS3Key,
    baseOutputS3Key,
    tags,
  }: GenerateAbsContentInput) {
    // check video width and height to determine smallest size available
    const outputQualities = this.getOutputQualitiesForVideo();

    await this.triggerHLSContentGeneration({
      inputS3Key,
      baseS3OutputKey: baseOutputS3Key,
      tags,
      videoQualities: outputQualities,
    });
  }

  private async triggerHLSContentGeneration({
    inputS3Key,
    baseS3OutputKey,
    videoQualities,
    tags,
  }: {
    inputS3Key: string;
    baseS3OutputKey: string;
    videoQualities: MediaConvertOutput[];
    tags?: any;
  }) {
    const jobParams: CreateJobRequest = {
      Queue: AWS_MEDIA_CONVERT_QUEUE,
      Role: AWS_MEDIA_CONVERT_IAM_ROLE,
      AccelerationSettings: {
        // if file is compatible with acceleration, will accelerate, otherwise will use
        // standard transcoding
        Mode: 'PREFERRED',
      },
      Settings: {
        TimecodeConfig: {
          Source: 'ZEROBASED',
        },
        OutputGroups: [
          {
            CustomName: 'apple_hls_output',
            Name: 'Apple HLS',
            Outputs: videoQualities,
            OutputGroupSettings: {
              Type: 'HLS_GROUP_SETTINGS',
              HlsGroupSettings: {
                SegmentLength: DEFAULT_HLS_SEGMENT_LENGTH_IN_SEC,
                Destination: `s3://mpcsj-abs-video-bucket2/${baseS3OutputKey}/${HLS_CONTENT_PREFIX}/`,
                MinSegmentLength: 0,
              },
            },
          },
        ],
        Inputs: [
          {
            AudioSelectors: {
              'Audio Selector 1': {
                DefaultSelection: 'DEFAULT',
              },
            },
            VideoSelector: {},
            TimecodeSource: 'ZEROBASED',
            FileInput: `s3://mpcsj-abs-video-bucket1/${inputS3Key}`,
          },
        ],
      },
      BillingTagsSource: 'JOB',
      StatusUpdateInterval: 'SECONDS_60',
      Priority: 0,
      Tags: tags,
      UserMetadata: { ...tags },
    };

    console.log('jobParams>>', { jobParams });
    // await this.mediaConvert.createJob(jobParams).promise();

    const response = await this.mediaConvert.send(
      new CreateJobCommand(jobParams),
    );

    console.log('media convert response >> ', { response });
  }
}
