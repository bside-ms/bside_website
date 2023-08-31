import type { ReactElement } from 'react';
import type { Circle, Event, Organisation, Page } from '@/types/payload/payload-types';
import ReusableBlocks from '@blocks/reusableLayout/ReusableBlocks';

interface Props {
    layout: Page['layout'] | Circle['layout'] | Organisation['layout'];
    circles?: Array<Circle> | null;
    events?: Array<Event> | null;
}

export default ({ layout, circles, events }: Props): ReactElement => {
    return (
        <>
            {
                layout?.map((layoutElement, index) => (
                    <ReusableBlocks
                        key={layoutElement.id ?? layoutElement.blockName ?? `${layoutElement.blockType}${index}`}
                        layoutElement={layoutElement}
                        circles={circles}
                        events={events}
                        previousBlock={layout[index - 1]?.blockType ?? 'none'}
                        nextBlock={layout[index + 1]?.blockType ?? 'none'}
                    />
                ))
            }
        </>
    );
};
