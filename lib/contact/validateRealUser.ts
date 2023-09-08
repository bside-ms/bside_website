const validateRealUser = async (cfTurnstileResponse: string, forwardedForHeader: string): boolean => {

    const form = new URLSearchParams();
    form.append('secret', process.env.TURNSTILE_SECRET_KEY);
    form.append('response', cfTurnstileResponse);
    form.append('remoteip', forwardedForHeader);

    const result = await fetch(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        { method: 'POST', body: form }
    );

    const json = await result.json() as { success?: boolean };

    return json.success === true;
};

export default validateRealUser;
