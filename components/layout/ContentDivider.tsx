import type { ReactElement } from 'react';

const ContentDivider = ({ mt = false }: {mt?: boolean}): ReactElement => {

    const margin = mt ? 'mt-[60px]' : 'mt-2';

    return (
        <div className={`${margin} md:mt-[60px]`} />
    );
};

export default ContentDivider;
