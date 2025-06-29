import type { ReactElement } from 'react';
import EventsOverview from '@/components/events/overview/EventsOverview';
import ContentWrapper from '@/components/layout/ContentWrapper';
import { Separator } from '@/components/ui/separator';
import type EventsOnPage from '@/types/EventsOnPage';
import type { SlateChildren } from '@/types/payload/Blocks';
import Headline from '@blocks/headlineBlock/Headline';
import RichText from '@blocks/richTextBlock/RichText';

interface EventOverviewBlockProps {
    headlineText: string;
    richText: SlateChildren;
    eventsOnPage?: EventsOnPage;
}

const EventsOverviewBlock = ({ headlineText, richText, eventsOnPage }: EventOverviewBlockProps): ReactElement => {
    return (
        <>
            <ContentWrapper className="">
                <div id="veranstaltungen">
                    <Headline title={headlineText} level="h2" />
                </div>
            </ContentWrapper>

            <ContentWrapper>
                <div className="lg:flex lg:gap-4">
                    <div className="lg:basis-2/3">
                        <EventsOverview eventsOnPage={eventsOnPage} />
                    </div>

                    <div className="overflow-y-auto pb-8 lg:basis-1/3 lg:px-4 lg:pb-0 lg:align-text-top">
                        <Separator className="my-2 lg:hidden" />

                        <RichText content={richText} />
                    </div>
                </div>
            </ContentWrapper>
        </>
    );
};

export default EventsOverviewBlock;
