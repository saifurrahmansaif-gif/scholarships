/**
 * GLOBAL VARIABLES
 * We store our data in memory so we don't have to re-fetch it from the server every time we search.
 * This makes the search bar incredibly fast (O(N) time complexity).
 */
let scholarshipsData = [];

// DOM Elements (Connecting our JS to the HTML)
const grid = document.getElementById('scholarship-grid');
const searchInput = document.getElementById('searchInput');
const fundingFilter = document.getElementById('fundingFilter');
const levelFilter = document.getElementById('levelFilter');
const resultsCount = document.getElementById('results-count');

/**
 * INITIALIZATION
 * Asynchronous function to fetch our JSON data when the page loads.
 */
async function loadScholarships() {
    try {
        // Fetching the data from our local JSON file
        const response = await fetch('data.json');
        scholarshipsData = await response.json();
        
        // Render all scholarships initially
        renderScholarships(scholarshipsData);
    } catch (error) {
        console.error("Error loading data:", error);
        grid.innerHTML = `<p style="color: red; text-align: center; width: 100%;">Failed to load scholarships. Please refresh the page.</p>`;
    }
}

/**
 * RENDER FUNCTION
 * Takes an array of scholarship objects and converts them into beautiful HTML cards.
 */
function renderScholarships(data) {
    // Update the counter
    resultsCount.innerText = `Showing ${data.length} scholarship opportunities`;

    // Handle Empty State (If search yields 0 results)
    if (data.length === 0) {
        grid.innerHTML = `
            <div style="text-align: center; grid-column: 1 / -1; padding: 3rem; color: var(--text-muted);">
                <h3>No scholarships found 😔</h3>
                <p>Try adjusting your search terms or filters.</p>
            </div>
        `;
        return;
    }

    // Map through the data and create the HTML structure for each card
    const htmlString = data.map(item => {
        // Determine the color class for the funding badge
        let fundingClass = "self"; // Default
        if (item.funding === "Fully Funded") fundingClass = "fully";
        if (item.funding === "Partially Funded") fundingClass = "partial";

        // Handle 'Check website' link logic
        const linkHref = item.link !== "Check website" ? item.link : "#";
        const targetAttr = item.link !== "Check website" ? `target="_blank" rel="noopener noreferrer"` : "";

        return `
            <div class="card">
                <div>
                    <div class="card-country">
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM2.04 4.326c.325 1.329 2.532 2.54 3.717 3.19.48.263.793.434.743.484-.08.08-.162.158-.242.234-.416.396-.787.749-.758 1.266.035.634.618.824 1.214 1.017.577.188 1.168.38 1.286.984.082.417-.075.988-.22 1.52-.215.782-.406 1.48.22 1.48 1.5-.5 3.798-3.186 4-5 .138-1.243-2-2-3.5-2.5-.478-.16-.755.081-.99.284-.172.15-.322.279-.51.216-.445-.148-2.5-2-1.5-2.5.78-.39.952-.171 1.227.182.078.099.163.208.273.318.609.304.662-.132.723-.633.039-.322.081-.671.277-.867.434-.434 1.265-.791 2.028-1.12.712-.306 1.365-.587 1.579-.88A7 7 0 1 1 2.04 4.327Z"/>
                        </svg>
                        ${item.country}
                    </div>
                    <h3>${item.title}</h3>
                    <div class="card-tags">
                        <span class="badge ${fundingClass}">${item.funding}</span>
                        <span class="badge level">${item.level}</span>
                    </div>
                </div>
                
                <div class="card-footer">
                    <div class="deadline">
                        <strong>Deadline:</strong> ${item.deadline}
                    </div>
                    <a href="${linkHref}" class="apply-btn" ${targetAttr}>Apply</a>
                </div>
            </div>
        `;
    }).join(''); // Join the array of HTML strings into one giant string

    // Inject the HTML into the DOM
    grid.innerHTML = htmlString;
}

/**
 * FILTERING ALGORITHM
 * Triggers every time the user types or changes a dropdown.
 */
function filterScholarships() {
    const searchTerm = searchInput.value.toLowerCase();
    const fundingValue = fundingFilter.value;
    const levelValue = levelFilter.value;

    const filteredData = scholarshipsData.filter(item => {
        // 1. Check Search Term (Matches Title OR Country)
        const matchesSearch = item.title.toLowerCase().includes(searchTerm) || 
                              item.country.toLowerCase().includes(searchTerm);
        
        // 2. Check Funding Dropdown
        const matchesFunding = fundingValue === "All" || item.funding === fundingValue;
        
        // 3. Check Level Dropdown
        const matchesLevel = levelValue === "All" || item.level === levelValue;

        // Keep item only if it passes ALL filters
        return matchesSearch && matchesFunding && matchesLevel;
    });

    // Re-render the grid with the filtered data
    renderScholarships(filteredData);
}

// EVENT LISTENERS (Listening for user actions)
searchInput.addEventListener('input', filterScholarships); // 'input' fires on every keystroke!
fundingFilter.addEventListener('change', filterScholarships);
levelFilter.addEventListener('change', filterScholarships);

// Initialize the app when the script loads
loadScholarships();