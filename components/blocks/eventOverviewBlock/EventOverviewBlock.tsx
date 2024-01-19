import type { ReactElement } from 'react';
import EventOverview from '@/components/events/overview/EventOverview';
import ContentWrapper from '@/components/layout/ContentWrapper';
import type { SlateChildren } from '@/types/payload/Blocks';
import type { Event } from '@/types/payload/payload-types';
import Headline from '@blocks/headlineBlock/Headline';
import RichText from '@blocks/richTextBlock/RichText';

interface EventOverviewBlockProps {
    headlineText: string;
    events: Array<Event>;
    richText: SlateChildren;
}

const EventOverviewBlock = ({ events, headlineText, richText }: EventOverviewBlockProps): ReactElement => {

    return (
        <>
            <ContentWrapper className="!py-0 !pb-0 !-mb-2">
                <div className="mt-4" id="veranstaltungen">
                    <Headline
                        title={headlineText}
                        level="h2"
                    />
                </div>
            </ContentWrapper>

            <ContentWrapper>
                <div className="lg:flex lg:gap-4 lg:flex-row-reverse">

                    <div className="lg:basis-1/3 lg:align-text-top lg:px-4 overflow-y-auto pb-8 lg:pb-0">
                        <RichText content={richText} />
                    </div>

                    <div className="lg:basis-2/3 overflow-y">
                        <EventOverview
                            title=""
                            events={events}
                        />
                    </div>
                </div>
            </ContentWrapper>
        </>
    );
};

export default EventOverviewBlock;
