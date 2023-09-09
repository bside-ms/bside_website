import type { NextApiRequest, NextApiResponse } from 'next';
import { createTransport } from 'nodemailer';
import type { FormValues } from '@/components/contactForm/ContactForm';
import isEmptyString from '@/lib/common/helper/isEmptyString';
import ContactReason from '@/lib/contact/ContactReason';

export default async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> => {

    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method not allowed.' });
        return;
    }

    const body = req.body as Partial<FormValues>;
    if (isEmptyString(body.message)) {
        res.status(400).json({ message: 'Bad request. Malformed body.' });
        return;
    }

    if (isEmptyString(process.env.MAIL_USER) || isEmptyString(process.env.MAIL_PASS)
        || isEmptyString(process.env.MAIL_HOST) || isEmptyString(process.env.MAIL_PORT)) {
        res.status(503).json({ message: 'Service unavailable. Mail credentials not set.' });
        return;
    }

    const recipient = ContactReason.IT;

    const transporter = createTransport({
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
        secure: true,
    });

    const mailData = {
        from: process.env.MAIL_USER,
        to: `${recipient}@b-side.ms`,
        subject: '[b-side.ms - 404] Fehlende Route',
        text: `${body.message}`,
    };

    try {
        await transporter.sendMail(mailData);
        res.status(200).json({ message: 'Success' });
    } catch {
        res.status(500).json({ message: 'Internal server error. Failed to send the Mail.' });
    }
};
