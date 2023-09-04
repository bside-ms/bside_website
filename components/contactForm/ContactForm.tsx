/* eslint-disable react/jsx-props-no-spreading */
import { useCallback, useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import type { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import Spinner from '@/components/common/Spinner';

interface FormValues {
    fullName: string;
    mailAddress: string;
    message: string;
    cfTurnstileResponse: string;
}

const ContactForm = (): ReactElement => {

    const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful }, getValues } = useForm<FormValues>();

    const formContainerRef = useRef<HTMLDivElement>(null);
    const [formMinHeight, setFormMinHeight] = useState<number>(0);

    const handleFormSubmit = useCallback(async (): Promise<void> => {

        const data: FormValues = getValues();

        const response = await fetch('/api/contact/submit', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.status === 200) {
            setFormMinHeight(formContainerRef.current?.getBoundingClientRect().height ?? 0);
        }

    }, [getValues]);

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
                        <form onSubmit={handleSubmit(handleFormSubmit)} noValidate={true}>
                            <div className="font-serif text-white text-2xl text-center">
                                Melde dich bei uns!
                            </div>

                            <div className="pt-5">
                                <label className="block font-serif text-white pb-1">
                                    Dein Name <span className="text-orange-500">*</span>
                                </label>
                                <input
                                    className="w-full p-1 disabled:bg-gray-200"
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

                            <div className="pt-5">
                                <label className="block font-serif text-white pb-1">
                                    Dein E-Mail-Adresse <span className="text-orange-500">*</span>
                                </label>
                                <input
                                    className="w-full p-1 disabled:bg-gray-200"
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

                            <div className="pt-5">
                                <label className="block font-serif text-white pb-1">
                                    Deine Nachricht an uns <span className="text-orange-500">*</span>
                                </label>
                                <textarea
                                    className="w-full p-1 disabled:bg-gray-200"
                                    required={true}
                                    disabled={isSubmitting}
                                    rows={5}
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

                            <div className="flex pt-5 justify-between">
                                <div
                                    className="cf-turnstile checkbox"
                                    data-language="de"
                                    data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                                    data-response-field-name="cfTurnstileResponse"
                                    {...register('cfTurnstileResponse')}
                                />

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-52 text-black bg-white font-serif py-1 px-7 md:cursor-pointer md:hover:bg-orange-500 disabled:cursor-default disabled:!bg-gray-200"
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
                        </form>
                    )}
                </div>
            </div>
        </>
    );
};

export default ContactForm;
