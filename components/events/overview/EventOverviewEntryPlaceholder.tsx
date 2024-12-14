import { ReactElement } from 'react';
import { Badge } from '@/components/ui/badge';
import { ChevronRightIcon, ClockIcon } from '@radix-ui/react-icons';
import { range } from 'lodash-es';
import EventOverviewEntryImageFallback from '@/components/events/overview/EventOverviewEntryImageFallback';

const EventOverviewEntryPlaceholder = (): ReactElement => {
    return (
        <div className="flex overflow-hidden shadow-md transition-shadow hover:shadow-lg">
            <EventOverviewEntryImageFallback />

            <div className="flex grow flex-col px-4 py-2">
                <h3 className="mb-1 w-64 rounded bg-gray-300 text-lg leading-6">&nbsp;</h3>

                <div className="mb-2 flex flex-wrap gap-2">
                    {range(2).map((index) => (
                        <Badge key={index} size="small" hover="disabled" variant="secondary">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </Badge>
                    ))}
                </div>

                <div className="mt-auto flex items-center text-sm text-muted-foreground">
                    <ClockIcon className="mr-1 size-4" />

                    <span className="rounded bg-gray-300">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                </div>

                <div className="mb-2 mt-1 flex flex-wrap gap-2">
                    <Badge variant="secondary" size="small" hover="disabled">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </Badge>
                </div>
            </div>

            <div className="flex items-center pr-4">
                <ChevronRightIcon className="size-5 text-muted-foreground" />
            </div>
        </div>
    );
};

export default EventOverviewEntryPlaceholder;
