import clsx from 'clsx';
import type { PropsWithChildren, ReactElement } from 'react';

interface Props extends PropsWithChildren {
    className?: string;
}

const ContentWrapper = ({ className = '', children }: Props): ReactElement => {
    return (
        <div className="grow px-4 md:px-8">
            <div className={clsx('mx-auto w-full pb-4 lg:w-[54rem] lg:pt-4 xl:w-[70rem]', className)}>{children}</div>
        </div>
    );
};

export default ContentWrapper;
