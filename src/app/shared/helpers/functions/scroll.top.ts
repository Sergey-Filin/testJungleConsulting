export const scrollableClass = 'main-wrap__scrollable';
export const pointerEventAbleClass = 'main-wrap__events';
export const cdkBlockClass = 'cdk-global-scrollblock';

export const html = (): HTMLElement | null => {
    if (!window) {
        return null;
    }
    const hmlTag = document.getElementsByTagName('html');
    return hmlTag && hmlTag[0] || null;
};

export const mainWrapper = (): HTMLElement | null => {
    if (!window) {
        return null;
    }
    const wrapper = window.document.getElementById('main-wrap');
    return wrapper || null;
};

export const addScroll = (): void => {
    const wrapper = mainWrapper();
    const htmlTag = html();
    if (wrapper && htmlTag) {
        wrapper.classList.add(scrollableClass);
        wrapper.classList.remove(cdkBlockClass);
    }
};

export const removeScroll = (): void => {
    const wrapper = mainWrapper();
    const htmlTag = html();
    if (wrapper && htmlTag) {
        wrapper.classList.remove(scrollableClass);
        wrapper.classList.add(cdkBlockClass);
    }
};

export const addPointerEvents = (): void => {
    const wrapper = mainWrapper();
    const htmlTag = html();
    if (wrapper && htmlTag) {
        wrapper.classList.add(pointerEventAbleClass);
    }
};

export const removePointerEvents = (): void => {
    const wrapper = mainWrapper();
    const htmlTag = html();
    if (wrapper && htmlTag) {
        wrapper.classList.remove(pointerEventAbleClass);
    }
};
