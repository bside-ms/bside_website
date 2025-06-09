import clsx from 'clsx';
import type { ReactElement } from 'react';
import ContentWrapper from '@/components/layout/ContentWrapper';
import isEmptyString from '@/lib/common/helper/isEmptyString';
import type { SlateChildren } from '@/types/payload/Blocks';
import type { Media } from '@/types/payload/payload-types';
import Button from '@blocks/buttonBlock/Button';
import Headline from '@blocks/headlineBlock/Headline';
import RichText from 'components/blocks/richTextBlock/RichText';

interface Props {
    media: Media;
    richText: SlateChildren;
    headlineTeaser?: string;
    headlineText?: string;
    buttonText?: string;
    buttonHref?: string;
    effects: Array<'blur' | 'grayscale' | 'desaturated' | 'darker'>;
}

const MediaContentOverlay = ({ media, richText, headlineText, headlineTeaser, buttonText, buttonHref, effects }: Props): ReactElement => {
    return (
        <>
            <div className="w-full p-4 lg:mx-auto lg:w-[60rem] xl:w-[80rem]">
                <div
                    className={clsx(
                        'h-52 w-full bg-cover bg-center md:h-72',
                        effects.includes('blur') && 'blur-[2px]',
                        effects.includes('grayscale') && 'grayscale',
                        effects.includes('desaturated') && 'saturate-50',
                        effects.includes('darker') && 'brightness-50',
                    )}
                    style={{ backgroundImage: `url(${media.url})` }}
                />
            </div>

            <div className="-mb-24 -translate-y-20 px-4 md:-mb-20 md:-translate-y-20 md:px-0">
                <ContentWrapper>
                    <div className="bg-black p-6 text-white">
                        {!isEmptyString(headlineText) && <Headline title={headlineText} teaser={headlineTeaser ?? ''} level="h3" as="h2" />}
                        <div className="mt-3 md:text-lg">
                            <RichText content={richText} />
                        </div>

                        {!isEmptyString(buttonText) && !isEmptyString(buttonHref ?? '') && (
                            <Button title="" text={buttonText} href={buttonHref!} inverse={true} />
                        )}
                    </div>
                </ContentWrapper>
            </div>
        </>
    );
};

export default MediaContentOverlay;
