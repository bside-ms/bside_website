import isNotEmptyString from '@/lib/common/helper/isNotEmptyString';
import type { Media } from '@/types/payload/payload-types';

const isEventImageString = (image: Media | string | null | undefined): image is string =>
    typeof image === 'string' && isNotEmptyString(image);

export default isEventImageString;
