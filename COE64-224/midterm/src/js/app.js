// Sample Data
const data = {
    vegetarian: [
        { name: " ", price: "$10.00", rating: 4.5, img: "./images/food/vegetarian/salad.jpg" },
        { name: " ", price: "$14.00", rating: 5, img: "./images/food/vegetarian/salad2.jpg" },
    ],
    dessert: [
        { name: " ", price: "$8.00", rating: 5, img: "images/food/desserts/cheesecake.jpg" },
        { name: " ", price: "$6.00", rating: 5, img: "images/food/desserts/cake.jpg" },
    ],
};

// DOM Elements
const catalog = document.getElementById('catalog');
const categoryButtons = document.querySelectorAll('.category-btn');

// Function to display items
// Function to display items
function displayItems(category) {
    catalog.innerHTML = ''; // Clear previous items

    let items = [];

    // If "all" is selected, combine all categories into one array
    if (category === 'all') {
        Object.values(data).forEach(categoryItems => {
            items = items.concat(categoryItems);
        });
    } else {
        items = data[category] || [];
    }

    // Render each item
    items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('bg-white', 'shadow', 'rounded', 'p-4');
        itemDiv.innerHTML = `
          <img src="${item.img}" alt="${item.name}" class="w-full h-40 object-cover rounded mb-4">
          <h2 class="text-lg font-bold text-gray-800">${item.name || 'Item Name'}</h2>
          <p class="text-orange-500 font-bold">${item.price}</p>
          <p class="text-gray-500 text-sm">Rating: ${item.rating}⭐</p>
          <button class="mt-2 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">Add to Bag</button>
        `;
        catalog.appendChild(itemDiv);
    });
}

// Add click event listeners to buttons
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        categoryButtons.forEach(btn => btn.classList.remove('bg-orange-500', 'text-white'));
        button.classList.add('bg-orange-500', 'text-white');

        const category = button.getAttribute('data-category');
        displayItems(category);
    });
});

// Display default category on page load
displayItems('all');

const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', () => {
    menu.classList.toggle('hidden');
});

