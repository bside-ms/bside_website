import clsx from 'clsx';
import NextImage from 'next/image';
import type { ReactElement } from 'react';
import Button from '@blocks/buttonBlock/Button';
import Headline from '@blocks/headlineBlock/Headline';
import RichText from '@blocks/richTextBlock/RichText';
import type { TeaserBlockProps } from '@blocks/teaserBlock/TeaserBlock';

const Teaser = ({
    headlineTitle,
    headlineTeaser,
    text,
    image,
    reversed,
    linkText,
    linkHref,
}: TeaserBlockProps): ReactElement => {
    return (
        <div className="mx-auto grid w-[60rem] grid-cols-2">
            {reversed && (
                <figure className="relative my-auto ml-4 size-[30rem] flex-1">
                    {typeof image !== 'string' && (
                        <NextImage
                            src={image.sizes?.event?.url ?? image.url!}
                            alt=""
                            className="border border-b-2 object-fill"
                            width={1080}
                            height={1080}
                        />
                    )}
                </figure>
            )}

            <div className={clsx('z-10 my-auto w-[30rem] flex-1 bg-black', !reversed && 'ml-2')}>
                <div className="flex h-[32rem] p-8 text-white">
                    <div className="my-auto grow">
                        <Headline
                            title={headlineTitle}
                            teaser={headlineTeaser}
                            level="h3"
                            as="h2"
                        />

                        <div className="my-4">
                            <RichText content={text} />
                        </div>

                        <Button title="" text={linkText} href={linkHref} inverse={true} />
                    </div>
                </div>
            </div>

            {!reversed && (
                <figure className="relative my-auto -ml-4 size-[30rem] flex-1">
                    {typeof image !== 'string' && (
                        <NextImage
                            src={image.sizes?.event?.url ?? image.url!}
                            alt=""
                            className="border border-b-2 object-fill"
                            width={1080}
                            height={1080}
                        />
                    )}
                </figure>
            )}
        </div>
    );
};

export default Teaser;
