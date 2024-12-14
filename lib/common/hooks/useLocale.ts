import { useRouter } from 'next/router';

const useLocale = (): 'de' | 'en' => {
    return (useRouter().locale as 'de' | 'en' | undefined) ?? 'de';
};

export default useLocale;
