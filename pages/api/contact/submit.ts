import type { NextApiRequest, NextApiResponse } from 'next';
import { createTransport } from 'nodemailer';
import type { FormValues } from '@/components/contactForm/ContactForm';
import isEmptyString from '@/lib/common/helper/isEmptyString';

export default async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> => {

    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method not allowed.' });
        return;
    }

    const body = req.body as Partial<FormValues>;

    if (isEmptyString(body.fullName) || isEmptyString(body.mailAddress) || isEmptyString(body.message) || isEmptyString(body.cfTurnstileResponse)) {
        res.status(400).json({ message: 'Bad request. Malformed body.' });
        return;
    }

    const form = new URLSearchParams();
    form.append('secret', process.env.TURNSTILE_SECRET_KEY);
    form.append('response', body.cfTurnstileResponse);
    form.append('remoteip', req.headers['x-forwarded-for'] as string);

    const result = await fetch(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        { method: 'POST', body: form }
    );

    const json = await result.json() as {
        success?: boolean;
    };
    if (json.success !== undefined && !json.success) {
        res.status(401).json({ message: 'Unauthorized. Turnstile validation failed.' });
        return;
    }

    if (isEmptyString(process.env.MAIL_USER) || isEmptyString(process.env.MAIL_PASS) || isEmptyString(process.env.MAIL_RECIPIENT)
        || isEmptyString(process.env.MAIL_HOST) || isEmptyString(process.env.MAIL_PORT)) {
        res.status(503).json({ message: 'Service unavailable. Mail credentials not set.' });
        return;
    }

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
        to: process.env.MAIL_RECIPIENT,
        replyTo: body.mailAddress,
        subject: `[b-side.ms - Kontaktformular] Neue Nachricht von ${body.fullName}`,
        text: `${body.message} | Sent from: ${body.mailAddress}`,
        html: `<p>${body.message.replace(/\r\n|\r|\n/g, '<br/>')}</p><p>Sent from: ${body.mailAddress}</p>`,
    };

    try {
        await transporter.sendMail(mailData);
    } catch {
        res.status(500).json({ message: 'Internal server error. Failed to send the Mail.' });
        return;
    }

    res.status(200).json({ message: 'Success' });
};
