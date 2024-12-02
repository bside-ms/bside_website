import { Fragment } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import isEmptyString from '@/lib/common/helper/isEmptyString';
import createCircleLink from '@/lib/events/createCircleLink';
import type { SlateChildren } from '@/types/payload/Blocks';
import type { Circle } from '@/types/payload/payload-types';
import Headline from '@blocks/headlineBlock/Headline';
import RichText from '@blocks/richTextBlock/RichText';

interface Props {
    headlineText: string;
    circles: Array<Circle>;
    richText: SlateChildren;
}

export const colors = ['#ccffcc', '#ccffff', '#ccccff', '#ffcccc', '#ffffcc'];

const CircleOverview = ({ headlineText, circles, richText }: Props): ReactElement => {
    const { locale } = useRouter();

    return (
        <Fragment>
            <div className="my-4" id="kreise">
                <Headline title={headlineText} level="h2" />
            </div>

            <div className="lg:flex lg:flex-row-reverse lg:gap-4">
                <div className="overflow-y-auto lg:basis-1/2 lg:px-4 lg:align-text-top">
                    <RichText content={richText} />
                </div>

                <div className="lg:basis-1/2">
                    <div className="my-4 border-2 border-black">
                        {circles.map((circle: Circle, index: number) => (
                            <Link href={createCircleLink(circle)} key={circle.name}>
                                <div className="group relative flex cursor-pointer items-center justify-between border-b border-gray-300 px-4 py-1">
                                    <div className="z-10 transition-all duration-100 group-hover:text-black lg:text-lg">
                                        <p className="font-serif">{circle.name}</p>
                                        {!isEmptyString(circle.description) && (
                                            <p className="text-sm lg:text-base">
                                                {circle.description}
                                            </p>
                                        )}
                                    </div>
                                    <div
                                        className="absolute inset-0 opacity-0 transition-all duration-100 group-hover:opacity-100"
                                        style={{ backgroundColor: colors[index % colors.length] }}
                                    />

                                    <div className="z-10 text-sm transition-all duration-100 group-hover:text-black">
                                        »&nbsp;{locale === 'de' ? 'mehr' : 'more'}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default CircleOverview;
