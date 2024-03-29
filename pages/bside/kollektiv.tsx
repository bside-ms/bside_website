import { Fragment } from 'react';
import type { GetStaticProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import { useBreakpointContext } from '@/components/common/BreakpointContext';
import Footer from '@/components/common/Footer';
import ContentWrapper from '@/components/layout/ContentWrapper';
import HeaderBar from '@/components/layout/header/HeaderBar';
import NextHead from '@/components/layout/next/NextHead';
import { getPublicClientUrl } from '@/lib/common/url';
import { getAllCircles, getOrganisation } from '@/lib/organisations';
import type { Circle, Organisation } from '@/types/payload/payload-types';
import ReusableBlocks from '@blocks/reusableLayout/ReusableBlocks';
import SubNavigation from '@blocks/subNavigation/SubNavigation';
import SubNavigationLink from '@blocks/subNavigation/SubNavigationLink';

interface Props {
    organisation: Organisation;
    circles: Array<Circle>;
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
    const organisation = await getOrganisation('647e605b7054a955522b2471', locale!);

    return {
        revalidate: 60,
        props: {
            organisation,
            circles: await getAllCircles(locale!),
        },
    };
};

export default ({ organisation, circles }: Props): ReactElement => {

    const { locale } = useRouter();
    const { isMd } = useBreakpointContext();

    return (
        <Fragment>
            <NextHead
                title={organisation.meta?.title ?? 'B-Side Kollektiv'}
                description={organisation.meta?.description ?? 'Das B-Side Kollektiv - Das Herz der B-Side.'}
                url={`${getPublicClientUrl(locale)}/bside/kollektiv`}
            />

            <div className="min-h-screen flex flex-col justify-between">
                <HeaderBar />

                <main id="content">
                    <ContentWrapper>
                        <div className="w-full h-32 xs:h-40 md:h-52 relative lg:mt-4">
                            <Image
                                src="/assets/stickFigures/artists.svg"
                                alt="artists"
                                fill={true}
                                className="object-contain"
                                priority={true}
                            />
                        </div>

                        <div className="font-serif text-white bg-black mt-4 text-2xl text-center p-3">
                            B-Side Kollektiv
                        </div>
                    </ContentWrapper>

                    <SubNavigation>
                        <SubNavigationLink
                            title={isMd ? 'Alle Arbeitskreise' : 'Arbeitskreise'}
                            anchor="kreise"
                        />
                        <SubNavigationLink
                            title={isMd ? 'Was ist Soziokratie?' : 'Soziokratie'}
                            anchor="soziokratie"
                            teaser={true}
                        />
                        {isMd && (
                            <SubNavigationLink
                                title="Mitmachen"
                                anchor="mitmachen"
                                teaser={true}
                            />
                        )}
                    </SubNavigation>

                    {organisation.layout?.map((layoutElement, index) => (
                        <ReusableBlocks
                            key={layoutElement.id ?? layoutElement.blockName ?? `${layoutElement.blockType}${index}`}
                            layoutElement={layoutElement}
                            circles={circles}
                            eventsOnPage={{ ownerId: organisation.id, perPage: 10, pagination: true }}
                        />
                    ))}
                </main>

                <Footer />
            </div>

        </Fragment>
    );
};
