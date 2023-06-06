import getPayloadResponse from '@/lib/payload/getPayloadResponse';
import type { MainMenu } from '@/types/payload/payload-types';

const getHeadNavigation = async (): Promise<MainMenu> => {

    return getPayloadResponse<MainMenu>('/api/globals/main-menu/');
};

export default getHeadNavigation;
