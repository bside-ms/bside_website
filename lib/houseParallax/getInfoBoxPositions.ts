import type { ScrollInfoBox } from '@/lib/houseParallax/getScrollElements';

export const getInfoBoxPosition = ({ begin, end }: ScrollInfoBox['display']): number =>
    Math.round((begin + end) / 2);

const getInfoBoxPositions = (infoBoxes: Array<ScrollInfoBox>): Array<number> =>
    infoBoxes
        .map(({ display }) => getInfoBoxPosition(display))
        .sort((posA, posB) => (posA >= posB ? 1 : -1));

export default getInfoBoxPositions;
