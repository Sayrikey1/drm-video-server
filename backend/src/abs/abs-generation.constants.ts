import { Output as MediaConvertOutput } from '@aws-sdk/client-mediaconvert'; // ES Modules import

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

export const PRIVATE_KEY_CONTENT = '-----BEGIN RSA PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCyI2ZcykXHzaHD\nKLwGYg6vPFWYkFqHqqrbp+15CcFoe3bp2sZCHxsabHljwnmGH6z8jt7BCnohrRbQ\nPUdwpFQ9izdSLn4cq9buOrEXS5OYTOgnPSJDmIA58nO2TNxp7Tzytudubwak34bJ\nRq/0ebyyaMsiZy097Vf3sPsmQspSA2RWBTVaPC0UpfVxNwfGAGxxqhN2BZZ8EyUL\nlEJo3W5ADJ5vuJxOLTRBpiDFwKlvmIHkyXlyEMzPqVdZIcgpe6EvMz4uab+N0/6d\nXAUO+9hkogRS4zmCpPxeLQh8hydGxNkIe8g9gyL6fL3jdipadpUD6Hl2tZHgXZ1E\nh7nzGyVHAgMBAAECggEAVsRSXBjz8zWwOIBTUSKa93TCVnzdc55H+ZSqYR3E1HDq\nw05Z6iP/jhfO6q3zhkZQenXWfx1szpFh/s0SSoXoOE/igsd9itaSalgxIOEhg3nW\nTCKFWXpi3pa/EMkQRRIWcTxwroQqrszneItTMhfHtvi/FMM/sJ22DsHoGsNGi7om\nJzDSHcXNW7BETE+8hGAspBnNrv+SmuJUl/0C1ZMwznA/BhCli3rM6bt7SANgR9lo\n06uy9v3+G+aFR91miFcjVJzHttougWZoXn8QT14b+14CrvL6DNnAgjDmVK60fSso\nxMXBjESCSZ2angcxKFRwSxWoKeJ2NbMrFXf1kJxH6QKBgQDZuVJZKI18PSMEpJ6E\nV/B2QXeGJOjRdP0KZN7akJXKmYBetKs8SQQopxHivWK69WrgfONudyiqj1or8Jyt\nQuz5MxSX2nYwtiXq7N07KqExQ5oPn+v4Oyx8VAXKggQ2wUCkalVzaEvOY8oLNJQ7\nJfb+2O+fGEsvg5vVQdF0/3ZCDwKBgQDRdIY6ap1c/Pt/GHxTW+6uDZjXNjJA5l/m\nvL/2AUCNAo+nUoKrgRsKMjQwycnEBv6BZxeo1ntUf9P6WEdVmUMkPmCb4ZmGuNAe\nRrNFXAQshTuiXIZGGrn9bHeaYnRFKoxPVwHLkWW2Ng3HkLfUYhLLc0xDfYfobAHh\nWP/TVRvBSQKBgHNzkfc1SdFXmfocUPJcr2YF0RuQ9uQa5RNd6c58XPHR9ABETYjq\nLwpfjVxukKwS91mS4AbzqNzIp0glju9RTdfW/lSHw6SQ8gphD+8P6+nzrv4aD0bS\nGgTTiT6ZMyLV1zFYMXfBFnGa+Mh4WSIEP7Vj06zJdRT89OVgwXEJBeyBAoGAJCtA\nBpRkiisxbrgWt/pXE/1LGFbGhMiDZP/REjUTJYZ8sgMgh2cq+S7ELmyaB9zBVC0u\nO7yV3XiZbVCTOOfXXUncOu7RKR9+6MuCp4aFPf7f1mCt2ytAVM/HM4Su2UbIpea7\na6C29KkO5hhKdkVdQ36se7cQogUMqhJJUwAOY+kCgYAYBHi7iWhEzpMG+sZ5RzKT\no7mBqFVXyvYuhgq1105qV3l65RzOUrXmtFQlvNLCFPeHE4bG5CngGSR5yu0ZgnQ8\n/FNf0PrfOj+2E7h/Z4TZzQmcsuL4rm8M+Rb/kNy3IKAvDTAMkH1cmeaXAXXbUvOe\nRnpK90XPlRkOKMBJ1+vQKA==\n-----END RSA PRIVATE KEY-----';
