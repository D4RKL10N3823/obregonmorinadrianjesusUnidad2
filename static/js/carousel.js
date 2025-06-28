window.addEventListener('load', () => {
    document.querySelectorAll('.glide').forEach(glideEl => {
        new Glide(glideEl, {
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
        }).mount();
    });

    document.querySelectorAll('.category-title').forEach((categoryTitle, index) => {
        categoryTitle.addEventListener('dblclick', () => {
            const categoriesData = JSON.parse(document.getElementById('categories-data').textContent);
            const key = `animes-${index + 1}`;
            const animes = categoriesData[key];
            if (!animes || !animes.length) return;

            const randomAnime = animes[Math.floor(Math.random() * animes.length)];
            window.location.href = `/anime/${encodeURIComponent(randomAnime.title)}`;
        });
    });
});