import type { ReactElement } from 'react';
import type { ContentColumnProps } from '@/types/payload/Blocks';
import RichText from 'components/blocks/richTextBlock/RichText';

interface Props {
    firstColumn: ContentColumnProps;
}

const FullColumnContent = ({ firstColumn }: Props): ReactElement | null => {
    return <RichText content={firstColumn.richText} />;
};

export default FullColumnContent;
