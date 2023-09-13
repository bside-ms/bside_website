/* eslint-disable react/jsx-props-no-spreading */
import { useCallback, useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import type { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import Spinner from '@/components/common/Spinner';
import ContactReason from '@/lib/contact/ContactReason';
import createPayloadEntry from '@/lib/payload/createPayloadEntry';

const contactReasonLabels: Record<ContactReason, string> = {
    [ContactReason.General]: 'Allgemeine Anfrage',
    [ContactReason.Kultur]: 'Kulturverein',
    [ContactReason.GmbH]: 'GmbH',
    [ContactReason.Festival]: 'Festival',
    [ContactReason.IT]: 'Webseite-Feedback',
};

export interface FormValues {
    contactReason: ContactReason;
    fullName: string;
    mailAddress: string;
    message: string;
    sendCopyToSender: boolean;
    cfTurnstileResponse: string;
}

const ContactForm = (): ReactElement => {

    const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful }, setError } = useForm<FormValues>();

    const formContainerRef = useRef<HTMLDivElement>(null);
    const [formMinHeight, setFormMinHeight] = useState<number>(0);

    const handleFormSubmit = useCallback(async (formValues: FormValues): Promise<void> => {

        const response = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/contact/submit`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formValues),
        });

        createPayloadEntry('/api/contact-forms', {
            fullName: formValues.fullName,
            mailAddress: formValues.mailAddress,
            message: formValues.message,
            sendCopyToSender: formValues.sendCopyToSender ? 'ja' : 'nein',
            recipient: formValues.contactReason,
        }).then();

        if (response.status === 200) {
            setFormMinHeight(formContainerRef.current?.getBoundingClientRect().height ?? 0);
        } else {
            setError(
                'root',
                { message: 'Bei der Übertragung deiner Nachricht ist leider ein Fehler aufgetreten. Bitte versuche es nochmal!' }
            );
        }

    }, [setError]);

    useEffect(() => setFormMinHeight(0), [isSubmitSuccessful]);

    return (
        <>
            <Script
                src="https://challenges.cloudflare.com/turnstile/v0/api.js"
                async={true}
                defer={true}
            />
            <div className="bg-black transition-[min-height] duration-500" ref={formContainerRef} style={{ minHeight: formMinHeight }}>
                <div className="py-4 px-6">
                    {isSubmitSuccessful ? (
                        <div className="flex gap-4 items-center flex-col text-white p-6">
                            <div className="font-serif text-2xl">
                                Danke für deine Nachricht!
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit(handleFormSubmit)} noValidate={true} className="flex flex-col gap-5">
                            <div className="font-serif text-white text-2xl text-center">
                                Melde dich bei uns!
                            </div>

                            <div>
                                <label className="block font-serif text-white pb-1" htmlFor="contactReason">
                                    Grund deiner Anfrage <span className="text-orange-500">*</span>
                                </label>
                                <select
                                    className="p-1 w-full max-w-lg pr-4 bg-white outline-0"
                                    id="contactReason"
                                    {...register(
                                        'contactReason',
                                        {
                                            required: {
                                                value: true,
                                                message: 'Bitte gib einen Grund für deine Anfrage an',
                                            },
                                        }
                                    )}
                                >
                                    {Object.values(ContactReason).map(reason => (
                                        <option
                                            key={reason}
                                            value={reason}
                                        >
                                            {contactReasonLabels[reason]}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block font-serif text-white pb-1" htmlFor="fullName">
                                    Dein Name <span className="text-orange-500">*</span>
                                </label>
                                <input
                                    className="w-full p-1 disabled:bg-gray-200"
                                    id="fullName"
                                    {...register(
                                        'fullName',
                                        {
                                            required: {
                                                value: true,
                                                message: 'Bitte gib deinen Namen an',
                                            },
                                        }
                                    )}
                                    disabled={isSubmitting}
                                    type="text"
                                    required={true}
                                />
                                {errors.fullName && (
                                    <div className="text-sm text-orange-400 font-bold pt-1">
                                        {errors.fullName.message}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block font-serif text-white pb-1" htmlFor="mailAddress">
                                    Deine E-Mail-Adresse <span className="text-orange-500">*</span>
                                </label>
                                <input
                                    className="w-full p-1 disabled:bg-gray-200"
                                    id="mailAddress"
                                    {...register(
                                        'mailAddress',
                                        {
                                            required: {
                                                value: true,
                                                message: 'Bitte gib deine E-Mail-Adresse an',
                                            },
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: 'Bitte gib eine gültige E-Mail-Adresse an',
                                            },
                                        }
                                    )}
                                    disabled={isSubmitting}
                                    type="email"
                                    required={true}
                                />
                                {errors.mailAddress && (
                                    <div className="text-sm text-orange-400 font-bold pt-1">
                                        {errors.mailAddress.message}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block font-serif text-white pb-1" htmlFor="message">
                                    Deine Nachricht an uns <span className="text-orange-500">*</span>
                                </label>
                                <textarea
                                    className="w-full p-1 disabled:bg-gray-200"
                                    required={true}
                                    disabled={isSubmitting}
                                    rows={5}
                                    id="message"
                                    {...register(
                                        'message',
                                        {
                                            required: {
                                                value: true,
                                                message: 'Bitte gib deine Nachricht an',
                                            },
                                        }
                                    )}
                                />
                                {errors.message && (
                                    <div className="text-sm text-orange-400 font-bold">
                                        {errors.message.message}
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-3">
                                <div className="pt-1">
                                    <input
                                        type="checkbox"
                                        id="sendCopyToSender"
                                        className="block w-4 h-4 bg-gray-100 border-gray-300 rounded cursor-pointer"
                                        {...register('sendCopyToSender')}
                                    />
                                </div>
                                <label className="block font-serif text-white cursor-pointer" htmlFor="sendCopyToSender">
                                    Ich möchte, dass eine Kopie der Nachricht an meine E-Mail-Adresse gesendet wird
                                </label>
                            </div>

                            <div className="md:flex md:justify-between">
                                <div
                                    className="cf-turnstile checkbox"
                                    data-language="de"
                                    data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                                    data-response-field-name="cfTurnstileResponse"
                                    {...register('cfTurnstileResponse')}
                                />

                                <div className="flex flex-col justify-end">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="mt-4 md:mt:0 w-full md:w-52 text-black bg-white font-serif py-1 px-7 md:cursor-pointer md:hover:bg-orange-500 disabled:cursor-default disabled:!bg-gray-200"
                                    >
                                        <span className="relative">
                                            Senden

                                            {isSubmitting && (
                                                <span
                                                    className="absolute top-1/2 right-[calc(100%+8px)] -translate-y-1/2 w-5"
                                                >
                                                    <Spinner />
                                                </span>
                                            )}
                                        </span>
                                    </button>
                                </div>
                            </div>

                            {errors.root && (
                                <div className="text-orange-400 font-bold text-right">
                                    {errors.root.message}
                                </div>
                            )}
                        </form>
                    )}
                </div>
            </div>
        </>
    );
};

export default ContactForm;
