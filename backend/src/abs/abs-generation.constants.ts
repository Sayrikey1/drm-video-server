import { Output as MediaConvertOutput } from '@aws-sdk/client-mediaconvert'; // ES Modules import

import * as dotenv from 'dotenv';

dotenv.config();

export const outputHLS1080p: MediaConvertOutput = {
  ContainerSettings: {
    Container: 'M3U8',
    M3u8Settings: {},
  },
  VideoDescription: {
    Width: 1920,
    Height: 1080,
    CodecSettings: {
      Codec: 'H_264',
      H264Settings: {
        MaxBitrate: 5000000,
        RateControlMode: 'QVBR',
        SceneChangeDetect: 'TRANSITION_DETECTION',
      },
    },
  },
  AudioDescriptions: [
    {
      CodecSettings: {
        Codec: 'AAC',
        AacSettings: {
          Bitrate: 128000,
          CodingMode: 'CODING_MODE_2_0',
          SampleRate: 48000,
        },
      },
    },
  ],
  OutputSettings: {
    HlsSettings: {},
  },
  NameModifier: '_1080p',
};

export const outputHLS720p: MediaConvertOutput = {
  ContainerSettings: {
    Container: 'M3U8',
    M3u8Settings: {},
  },
  VideoDescription: {
    Width: 1280,
    Height: 720,
    CodecSettings: {
      Codec: 'H_264',
      H264Settings: {
        MaxBitrate: 3000000,
        RateControlMode: 'QVBR',
        SceneChangeDetect: 'TRANSITION_DETECTION',
      },
    },
  },
  AudioDescriptions: [
    {
      CodecSettings: {
        Codec: 'AAC',
        AacSettings: {
          Bitrate: 96000,
          CodingMode: 'CODING_MODE_2_0',
          SampleRate: 48000,
        },
      },
    },
  ],
  OutputSettings: {
    HlsSettings: {},
  },
  NameModifier: '_720p',
};

export const outputHLS480p: MediaConvertOutput = {
  ContainerSettings: {
    Container: 'M3U8',
    M3u8Settings: {},
  },
  VideoDescription: {
    Width: 854,
    Height: 480,
    CodecSettings: {
      Codec: 'H_264',
      H264Settings: {
        MaxBitrate: 1500000,
        RateControlMode: 'QVBR',
        SceneChangeDetect: 'TRANSITION_DETECTION',
      },
    },
  },
  AudioDescriptions: [
    {
      CodecSettings: {
        Codec: 'AAC',
        AacSettings: {
          Bitrate: 64000,
          CodingMode: 'CODING_MODE_2_0',
          SampleRate: 48000,
        },
      },
    },
  ],
  OutputSettings: {
    HlsSettings: {},
  },
  NameModifier: '_480p',
};

export const outputHLS360p: MediaConvertOutput = {
  ContainerSettings: {
    Container: 'M3U8',
    M3u8Settings: {},
  },
  VideoDescription: {
    Width: 640,
    Height: 360,
    CodecSettings: {
      Codec: 'H_264',
      H264Settings: {
        MaxBitrate: 800000, // Lowered bitrate for 360p
        RateControlMode: 'QVBR',
        SceneChangeDetect: 'TRANSITION_DETECTION',
      },
    },
  },
  AudioDescriptions: [
    {
      CodecSettings: {
        Codec: 'AAC',
        AacSettings: {
          Bitrate: 64000,
          CodingMode: 'CODING_MODE_2_0',
          SampleRate: 48000,
        },
      },
    },
  ],
  OutputSettings: {
    HlsSettings: {},
  },
  NameModifier: '_360p',
};

export const AWS_MEDIA_CONVERT_QUEUE =
  '<PUT YOUR MEDIA CONVERT ARN QUEUE HERE>';

export const AWS_MEDIA_CONVERT_IAM_ROLE =
  '<PUT YOUR IAM ROLE ARN HERE>';

export const DEFAULT_HLS_SEGMENT_LENGTH_IN_SEC = 10;

export const HLS_CONTENT_PREFIX = 'hls';

export const PRIVATE_KEY_CONTENT = process.env.ABS_PRIVATE_KEY_CONTENT;