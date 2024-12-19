import { range } from 'lodash-es';
import { cn } from '@/lib/utils';

const EventOverviewEntryImageFallback = () => {
    return (
        <svg width="150" height="150" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
            {range(5).map((index) => {
                const scale = Math.random() * 0.5 + 0.5;
                const x = Math.random() * 120 - 20;
                const y = Math.random() * 120 - 20;
                const opacity = Math.random() * 0.5 + 0.3;

                return (
                    <path
                        key={index}
                        d="m63.228 102.7 48.052-37.46v-30.484l-30.743-24.543-29.193 24.543-17.826-17.051-19.892 17.051v30.484z"
                        className={cn(Math.random() > 0.6 ? 'fill-orange-200' : 'fill-gray-300')}
                        opacity={opacity}
                        transform={`translate(${x}, ${y}) scale(${scale})`}
                    />
                );
            })}
        </svg>
    );
};

export default EventOverviewEntryImageFallback;
