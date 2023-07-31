import { useCallback } from 'react';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import Heart from '@/components/svg/Heart';

interface MobileLogoProps {
    hideLogo: boolean;
}

const MobileLogo = ({ hideLogo = false }: MobileLogoProps): ReactElement => {

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
                className="absolute top-0 left-0 border-[50px] border-transparent transition-all duration-200"
                style={hideLogo ? undefined : { borderTopColor: 'white', borderLeftColor: 'white' }}
            />
            <div
                className="w-6 transition-opacity duration-200 z-20"
                style={hideLogo ? { opacity: 0 } : { opacity: '100%' }}
                onClick={handleClickOnHeart}
            >
                <Heart />
            </div>
        </>
    );
};

export default MobileLogo;
