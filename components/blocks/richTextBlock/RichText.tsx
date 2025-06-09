import type { ReactElement } from 'react';
import type { SlateChildren } from '@/types/payload/Blocks';
import serializeRichTextToHtml from 'components/blocks/richTextBlock/serializeRichTextToHtml';

interface Props {
    className?: string;
    content: SlateChildren;
}

const RichText = ({ className, content }: Props): ReactElement | null => {
    if (content.length <= 0) {
        return null;
    }

    return (
        <div key={content.length} className={className}>
            {serializeRichTextToHtml(content)}
        </div>
    );
};

export default RichText;
