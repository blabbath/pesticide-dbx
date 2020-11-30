const scrollNavigation = function () {
    const content = document.querySelectorAll('.scroll-content');
    content.forEach(e => {
        e.addEventListener('click', () => {
            const element = e.classList[e.classList.length - 1];
            p = document.querySelector(`#${element}`);
            p.scrollIntoView({
                behavior: 'smooth',
            });
        });
    });
};

export { scrollNavigation };
