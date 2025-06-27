document.addEventListener('DOMContentLoaded', () => {
    const glideEl = document.querySelector('.glide');
    const glide = new Glide(glideEl, {
        type: 'carousel',
        perView: 5.5,
        gap: 20,
        breakpoints: {
            1792: { perView: 5.5 },
            1536: { perView: 5 },
            1280: { perView: 4 },
            1024: { perView: 3 },
            768:  { perView: 2 },
            480:  { perView: 1 },
        },
    });

    glide.mount();
});