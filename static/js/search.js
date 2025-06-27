document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const clearBtn = document.getElementById('clearSearch');

    const resultsContainer = document.createElement('div');
    resultsContainer.classList.add("grid", "grid-cols-2", "sm:grid-cols-3", "md:grid-cols-4", "lg:grid-cols-6", "gap-4", "mt-4");
    searchInput.closest("form").insertAdjacentElement("afterend", resultsContainer);

    searchInput.focus();

    searchInput.addEventListener('input', async () => {
        const query = searchInput.value.trim();
        if (query !== '') {
            clearBtn.classList.remove('hidden');

            try {
                const res = await fetch(`/search/?search=${encodeURIComponent(query)}`, {
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                });

                const data = await res.json();

                resultsContainer.innerHTML = '';

                if (data.length === 0) {
                    resultsContainer.innerHTML = `   
                        <div class="col-span-full items-center justify-center text-center mt-8">
                            <h2 class="text-white text-xl font-semibold mb-2">No se encontraron resultados</h2>
                            <p class="text-gray-400">No hay animes que coincidan con "<strong>${query}</strong>"</p>
                            <img src="/static/images/not_found.gif" alt="No results" class="mx-auto mt-4 w-22">
                            <a href="/anime/" class="inline-block mt-4 text-yellow-400 hover:underline">Volver a ver todos</a>
                        </div>
                    `;
                } else {
                    data.forEach(anime => {
                        const item = document.createElement('a');
                        item.href = anime.url;
                        item.innerHTML = `
                            <div class="shadow-md overflow-hidden">
                                <img src="${anime.image}" alt="${anime.title}" class="w-full object-cover rounded-sm">
                                <div class="p-2">
                                    <h2 class="text-sm font-bold text-center text-white">${anime.title}</h2>
                                    <p class="text-xs text-gray-200 text-center">${anime.total_episodes} Episodios</p>
                                </div>
                            </div>
                        `;
                        resultsContainer.appendChild(item);
                    });
                }
            } catch (error) {
                console.error('Error al buscar:', error);
            }
        } else {
            clearBtn.classList.add('hidden');
            resultsContainer.innerHTML = '';
        }
    });

    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        clearBtn.classList.add('hidden');
        resultsContainer.innerHTML = '';
    });
});

