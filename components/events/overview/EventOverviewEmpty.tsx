import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import isEmptyString from '@/lib/common/helper/isEmptyString';

interface NoEventProps {
    title?: string;
}

const EventOverviewEmpty = ({ title }: NoEventProps): ReactElement => {
    const { locale } = useRouter();

    return (
        <div>
            {!isEmptyString(title) && (
                <div className="font-bold font-serif text-xl md:text-2xl text-center mb-3">
                    {title}
                </div>
            )}

            <div className="md:text-lg">
                <div>
                    <div className="mb-2">
                        <div className="px-3 md:px-4 py-1 md:py-2 bg-black text-white font-serif font-bold">
                            {locale === 'de' ? 'Nichts gefunden!' : 'Nothing found!'}
                        </div>

                        <div className="py-1 md:py-2 flex gap-3">
                            <div className="w-full">
                                {locale === 'de' ? 'Hier gibt es aktuell keine Termine.' : 'There are currently no events.'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventOverviewEmpty;
