import { type ReactElement, useEffect, useRef } from 'react';

const FundraisingBox = (): ReactElement => {
    const scriptUrl = 'https://secure.fundraisingbox.com/app/paymentJS?hash=vfoeov50wdhmh4zz';
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
        </div>
    );
};

export default FundraisingBox;
