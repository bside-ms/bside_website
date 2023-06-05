import Image from 'next/image';
import type { ReactElement } from 'react';
import type { Media as MediaType } from 'types/payload/payload-types';

interface Props {
    eventImage: MediaType | string | null;
    justify?: string;
}

const EventImage = ({ eventImage, justify = '' }: Props): ReactElement | null => {

    if (eventImage === null || eventImage === '') {
        return null;
    }

    const src = typeof eventImage === 'string' ? eventImage : eventImage.sizes?.event?.url ?? null;

    if (src === null) {
        return null;
    }

    return (
        <div>
            <Image
                src={src}
                width={342}
                height={342}
                alt={typeof eventImage === 'string' ? '' : eventImage.alt}
                sizes="thumbnail"
                className="mx-auto mb-4"
                style={(justify === 'right' ? { marginLeft: 'auto', marginRight: 0 } :
                    (justify === 'left' ? { marginLeft: 0, marginRight: 'auto' } : undefined))}
            />
        </div>
    );
};

export default EventImage;
