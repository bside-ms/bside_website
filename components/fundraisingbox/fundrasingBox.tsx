import { type ReactElement, useEffect, useRef } from 'react';

const FundraisingBox = ({ hash }: { hash: string }): ReactElement => {
    const scriptUrl = `https://secure.fundraisingbox.com/app/paymentJS?hash=${hash}`;
    const scriptRoot = useRef<HTMLDivElement>(null);
    const script = `<script type='text/javascript' src=${scriptUrl} ></script>`;

    useEffect(() => {
        if (scriptRoot.current) {
            const range = document.createRange();
            const documentFragment = range.createContextualFragment(script);
            scriptRoot.current.append(documentFragment);
        }
    }, [script]);

    return (
        <div>
            <div id="fbIframeDiv" className="relative" ref={scriptRoot} />
            <noscript>Bitte aktivieren Sie JavaScript, um die Anzeige zu sehen.</noscript>

            <a target="_blank" href="https://www.fundraisingbox.com" rel="noopener noreferrer">
                <img
                    src="https://secure.fundraisingbox.com/images/FundraisingBox-Logo-Widget.png"
                    alt="FundraisingBox Logo"
                />
            </a>
        </div>
    );
};

export default FundraisingBox;
