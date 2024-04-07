import type { Media } from '@/types/payload/payload-types';

const isEventImageMedia = (image: Media | string | null | undefined): image is Media =>
    typeof image === 'object' && image !== null && 'id' in image;

export default isEventImageMedia;
