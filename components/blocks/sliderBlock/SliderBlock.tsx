
import Image from 'next/image';
import type { ReactElement } from 'react';
import { Keyboard, Mousewheel, Navigation, Pagination, Zoom } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import ContentWrapper from '@/components/layout/ContentWrapper';
import isEmptyString from '@/lib/common/helper/isEmptyString';
import type { Media } from '@/types/payload/payload-types';

interface SliderBlockProps {
    imageSlides: Array<{
        image: string | Media;
        description?: string | null;
        id?: string | null;
    }>;
}

const SliderBlock = ({ imageSlides }: SliderBlockProps): ReactElement => {
    if (imageSlides.length <= 0) {
        return (<div />);
    }

    return (
        <ContentWrapper>
            <Swiper
                modules={[Navigation, Pagination, Keyboard, Mousewheel, Zoom]}
                navigation
                pagination={{ clickable: true }}
                slidesPerView="auto"
                centeredSlides={true}
                centerInsufficientSlides={true}
                zoom={true}
                grabCursor={true}
                spaceBetween={10}
                autoHeight={true}
                keyboard={{ enabled: true, onlyInViewport: true }}
                mousewheel={{ forceToAxis: true }}
            >
                {imageSlides.map((item) => (
                    <SwiperSlide
                        key={`media-${item.id}`}

                    >
                        <div
                            className="swiper-zoom-container flex justify-center items-center relative"
                            style={{
                                height: '450px',
                                position: 'relative',
                            }}
                        >
                            <Image
                                fill={true}
                                src={(item.image as Media).url!}
                                alt={(item.image as Media).alt!}
                                className="my-auto mx-auto"
                                objectFit="contain"
                                loading="lazy"
                            />
                        </div>
                        {!isEmptyString(item.description) && (
                            <p className="hidden md:block font-serif text-center mt-0 pb-8">
                                {item.description}
                            </p>
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
        </ContentWrapper>
    );
};

export default SliderBlock;
