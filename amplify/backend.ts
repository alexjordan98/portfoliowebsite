import { defineBackend, secret } from '@aws-amplify/backend';
import { sendEmail } from './functions/send-email/resource';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { CorsHttpMethod, HttpApi, HttpMethod } from 'aws-cdk-lib/aws-apigatewayv2';
import { HttpLambdaIntegration } from 'aws-cdk-lib/aws-apigatewayv2-integrations';

const backend = defineBackend({
  sendEmail
});

const getAllowedOrigins = () => {
  const origins = [
    'http://localhost:3000',
    'https://jordanthesoftwaredeveloper.com',
    'https://www.jordanthesoftwaredeveloper.com'
  ];

  return origins;
};

// Create HTTP API for the contact form
const httpApi = new HttpApi(backend.stack, 'ContactFormApi', {
  apiName: 'contact-form-api',
  corsPreflight: {
    allowOrigins: getAllowedOrigins(),
    allowMethods: [CorsHttpMethod.POST, CorsHttpMethod.OPTIONS],
    allowHeaders: ['Content-Type', 'Authorization']
  }
});

// Add Lambda integration to API
const integration = new HttpLambdaIntegration(
  'sendEmailIntegration',
  backend.sendEmail.resources.lambda
);

httpApi.addRoutes({
  path: '/contact',
  methods: [HttpMethod.POST],
  integration: integration
});

// Grant SES permissions to Lambda
backend.sendEmail.resources.lambda.addToRolePolicy(
  new PolicyStatement({
    actions: ['ses:SendEmail', 'ses:SendRawEmail'],
    resources: ['*']
  })
);

// Add environment variables
backend.sendEmail.addEnvironment('SENDER_EMAIL', 'alexjordan98@gmail.com');
backend.sendEmail.addEnvironment('RECIPIENT_EMAIL', 'alexjordan98@gmail.com');
backend.sendEmail.addEnvironment('RECAPTCHA_SECRET_KEY', secret('RECAPTCHA_SECRET_KEY'));

// Output API URL
backend.addOutput({
  custom: {
    contactApiUrl: httpApi.url
  }
});