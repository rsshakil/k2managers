import { useRef, useEffect } from 'react';

function useDocumentTitle(title, titlePrefix, prevailOnUnmount = false) {
    const defaultTitle = useRef(document.title);
    let tempTitle = '';
    tempTitle = title && title;
    useEffect(() => {
        if (title && titlePrefix) {
            document.title = `${titlePrefix}${title}`;
        } else if (title && tempTitle !== '') {
            document.title = tempTitle;
        }
    }, [title]);

    useEffect(() => () => !prevailOnUnmount && (document.title = defaultTitle.current), []);
}

export default useDocumentTitle;
