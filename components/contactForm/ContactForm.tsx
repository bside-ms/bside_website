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
    'cf-turnstile-response': string;
}

const ContactForm = (): ReactElement => {
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors, isSubmitting, isSubmitSuccessful },
        setError,
    } = useForm<FormValues>();

    const formContainerRef = useRef<HTMLDivElement>(null);
    const [formMinHeight, setFormMinHeight] = useState<number>(0);

    const handleFormSubmit = useCallback(async (): Promise<void> => {
        // This is a hacky workaround to get the form values from the form.
        // Otherwise. the cf-turnstile-response will be undefined after the first submit.
        // Only resubmitting the form without changing anything would update the value.
        const formValues = getValues();

        console.warn(formValues);

        const response = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/contact/submit`, {
            method: 'POST',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formValues),
        });

        if (response.status === 200) {
            setFormMinHeight(formContainerRef.current?.getBoundingClientRect().height ?? 0);

            createPayloadEntry('/api/contact-forms', {
                fullName: formValues.fullName,
                mailAddress: formValues.mailAddress,
                message: formValues.message,
                sendCopyToSender: formValues.sendCopyToSender ? 'ja' : 'nein',
                recipient: formValues.contactReason,
            }).then();
        } else {
            setError('root', {
                message: 'Bei der Übertragung deiner Nachricht ist leider ein Fehler aufgetreten. Bitte versuche es nochmal!',
            });
        }
    }, [setError]);

    useEffect(() => setFormMinHeight(0), [isSubmitSuccessful]);

    return (
        <>
            <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async={true} defer={true} />
            <div className="bg-black transition-[min-height] duration-500" ref={formContainerRef} style={{ minHeight: formMinHeight }}>
                <div className="px-6 py-4">
                    {isSubmitSuccessful ? (
                        <div className="flex flex-col items-center gap-4 p-6 text-white">
                            <div className="font-serif text-2xl">Danke für deine Nachricht!</div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit(handleFormSubmit)} noValidate={true} className="flex flex-col gap-5">
                            <div className="text-center font-serif text-2xl text-white">Melde dich bei uns!</div>

                            <div>
                                <label className="block pb-1 font-serif text-white" htmlFor="contactReason">
                                    Grund deiner Anfrage <span className="text-orange-500">*</span>
                                </label>
                                <select
                                    className="w-full max-w-lg bg-white p-1 pr-4 outline-0"
                                    id="contactReason"
                                    {...register('contactReason', {
                                        required: {
                                            value: true,
                                            message: 'Bitte gib einen Grund für deine Anfrage an',
                                        },
                                    })}
                                >
                                    {Object.values(ContactReason).map((reason) => (
                                        <option key={reason} value={reason}>
                                            {contactReasonLabels[reason]}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block pb-1 font-serif text-white" htmlFor="fullName">
                                    Dein Name <span className="text-orange-500">*</span>
                                </label>
                                <input
                                    className="w-full p-1 disabled:bg-gray-200"
                                    id="fullName"
                                    {...register('fullName', {
                                        required: {
                                            value: true,
                                            message: 'Bitte gib deinen Namen an',
                                        },
                                    })}
                                    disabled={isSubmitting}
                                    type="text"
                                    required={true}
                                />
                                {errors.fullName && <div className="pt-1 text-sm font-bold text-orange-400">{errors.fullName.message}</div>}
                            </div>

                            <div>
                                <label className="block pb-1 font-serif text-white" htmlFor="mailAddress">
                                    Deine E-Mail-Adresse <span className="text-orange-500">*</span>
                                </label>
                                <input
                                    className="w-full p-1 disabled:bg-gray-200"
                                    id="mailAddress"
                                    {...register('mailAddress', {
                                        required: {
                                            value: true,
                                            message: 'Bitte gib deine E-Mail-Adresse an',
                                        },
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: 'Bitte gib eine gültige E-Mail-Adresse an',
                                        },
                                    })}
                                    disabled={isSubmitting}
                                    type="email"
                                    required={true}
                                />
                                {errors.mailAddress && (
                                    <div className="pt-1 text-sm font-bold text-orange-400">{errors.mailAddress.message}</div>
                                )}
                            </div>

                            <div>
                                <label className="block pb-1 font-serif text-white" htmlFor="message">
                                    Deine Nachricht an uns <span className="text-orange-500">*</span>
                                </label>
                                <textarea
                                    className="w-full p-1 disabled:bg-gray-200"
                                    required={true}
                                    disabled={isSubmitting}
                                    rows={5}
                                    id="message"
                                    {...register('message', {
                                        required: {
                                            value: true,
                                            message: 'Bitte gib deine Nachricht an',
                                        },
                                    })}
                                />
                                {errors.message && <div className="text-sm font-bold text-orange-400">{errors.message.message}</div>}
                            </div>

                            <div className="flex gap-3">
                                <div className="pt-1">
                                    <input
                                        type="checkbox"
                                        id="sendCopyToSender"
                                        className="block size-4 cursor-pointer rounded border-gray-300 bg-gray-100"
                                        {...register('sendCopyToSender')}
                                    />
                                </div>
                                <label className="block cursor-pointer font-serif text-white" htmlFor="sendCopyToSender">
                                    Ich möchte, dass eine Kopie der Nachricht an meine E-Mail-Adresse gesendet wird
                                </label>
                            </div>

                            <div className="md:flex md:justify-between">
                                <div
                                    // eslint-disable-next-line tailwindcss/no-custom-classname
                                    className="cf-turnstile checkbox"
                                    data-language="de"
                                    data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                                    {...register('cf-turnstile-response', {
                                        required: true,
                                        onChange: (event: Event) => {
                                            console.warn('changed', event);
                                        },
                                    })}
                                />

                                <div className="flex flex-col justify-end">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="mt-4 w-full bg-white px-7 py-1 font-serif text-black disabled:cursor-default disabled:!bg-gray-200 md:mt-0 md:w-52 md:cursor-pointer md:hover:bg-orange-500"
                                    >
                                        <span className="relative">
                                            Senden
                                            {isSubmitting && (
                                                <span className="absolute right-[calc(100%+8px)] top-1/2 w-5 -translate-y-1/2">
                                                    <Spinner />
                                                </span>
                                            )}
                                        </span>
                                    </button>
                                </div>
                            </div>

                            {errors.root && <div className="text-right font-bold text-orange-400">{errors.root.message}</div>}
                        </form>
                    )}
                </div>
            </div>
        </>
    );
};

export default ContactForm;
