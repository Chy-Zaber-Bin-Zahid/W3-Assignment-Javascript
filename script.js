"use strict"
//----- Modal Region ----//
const currencyMap = {
    'United States': { currency: 'USD', symbol: '$' },
    'Portugal': { currency: 'EUR', symbol: '€' },
    'United Kingdom': { currency: 'GBP', symbol: '£' },
    'France': { currency: 'EUR', symbol: '€' },
    'Germany': { currency: 'EUR', symbol: '€' },
    'Spain': { currency: 'EUR', symbol: '€' }
};

// Get DOM elements
const modal = document.getElementById('regionModal');
const closeBtn = document.getElementById('closeModal');
const regionSelect = document.getElementById('region');
const currencySelect = document.getElementById('currency');
const saveBtn = document.getElementById('saveSettings');
const regionLink = document.querySelector('.nav-link');
const modalMain = document.querySelector('.modal-main');

// Open modal when clicking on United States link
regionLink.addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = 'block';
});

// Close modal when clicking close button
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    regionSelect.value = regionLink.textContent.trim().replace(/^🌐\s*/, '');
    currencySelect.value = currencyMap[regionLink.textContent.trim().replace(/^🌐\s*/, '')].currency;
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modalMain) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        regionSelect.value = regionLink.textContent.trim().replace(/^🌐\s*/, '');
        currencySelect.value = currencyMap[regionLink.textContent.trim().replace(/^🌐\s*/, '')].currency;
    }
});

// Update currency when region changes
regionSelect.addEventListener('change', (e) => {
    const selectedRegion = e.target.value;
    const { currency, symbol } = currencyMap[selectedRegion];
    // Update currency select options
    currencySelect.value = currency;
});

// Save settings
saveBtn.addEventListener('click', () => {
    const selectedRegion = regionSelect.value;
    const selectedCurrency = currencySelect.value;
    
    // Here you could add API calls or localStorage updates
    console.log(`Settings saved: Region - ${selectedRegion}, Currency - ${selectedCurrency}`);
    
    // Close the modal
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
        // Update the region link text
    regionLink.innerHTML = `🌐 ${selectedRegion}`;
});

//---- Save Heart ----//
document.addEventListener('DOMContentLoaded', () => {
    const heartBtn = document.querySelector('.btn-save');
    const heartIcon = document.querySelector('.heart-icon');
    
    // Check localStorage on page load
    const isActive = localStorage.getItem('heartActive') === 'true';
    if (isActive) {
        heartIcon.classList.add('active');
    }
    
    // Toggle heart state and update localStorage
    heartBtn.addEventListener('click', () => {
        heartIcon.classList.toggle('active');
        
        // Store the current state
        const currentState = heartIcon.classList.contains('active');
        localStorage.setItem('heartActive', currentState);
        
        // Optional: Add a subtle animation
        heartIcon.style.transform = 'scale(1.2)';
        setTimeout(() => {
            heartIcon.style.transform = 'scale(1)';
        }, 200);
    });
});

// Travelers Modal
document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const travelersInput = document.querySelector('.date-input.travel');
    const travelersModal = document.getElementById('travelersModal');
    const doneBtn = document.getElementById('doneBtn');
    const travelersValue = document.querySelector('.travel .date-value');
    
    // Counter state
    let counts = {
        adults: 2,
        children: 0
    };
    
    // Open modal when clicking travelers input
    travelersInput.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event from bubbling up
        travelersModal.style.display = 'block';
    });
    
    // Handle counter buttons
    document.querySelectorAll('.counter-btn').forEach(button => {
        button.addEventListener('click', () => {
            const type = button.dataset.type;
            const isPlus = button.classList.contains('plus');
            
            if (isPlus) {
                counts[type]++;
            } else {
                if (counts[type] > 0) {
                    counts[type]--;
                }
            }
            
            // Update counter display
            document.getElementById(`${type}Count`).textContent = counts[type];
            
            // Update minus button state
            const minusBtn = button.parentElement.querySelector('.minus');
            minusBtn.disabled = counts[type] === 0;
            
            // Store in localStorage
            localStorage.setItem('travelerCounts', JSON.stringify(counts));
        });
    });
    
    // Handle done button
    doneBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event from bubbling up
        updateTravelersDisplay();
        travelersModal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    document.addEventListener('click', (e) => {
        if (travelersModal.style.display === 'block' && !travelersModal.contains(e.target) && e.target !== travelersInput) {
            travelersModal.style.display = 'none';
        }
    });
    
    function updateTravelersDisplay() {
        const total = counts.adults + counts.children;
        const travelerText = total === 1 ? 'traveler' : 'travelers';
        travelersValue.textContent = `${total} ${travelerText}`;
    }
    
    // Initialize from localStorage if available
    const savedCounts = localStorage.getItem('travelerCounts');
    if (savedCounts) {
        counts = JSON.parse(savedCounts);
        document.getElementById('adultsCount').textContent = counts.adults;
        document.getElementById('childrenCount').textContent = counts.children;
        updateTravelersDisplay();
        
        // Set initial disabled state for minus buttons
        document.querySelectorAll('.counter-btn.minus').forEach(button => {
            const type = button.dataset.type;
            button.disabled = counts[type] === 0;
        });
    }
});

// Share Modal
document.addEventListener('DOMContentLoaded', () => {
    const shareBtn = document.querySelector('.btn-share');
    const shareModal = document.getElementById('shareModal');
    const closeBtn = document.getElementById('closeShareModal');
    const copyLinkBtn = document.getElementById('copyLinkBtn');
    
    // Open modal
    shareBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        shareModal.style.display = 'block';
    });
    
    // Close modal when clicking X button
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        shareModal.style.display = 'none';
    });

    document.addEventListener('click', (e) => {
        if (shareModal.style.display === 'block' && !shareModal.contains(e.target) && e.target !== shareBtn) {
            shareModal.style.display = 'none';
        }
    });
    
    // Copy link functionality
    copyLinkBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            
            // Visual feedback
            const originalText = copyLinkBtn.textContent;
            copyLinkBtn.innerHTML = `
                <div class="icon-circle copy">
                    <i class="fa-solid fa-check"></i>
                </div>
                Copied!
            `;
            
            // Reset after 2 seconds
            setTimeout(() => {
                copyLinkBtn.innerHTML = `
                    <div class="icon-circle copy">
                        <i class="fa-solid fa-link"></i>
                    </div>
                    Copy link
                `;
            }, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    });
});

// Modal Gallery
const images = [
    {
        url: '/images/nature-1.jpg',
        title: 'Juneau Vacation Rental | 2BR | 1BA | 1,115 Sq Ft | Stairs Required'
    },
    {
        url: '/images/nature-2.jpg',
        title: 'Lakeside View from Deck'
    },
    {
        url: '/images/nature-3.jpg',
        title: 'Mountain Vista'
    },
    {
        url: '/images/nature-1.jpg',
        title: 'Juneau Vacation Rental | 2BR | 1BA | 1,115 Sq Ft | Stairs Required'
    },
    {
        url: '/images/nature-2.jpg',
        title: 'Lakeside View from Deck'
    },
    {
        url: '/images/nature-3.jpg',
        title: 'Mountain Vista'
    },
];

let currentImageIndex = 0;
const modalGallery = document.getElementById('imageModal');
const imageElement = document.querySelector('.gallery-image');
const titleElement = document.querySelector('.image-title');
const countElement = document.querySelector('.image-count');
const prevButton = document.getElementById('prevBtn');
const nextButton = document.getElementById('nextBtn');
const openModalBtn = document.querySelector('.more-image');
const closeModalBtn = document.getElementById('closeModalBtn');

function openModal() {
    modalGallery.style.display = 'block';
    updateImage();
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modalGallery.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function updateImage() {
    const image = images[currentImageIndex];
    imageElement.src = image.url;
    titleElement.textContent = image.title;
    countElement.textContent = `${currentImageIndex + 1}/${images.length}`;
    
    prevButton.disabled = currentImageIndex === 0;
    nextButton.disabled = currentImageIndex === images.length - 1;
}

function navigateImages(direction) {
    currentImageIndex += direction;
    if (currentImageIndex < 0) currentImageIndex = 0;
    if (currentImageIndex >= images.length) currentImageIndex = images.length - 1;
    updateImage();
}

openModalBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
prevButton.addEventListener('click', () => navigateImages(-1));
nextButton.addEventListener('click', () => navigateImages(1));

modalGallery.addEventListener('click', function(e) {
    if (e.target === modalGallery) {
        closeModal();
    }
});

document.addEventListener('keydown', function(e) {
    if (modalGallery.style.display === 'block') {
        if (e.key === 'ArrowLeft' && currentImageIndex > 0) {
            navigateImages(-1);
        } else if (e.key === 'ArrowRight' && currentImageIndex < images.length - 1) {
            navigateImages(1);
        } else if (e.key === 'Escape') {
            closeModal();
        }
    }
});