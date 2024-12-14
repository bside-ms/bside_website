import { Locale } from 'date-fns/locale/types';
import { de, enGB } from 'date-fns/locale';
import useLocale from '@/lib/common/hooks/useLocale';

const useDateFnsLocale = (): Locale => (useLocale() === 'en' ? enGB : de);

export default useDateFnsLocale;
