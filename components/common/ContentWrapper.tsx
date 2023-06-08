import type { PropsWithChildren, ReactElement } from 'react';

interface Props extends PropsWithChildren {
    px?: boolean;
    py?: boolean;
}

const ContentWrapper = ({ px = true, py = true, children }: Props): ReactElement => {

    return (
        <div className={`flex-grow ${px ? 'px-8' : 'px-0'}`}>
            <div className={`w-full md:w-[50rem] mx-auto ${py ? 'py-4' : 'py-0'}`}>
                {children}
            </div>
        </div>
    );
};

export default ContentWrapper;
