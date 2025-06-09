import { cloneDeep } from 'lodash-es';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createTransport } from 'nodemailer';
import type { FormValues } from '@/components/contactForm/ContactForm';
import isEmptyString from '@/lib/common/helper/isEmptyString';
import ContactReason from '@/lib/contact/ContactReason';
import validateRealUser from '@/lib/contact/validateRealUser';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method not allowed.' });
        return;
    }

    const body = req.body as Partial<FormValues>;

    if (
        isEmptyString(body.fullName) ||
        isEmptyString(body.mailAddress) ||
        isEmptyString(body.message) ||
        isEmptyString(body['cf-turnstile-response'])
    ) {
        res.status(400).json({ message: 'Bad request. Malformed body.' });
        return;
    }

    const successfullyValidatedRealUser = await validateRealUser(body['cf-turnstile-response'], req.headers['x-forwarded-for'] as string);

    if (!successfullyValidatedRealUser) {
        res.status(401).json({ message: 'Unauthorized. Turnstile validation failed.' });
        return;
    }

    if (
        isEmptyString(process.env.MAIL_USER) ||
        isEmptyString(process.env.MAIL_PASS) ||
        isEmptyString(process.env.MAIL_HOST) ||
        isEmptyString(process.env.MAIL_PORT)
    ) {
        res.status(503).json({ message: 'Service unavailable. Mail credentials not set.' });
        return;
    }

    const recipient = isEmptyString(body.contactReason) ? ContactReason.General : body.contactReason;

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

    if (body.sendCopyToSender === true) {
        const mailDataClone = cloneDeep(mailData);
        mailDataClone.to = body.mailAddress;
        mailDataClone.replyTo = '';
        mailDataClone.text = `Folgende Nachricht wurde an ${recipient} gesendet: ${mailDataClone.text}`;
        mailDataClone.html = `<p>${mailDataClone.text.replace(/\r\n|\r|\n/g, '<br/>')}</p>`;

        try {
            await transporter.sendMail(mailDataClone);
        } catch {
            // In the unlikely case that only this mail fails, we won't show an error.
        }
    }

    res.status(200).json({ message: 'Success' });
};
