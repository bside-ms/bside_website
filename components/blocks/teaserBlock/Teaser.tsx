import clsx from 'clsx';
import NextImage from 'next/image';
import type { ReactElement } from 'react';
import Button from '@blocks/buttonBlock/Button';
import Headline from '@blocks/headlineBlock/Headline';
import RichText from '@blocks/richTextBlock/RichText';
import type { TeaserBlockProps } from '@blocks/teaserBlock/TeaserBlock';

const Teaser = ({ headlineTitle, headlineTeaser, text, image, reversed, linkText, linkHref }: TeaserBlockProps): ReactElement => {

    return (
        <div className="w-[60rem] grid grid-cols-2 mx-auto">
            {reversed && (
                <figure
                    className="flex-1 text-none h-[30rem] w-[30rem] my-auto relative ml-4"
                >
                    {typeof image !== 'string' && (
                        <NextImage
                            src={image.url!}
                            alt=""
                            className="object-fill border-b-2 border"
                            fill={true}
                        />
                    )}

                </figure>
            )}

            <div
                className={clsx(
                    'flex-1 bg-black my-auto z-10',
                    !reversed ? 'ml-4' : 'mr-4',
                )}
            >
                <div className="h-[32rem] text-white p-8 flex">
                    <div className="flex-grow my-auto">
                        <Headline
                            title={headlineTitle}
                            teaser={headlineTeaser}
                            level="h3"
                            as="h2"
                        />

                        <div className="my-4">
                            <RichText content={text} />
                        </div>

                        <Button
                            title=""
                            text={linkText}
                            href={linkHref}
                            inverse={true}
                        />
                    </div>
                </div>
            </div>

            {!reversed && (
                <figure
                    className="flex-1 text-none h-[30rem] w-[30rem] my-auto -ml-4 relative"
                >
                    {typeof image !== 'string' && (
                        <NextImage
                            src={image.url!}
                            alt=""
                            className="object-fill border-b-2 border"
                            fill={true}
                        />
                    )}

                </figure>
            )}
        </div>
    );
};

export default Teaser;
