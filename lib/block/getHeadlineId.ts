import type { ReactNode } from 'react';
import isNotEmptyString from '@/lib/common/helper/isNotEmptyString';
import { toKebabCase } from '@/lib/common/toKebabCase';

const getHeadlineId = (anchor: string | null | undefined, children: ReactNode): string | undefined => {

    if (isNotEmptyString(anchor)) {
        return toKebabCase(anchor);
    }

    if (typeof children === 'string') {
        return toKebabCase(children);
    }

    return undefined;
};

export default getHeadlineId;
