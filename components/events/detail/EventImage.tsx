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
    const justifyRight = justify === 'right' ? { marginLeft: 'auto', marginRight: 0 } : {};
    const justifyLeft = justify === 'left' ? { marginLeft: 0, marginRight: 'auto' } : {};

    if (isEventImageString(eventImage)) {
        return (
            <Link
                href={eventImage}
                target="_blank"
                className="transition-transform hover:scale-105"
            >
                <Image
                    src={eventImage}
                    width={342}
                    height={342}
                    alt={eventTitle}
                    sizes="thumbnail"
                    className="mx-auto mb-4 transition-transform hover:scale-105 md:cursor-pointer"
                    style={justify === 'right' ? justifyRight : justifyLeft}
                    priority={true}
                />
            </Link>
        );
    }

    const imageUrl =
        eventImage.sizes?.event?.url ?? eventImage.sizes?.thumbnail?.url ?? eventImage.url;

    if (isEmptyString(imageUrl)) {
        return null;
    }

    return (
        <Link
            href={imageUrl}
            target="_blank"
            className="transition-transform hover:scale-105 hover:bg-teal-800"
        >
            <Image
                src={imageUrl}
                width={342}
                height={342}
                alt={eventImage.alt}
                sizes="thumbnail"
                className="mx-auto mb-4 overflow-hidden transition-transform hover:scale-105"
                style={justify === 'right' ? justifyRight : justifyLeft}
                priority={true}
            />
        </Link>
    );
};

export default EventImage;
