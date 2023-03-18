import type { PropsWithChildren, ReactElement } from 'react';

const ContentWrapper = ({ children }: PropsWithChildren): ReactElement => {

    return (
        <div className="w-full md:w-[50rem] mx-auto py-4 px-8">
            {children}
        </div>
    );
};

export default ContentWrapper;
