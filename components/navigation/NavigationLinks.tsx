import type { ReactElement } from 'react';
import NavigationLink from 'components/navigation/NavigationLink';

const NavigationLinks = (): ReactElement => {

    return (
        <div className="flex flex-col items-end gap-5">
            <NavigationLink href="/">
                Start
            </NavigationLink>

            <NavigationLink href="/haus">
                Die B-Side
            </NavigationLink>

            <NavigationLink href="/kontakt">
                Kontakt
            </NavigationLink>
        </div>
    );
};

export default NavigationLinks;
