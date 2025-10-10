import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import type { APIGatewayProxyHandler } from 'aws-lambda';

const sesClient = new SESClient({ region: process.env.AWS_REGION || 'us-east-1' });

const verifyRecaptcha = async (token: string): Promise<boolean> => {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();
    return data.success;
};

export const handler: APIGatewayProxyHandler = async (event) => {
    try {
        const body = JSON.parse(event.body || '{}');
        const { name, email, message, recaptchaToken } = body;

        const isValidRecaptcha = await verifyRecaptcha(recaptchaToken);
        if (!isValidRecaptcha) {
            return {
                statusCode: 400,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ error: 'Invalid reCAPTCHA' })
            };
        }

        if (!name || !email || !message) {
            return {
                statusCode: 400,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    error: 'Missing required fields: name, email, and message are required'
                })
            };
        }

        const emailParams = {
            Source: process.env.SENDER_EMAIL!,
            Destination: {
                ToAddresses: [process.env.RECIPIENT_EMAIL!]
            },
            Message: {
                Subject: {
                    Data: `New Contact Form Submission from ${name}`,
                    Charset: 'UTF-8'
                },
                Body: {
                    Text: {
                        Data:
                           `Name: ${name}
                            Email: ${email}
                            Message:${message}`,
                        Charset: 'UTF-8'
                    },
                    Html: {
                        Data: `
                            <h2>New Contact Form Submission</h2>
                            <p><strong>Name:</strong> ${name}</p>
                            <p><strong>Email:</strong> ${email}</p>
                            <p><strong>Message:</strong></p>
                            <p>${message.replace(/\n/g, '<br>')}</p>
                            `,
                        Charset: 'UTF-8'
                    }
                }
            }
        };

        const command = new SendEmailCommand(emailParams);
        await sesClient.send(command);

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: 'Email sent successfully!'
            })
        };

    } catch (error) {
        console.error('Error sending email:', error);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                error: 'Failed to send email. Please try again later.'
            })
        };
    }
};