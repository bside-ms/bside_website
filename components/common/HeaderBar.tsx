import { useCallback } from 'react';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import { useAppContext } from 'components/common/AppContext';
import BurgerHeart from 'components/svg/BurgerHeart';
import Heart from 'components/svg/Heart';

interface Props {
    isVisible?: boolean;
}

const HeaderBar = ({ isVisible = true }: Props): ReactElement => {

    const { toggleNavigation } = useAppContext();

    const { pathname, push } = useRouter();

    const handleClickOnHeart = useCallback(
        () => pathname === '/'
            ? window.scrollTo({ top: 0, behavior: 'smooth' })
            : push('/'),
        [pathname, push]
    );

    return (
        <div className="sticky top-0 left-0 right-0 z-10 bg-white">
            <div className="lg:w-[60rem] lg:mx-auto">
                <div className={isVisible ? 'opacity-100' : 'opacity-0'}>
                    <div className="p-4 flex justify-between">
                        <div
                            className="w-6 md:w-8 md:cursor-pointer md:hover:text-orange-500"
                            onClick={handleClickOnHeart}
                        >
                            <Heart />
                        </div>

                        <div
                            className="w-6 md:w-8 md:cursor-pointer md:hover:text-orange-500"
                            onClick={toggleNavigation}
                        >
                            <BurgerHeart />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderBar;
