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
    previousBlock?: string;
    effects: Array<'blur' | 'grayscale' | 'desaturated' | 'darker'>;
}

const MediaContentOverlay = ({ media, richText, headlineText, headlineTeaser, buttonText, buttonHref, previousBlock, effects }: Props): ReactElement => {

    return (
        <>
            <div className="w-full p-4 lg:w-[60rem] xl:w-[80rem] lg:mx-auto">
                <div
                    className={clsx(
                        'bg-cover bg-center w-full h-52 md:h-72',
                        effects.includes('blur') && 'blur-[2px]',
                        effects.includes('grayscale') && 'grayscale',
                        effects.includes('desaturated') && 'saturate-50',
                        effects.includes('darker') && 'brightness-50',
                    )}
                    style={{ backgroundImage: `url(${media.url})` }}
                />
            </div>

            <div className="px-4 md:px-0 -translate-y-20 -mb-24 md:-translate-y-20 md:-mb-20">
                <ContentWrapper>
                    <div className="bg-black text-white p-6">
                        {!isEmptyString(headlineText) && (
                            <Headline
                                title={headlineText}
                                teaser={headlineTeaser ?? ''}
                                level="h3"
                                as="h2"
                            />
                        )}
                        <div className="mt-3 md:text-lg">
                            <RichText content={richText} />
                        </div>

                        {!isEmptyString(buttonText) && !isEmptyString(buttonHref ?? '') && (
                            <Button
                                title=""
                                text={buttonText}
                                href={buttonHref!}
                                inverse={true}
                            />
                        )}
                    </div>
                </ContentWrapper>
            </div>
        </>
    );
};

export default MediaContentOverlay;
