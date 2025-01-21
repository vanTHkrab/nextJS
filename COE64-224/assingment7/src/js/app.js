const fetchCats = async () => {
    const headers = new Headers({
        "Content-Type": "application/json",
        "x-api-key": "live_Ba6TEfertuxKu5IXy6EwIoRB8PbJOE1lr5F1suf2cWKbct4XYhUpLvWGI02NdmeU",
    });

    let cats;

    try {
        const response = await fetch(
            "https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=15", {
                method: 'GET',
                headers: headers,
            }
        );
        if (!response.ok) {
            throw new Error(`Failed to fetch cats: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        if (!Array.isArray(data) || data.length === 0) {
            throw new Error('No cat data received');
        }
        cats = data;
        console.log('Cats:', cats);
        document.getElementById('loading').classList.add('hidden');
        renderCats(cats);
    } catch (error) {
        console.error('Error fetching cats:', error);
    }

}

const renderCats = (cats) => {
    const grid = document.getElementById('catGrid');
    grid.innerHTML = '';
    if (!cats || cats.length === 0) {
        grid.innerHTML = '<div class="col-span-full text-center text-gray-500">No cats available</div>';
        return;
    }
    cats.forEach((cat, index) => {
        setTimeout(() => {
            const card = createCatCard(cat);
            grid.appendChild(card);
        }, index * 200);
    });
}

const getStyleByOrigin = (origin) => {
    const styles = {
        Canada: { bg: 'bg-red-500', text: 'text-red-500', flag: '🇨🇦' },
        France: { bg: 'bg-blue-500', text: 'text-blue-500', flag: '🇫🇷' },
        'United Kingdom': { bg: 'bg-blue-800', text: 'text-blue-800', flag: '🇬🇧' },
        'United States': { bg: 'bg-red-800', text: 'text-red-800', flag: '🇺🇸' },
        Russia: { bg: 'bg-blue-800', text: 'text-blue-800', flag: '🇷🇺' },
        Egypt: { bg: 'bg-yellow-800', text: 'text-yellow-800', flag: '🇪🇬' },
        Thailand: { bg: 'bg-yellow-600', text: 'text-white', flag: '🇹🇭' },
        default: { bg: 'bg-green-600', text: 'text-white', flag: '' },
    };
    return styles[origin] || styles.default;
};

const createCatCard = (cat) => {
    const origin = cat.breeds[0]?.origin || 'Unknown Origin';
    const breedName = cat.breeds[0]?.name || 'Unknown Breed';
    const temperament = cat.breeds[0]?.temperament || 'Information not available';
    const description = cat.breeds[0]?.description || 'No description available';

    const { bg, text, flag } = getStyleByOrigin(origin);
    const originText = flag ? `${flag} ${origin}` : origin;

    const card = document.createElement('div');
    card.className = `${bg} card`;

    card.innerHTML = `
    <div class="p-4 rounded-lg">
      <h2 class="text-white text-xl font-semibold mb-2">${breedName}</h2>
      <div class="aspect-video relative overflow-hidden rounded-md mb-4">
        <img src="${cat.url}" alt="${breedName}"
          class="object-cover w-full h-full"
          onerror="this.onerror=null; this.src='https://via.placeholder.com/400x300?text=Image+Not+Available'"
          loading="lazy">
      </div>
      <div class="space-y-2">
        <p class="text-sm text-white">
          <span class="font-semibold">Origin:</span> <span class="${text}">${originText}</span>
        </p>
        <p class="text-sm text-white">
          <span class="font-semibold">Temperament:</span> ${temperament}
        </p>
        <p class="text-sm text-white">
          <span class="font-semibold">Description:</span> ${description}
        </p>
      </div>
    </div>
  `;
    return card;
};

document.addEventListener('DOMContentLoaded', fetchCats);