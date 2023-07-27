import { useCallback } from 'react';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import Heart from '@/components/svg/Heart';

interface MobileLogoProps {
    disableLogo: boolean;
}
const MobileLogo = ({ disableLogo = false }: MobileLogoProps): ReactElement => {
    const { pathname, push } = useRouter();
    const handleClickOnHeart = useCallback(
        () => pathname === '/'
            ? window.scrollTo({ top: 0, behavior: 'smooth' })
            : push('/'),
        [pathname, push]
    );

    return (
        <>
            <div
                className="md:hidden absolute top-0 left-0 border-[50px] md:border-[60px] border-transparent transition-all duration-200"
                style={disableLogo ? undefined : { borderTopColor: 'white', borderLeftColor: 'white' }}
            />
            <div
                className="md:hidden w-6 md:w-8 md:cursor-pointer md:hover:text-orange-500 transition-opacity duration-200 z-20"
                style={disableLogo ? { opacity: 0 } : { opacity: '100%' }}
                onClick={handleClickOnHeart}
            >
                <Heart />
            </div>
        </>
    );
};

export default MobileLogo;
