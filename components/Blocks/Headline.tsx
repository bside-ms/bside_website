import clsx from 'clsx';
import type { ReactElement } from 'react';
import ContentWrapper from '@/components/Layout/ContentWrapper';
import isEmptyString from '@/lib/common/helper/isEmptyString';
import { toKebabCase } from '@/lib/common/toKebabCase';
import type { HeadlineBlockProps } from '@/types/payload/Blocks';

const levels = {
    h1: 'font-serif leading-none text-2xl md:text-4xl font-bold break-words sm:break-normal ',
    h2: 'font-serif leading-tight text-xl md:text-3xl font-bold break-words sm:break-normal',
    h3: 'font-serif leading-tight text-xl md:text-2xl font-bold break-words sm:break-normal',
    h4: 'font-serif leading-tight text-lg md:text-xl font-bold',
};

export const HeadlineLevels = levels;

const kickers = {
    h1: 'italic text-base md:text-base block mb-1',
    h2: 'text-sm md:text-base italic',
    h3: 'text-sm md:text-base italic',
    h4: 'text-sm md:text-base italic',
};

const Headline = ({ title, anchor, teaser, level, as = null }: HeadlineBlockProps): ReactElement => {

    const headlineLevel = `${as ?? level}`.replace('h', '');
    const Tag = `h${headlineLevel}`;
    const id = toKebabCase(anchor);

    return (

        <ContentWrapper className="pt-4 !pb-0 !-mb-2">
            {!isEmptyString(teaser) && (
                <small
                    className={clsx(
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                        kickers[`h${headlineLevel}`] !== null ? kickers[`h${headlineLevel}`] : '',
                        'block font-normal leading-none tracking-normal'
                    )}
                >
                    {/* eslint-disable-next-line react/no-danger */}
                    <span dangerouslySetInnerHTML={{ __html: teaser }} />
                    <span className="sr-only">:</span>
                </small>
            )}

            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
            {/* @ts-expect-error */ }
            <Tag
                id={id}
                key={`headline-${id}`}
                // className="font-bold font-serif text-2xl md:text-4xl md:scroll-mt-[64px]"
                className={clsx(
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    levels[`h${headlineLevel}`],
                    'max-w-full md:scroll-mt-[64px]',
                )}
            >
                {title}
            </Tag>
        </ContentWrapper>

    );
};

export const HeadlineBlock = (props: HeadlineBlockProps): ReactElement => {
    return (
        <Headline
            title={props.title}
            anchor={props.anchor}
            teaser={props.teaser}
            level={props.level}
        />
    );
};
