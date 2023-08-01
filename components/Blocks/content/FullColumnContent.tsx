import type { ReactElement } from 'react';
import RichText from '@/components/Blocks/RichText';
import type { ContentColumnProps } from '@/types/payload/Blocks';

interface Props {
    firstColumn: ContentColumnProps;
}

const FullColumnContent = ({ firstColumn }: Props): ReactElement | null => {

    return <RichText content={firstColumn.richText} />;
};

export default FullColumnContent;
