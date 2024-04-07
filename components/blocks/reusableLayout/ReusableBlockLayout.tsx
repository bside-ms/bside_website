import type { ReactElement } from 'react';
import type EventsOnPage from '@/types/EventsOnPage';
import type { Circle, Organisation, Page } from '@/types/payload/payload-types';
import ReusableBlocks from '@blocks/reusableLayout/ReusableBlocks';

interface Props {
    layout: Page['layout'] | Circle['layout'] | Organisation['layout'];
    circles?: Array<Circle> | null;
    eventsOnPage?: EventsOnPage;
}

const ReusableBlockLayout = ({ layout, circles, eventsOnPage }: Props): ReactElement => {
    return (
        <>
            {layout?.map((layoutElement, index) => (
                <ReusableBlocks
                    key={
                        layoutElement.id ??
                        layoutElement.blockName ??
                        `${layoutElement.blockType}${index}`
                    }
                    layoutElement={layoutElement}
                    circles={circles}
                    previousBlock={layout[index - 1]?.blockType ?? 'none'}
                    nextBlock={layout[index + 1]?.blockType ?? 'none'}
                    eventsOnPage={eventsOnPage}
                />
            ))}
        </>
    );
};

export default ReusableBlockLayout;
