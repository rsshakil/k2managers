const arrow = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];

const pressHandler = (e) => {
    if ((e.altKey || e.metaKey) && arrow.includes(e.key)) e.preventDefault();
};

export const disableAltArrow = () => {
    document.addEventListener('keydown', pressHandler);
};

export const disableAltArrowRemove = () => {
    document.removeEventListener('keydown', pressHandler);
};
