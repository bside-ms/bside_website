import clsx from 'clsx';
import type { PropsWithChildren, ReactElement } from 'react';

interface Props extends PropsWithChildren {
    className?: string;
}

const ContentWrapper = ({ className = '', children }: Props): ReactElement => {

    return (
        <div className="flex-grow px-4 md:px-8">
            <div className={clsx('w-full lg:w-[54rem] xl:w-[70rem] mx-auto pb-4 lg:pt-4', className)}>
                {children}
            </div>
        </div>
    );
};

export default ContentWrapper;
