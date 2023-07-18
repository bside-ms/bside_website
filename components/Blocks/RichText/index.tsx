
import type React from 'react';
import serialize from './serialize';

type SlateChildren = Array<Record<string, unknown>>;

const RichText: React.FC<{ className?: string, content: SlateChildren}> = ({ className, content }) => {
    if (content.length <= 0) {
        return null;
    }

    return (
        <div className={className}>
            { }
            {serialize(content as SlateChildren)}
        </div>
    );
};

export default RichText;