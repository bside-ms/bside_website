import type { PropsWithChildren, ReactElement } from 'react';

interface Props extends PropsWithChildren {
    px?: boolean;
}

const ContentWrapper = ({ px = true, children }: Props): ReactElement => {

    return (
        <div className={`flex-grow px-${px ? 8 : 0}`}>
            <div className="w-full md:w-[50rem] mx-auto py-4">
                {children}
            </div>
        </div>
    );
};

export default ContentWrapper;
