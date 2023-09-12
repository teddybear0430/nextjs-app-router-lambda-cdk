import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CfnOutput, Duration } from 'aws-cdk-lib';
// Lambda
import { DockerImageCode, DockerImageFunction } from 'aws-cdk-lib/aws-lambda';
import { Platform } from 'aws-cdk-lib/aws-ecr-assets';
// api gateway
import { HttpApi } from '@aws-cdk/aws-apigatewayv2-alpha';
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import * as path from 'path';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Next.jsを動作させるLambdaの定義
    const handler = new DockerImageFunction(this, 'Handler', {
      code: DockerImageCode.fromImageAsset(path.join(__dirname, '../../'), {
        platform: Platform.LINUX_AMD64,
        exclude: ['cdk'],
      }),
      memorySize: 256,
      timeout: Duration.seconds(30),
    });

    // api gateway
    const api = new HttpApi(this, 'Api', {
      apiName: 'Frontend',
      defaultIntegration: new HttpLambdaIntegration('Integration', handler),
    });

    new CfnOutput(this, 'ApiEndpoint', { value: api.apiEndpoint });
  }
}
