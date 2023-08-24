import Image from 'next/image';
import Link from 'next/link';
import type { ReactElement } from 'react';
import isEmptyString from '@/lib/common/helper/isEmptyString';
import isEventImageString from '@/lib/events/isEventImageString';
import type { Media as MediaType } from '@/types/payload/payload-types';

interface Props {
    eventTitle: string;
    eventImage: MediaType | string;
    justify?: string;
}

const EventImage = ({ eventTitle, eventImage, justify = '' }: Props): ReactElement | null => {

    if (isEventImageString(eventImage)) {
        return (
            <Link href={eventImage} target="_blank" className="cursor-default">
                <Image
                    src={eventImage}
                    width={342}
                    height={342}
                    alt={eventTitle}
                    sizes="thumbnail"
                    className="mx-auto mb-4 md:cursor-pointer"
                    style={(justify === 'right' ? { marginLeft: 'auto', marginRight: 0 } :
                        (justify === 'left' ? { marginLeft: 0, marginRight: 'auto' } : undefined))}
                    priority={true}
                />
            </Link>
        );
    }

    const imageUrl = eventImage.sizes?.event?.url ?? eventImage.sizes?.thumbnail?.url ?? eventImage.url;

    if (isEmptyString(imageUrl)) {
        return null;
    }

    return (
        <Link href={imageUrl} target="_blank" className="cursor-default">
            <Image
                src={imageUrl}
                width={342}
                height={342}
                alt={eventImage.alt}
                sizes="thumbnail"
                className="mx-auto mb-4 md:cursor-pointer"
                style={(justify === 'right' ? { marginLeft: 'auto', marginRight: 0 } :
                    (justify === 'left' ? { marginLeft: 0, marginRight: 'auto' } : undefined))}
                priority={true}
            />
        </Link>
    );

};

export default EventImage;
