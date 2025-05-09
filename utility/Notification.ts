import dotenv from 'dotenv';
dotenv.config();

export const GenerateOTP = () => {
    const otp = Math.floor(100000 + (Math.random() * 900000));
    let expiry = new Date();
    expiry.setTime(new Date().getTime() + (30 * 60 * 1000));
    return { otp, expiry };
}

export const requestOTP = async (otp: number, to: string) => {
    const accountSid = process.env.TWILIO_ACCOUNT_SID!;
    const authToken = process.env.TWILIO_AUTH_TOKEN!;
    const fromPhone = process.env.TWILIO_PHONE_NUMBER!;

    const client = require('twilio')(accountSid, authToken);

    const response = await client.messages.create({
        body: `Your OTP is ${otp}`,
        to: `+91${to}`, // User's number
        from: fromPhone, // Your Twilio number
    });

    return response;
}
