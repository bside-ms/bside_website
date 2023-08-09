import type React from 'react';
import type { SlateChildren } from '@/types/payload/Blocks';
import serializeRichTextToHtml from 'components/blocks/richTextBlock/serializeRichTextToHtml';

const RichText: React.FC<{ className?: string, content: SlateChildren}> = ({ className, content }) => {
    if (content.length <= 0) {
        return null;
    }

    return (
        <div className={className}>
            {serializeRichTextToHtml(content as SlateChildren)}
        </div>
    );
};

export default RichText;
