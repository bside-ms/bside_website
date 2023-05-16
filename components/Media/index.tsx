import { Fragment } from 'react';
import type React from 'react';
import { Image } from './Image';
import type { Props } from './types';
// import { Video } from './Video';

export const Media: React.FC<Props> = props => {
    const { className, htmlElement = 'div' } = props;

    const Tag = (htmlElement!) || Fragment;

    return (
        <Tag {...(htmlElement !== null ? { className } : {})}>
            <Image {...props} />
        </Tag>
    );
};
