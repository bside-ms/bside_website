import type { PropsWithChildren, ReactElement } from 'react';

const ContentWrapper = ({ children }: PropsWithChildren): ReactElement => {

    return (
        <div className="flex-grow mt-12">
            <div className="w-full md:w-[50rem] mx-auto py-4 px-8">
                {children}
            </div>
        </div>
    );
};

export default ContentWrapper;
