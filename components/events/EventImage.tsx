import Image from 'next/image';
import type { ReactElement } from 'react';
import type { Media as MediaType } from 'types/payload/payload-types';

interface Props {
    eventTitle: string;
    eventImage: MediaType | string | null;
}

const EventImage = ({ eventTitle, eventImage }: Props): ReactElement | null => {

    if (eventImage === null || eventImage === '') {
        return null;
    }

    const src = typeof eventImage === 'string' ? eventImage : eventImage.sizes?.event?.url ?? null;
    const altText = typeof eventImage === 'string' ? eventTitle : eventImage.alt;

    if (src === null) {
        return null;
    }

    return (
        <div>
            <Image
                src={src}
                width={342}
                height={342}
                alt={altText}
                sizes="thumbnail"
                className="mx-auto mb-4"
            />
        </div>
    );
};

export default EventImage;
