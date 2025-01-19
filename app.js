// Form submission handling
document.getElementById("registration-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Validate password
    const password = document.getElementById("password").value;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!passwordRegex.test(password)) {
        alert("Password must contain at least 8 characters, including uppercase letters, lowercase letters, and numbers.");
        return; // Stop further execution
    }
    // Add an event listener to the registration form submission
document.getElementById('registration-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the form from submitting

    // Generate a 6-digit random code
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    console.log('Verification code sent: ', verificationCode);  // Log the code for testing

    // Store the code in localStorage (you could also use a session or cookie in a real app)
    localStorage.setItem('verificationCode', verificationCode);

    // Hide the registration form and show the verification form
    document.getElementById('registration').style.display = 'none';
    document.getElementById('verification').style.display = 'block';
});

// Add an event listener to the verification form submission
document.getElementById('verification-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the form from submitting

    // Get the code entered by the user
    const enteredCode = document.getElementById('verification-code').value;

    // Retrieve the correct code from localStorage
    const correctCode = localStorage.getItem('verificationCode');

    // Check if the entered code matches the generated code
    if (enteredCode === correctCode) {
        // If the code is correct, show the homepage
        document.getElementById('verification').style.display = 'none';
        document.getElementById('homepage').style.display = 'block';
    } else {
        // If the code is incorrect, alert the user
        alert('Incorrect code. Please try again.');
    }
});


    // If validation passes, show homepage
    document.getElementById("registration").style.display = "none"; // Hide registration
    document.getElementById("homepage").style.display = "block"; // Show homepage
});
// Sample list of universities and campuses
const universities = [
    { name: "Makerere University", campuses: ["Main Campus", "Jinja City Campus"] },
    { name: "Kampala International University", campuses: ["Main Campus (Kansanga)", "Western Campus (Ishaka)"] },
    { name: "Mbarara University of Science and Technology", campuses: ["Main Campus"] },
    { name: "Kyambogo University", campuses: ["Main Campus"] },
    { name: "Gulu University", campuses: ["Main Campus"] },
    { name: "Busitema University", campuses: ["Main Campus"] },
    { name: "Kabale University", campuses: ["Main Campus"] },
    { name: "Uganda Martyrs University", campuses: ["Main Campus"] },
    { name: "Islamic University in Uganda", campuses: ["Main Campus"] },
    { name: "Ndejje University", campuses: ["Main Campus"] },
    { name: "Mountains of the Moon University", campuses: ["Main Campus"] },
    { name: "MUBS (Makerere University Business School)", campuses: ["Main Campus"] },
    { name: "Bishop Stuart University", campuses: ["Main Campus"] },
    { name: "Uganda Christian University", campuses: ["Main Campus"] },
    // Add more universities and campuses as needed
];

// Show modal when an item is clicked
document.querySelectorAll(".category-item").forEach(item => {
    item.addEventListener("click", () => {
        document.getElementById("university-modal").style.display = "flex";
    });
});

// Populate university list
const universityListContainer = document.querySelector(".university-list");
universities.forEach(university => {
    const div = document.createElement("div");
    div.className = "university-item";
    div.textContent = university;
    div.addEventListener("click", () => {
        div.classList.toggle("selected");
        toggleConfirmButton();
    });
    universityListContainer.appendChild(div);
});

// Search universities
document.getElementById("university-search").addEventListener("input", function () {
    const query = this.value.toLowerCase();
    document.querySelectorAll(".university-item").forEach(item => {
        if (item.textContent.toLowerCase().includes(query)) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
});

// Enable/Disable Confirm button
function toggleConfirmButton() {
    const selectedUniversities = document.querySelectorAll(".university-item.selected");
    document.getElementById("confirm-university").disabled = selectedUniversities.length === 0;
}

// Confirm selection
document.getElementById("confirm-university").addEventListener("click", () => {
    const selectedUniversities = Array.from(document.querySelectorAll(".university-item.selected"))
        .map(item => item.textContent);
    console.log("Selected Universities:", selectedUniversities); // You can send this data to the backend if needed

    // Close modal
    document.getElementById("university-modal").style.display = "none";
});
document.addEventListener("DOMContentLoaded", function() {
    const universityModal = document.getElementById('university-modal');
    const buySellPrompt = document.getElementById('buy-sell-prompt');
    const confirmActionBtn = document.getElementById('confirm-action');
    const buyBtn = document.getElementById('buy-btn');
    const sellBtn = document.getElementById('sell-btn');
    let userAction = null; // Store user's action (buy or sell)

    // Function to show the Buy/Sell prompt
    function showBuySellPrompt() {
        buySellPrompt.style.display = 'block';
    }

    // Hide the Buy/Sell prompt
    function hideBuySellPrompt() {
        buySellPrompt.style.display = 'none';
    }

    // Event listener for "Buy" button
    buyBtn.addEventListener('click', function() {
        userAction = 'buy';
        confirmActionBtn.disabled = false;
        buyBtn.style.backgroundColor = '#45a049'; // Visual feedback
        sellBtn.style.backgroundColor = '#4CAF50'; // Reset other button
    });

    // Event listener for "Sell" button
    sellBtn.addEventListener('click', function() {
        userAction = 'sell';
        confirmActionBtn.disabled = false;
        sellBtn.style.backgroundColor = '#45a049'; // Visual feedback
        buyBtn.style.backgroundColor = '#4CAF50'; // Reset other button
    });

    // Event listener for confirm action
    confirmActionBtn.addEventListener('click', function() {
        if (userAction) {
            console.log("User wants to: " + userAction); // For debugging
            // Proceed with the action based on user's choice (buy/sell)
            hideBuySellPrompt(); // Hide the prompt
            // You can redirect to a new page or update the interface based on the selection.
        } else {
            alert("Please choose whether you want to buy or sell.");
        }
    });

    // Listen for category clicks to show the University Modal
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(function(item) {
        item.addEventListener('click', function() {
            showUniversityModal(); // Show university selection
        });
    });

    // Function to show the university selection modal (existing functionality)
    function showUniversityModal() {
        universityModal.style.display = 'block';
        populateUniversityList(); // Populate universities as before
    }

    // Function to hide the university selection modal
    function hideUniversityModal() {
        universityModal.style.display = 'none';
    }

    // Assume you already have the functionality to populate universities, and upon selection:
    // After the user selects a university, show the Buy/Sell prompt
    // Call this function when the user selects a university
    function proceedToBuyOrSell() {
        hideUniversityModal();
        showBuySellPrompt(); // Show buy/sell prompt
    }
    document.addEventListener("DOMContentLoaded", function() {
        const buyBtn = document.getElementById('buy-btn');
        const sellBtn = document.getElementById('sell-btn');
        const categorySpecificSelection = document.getElementById('category-specific-selection');
        const categoryOptionsDiv = document.getElementById('category-options');
        const proceedBtn = document.getElementById('proceed-btn');
        const otherOptionInput = document.getElementById('other-item');
        const otherOptionDiv = document.getElementById('other-option');
        
        // Categories and options to display
        const categories = {
            'Furniture': ['Chair', 'Table', 'Couch', 'Bed', 'Desk', 'Other'],
            'Textbooks': ['Math', 'Science', 'History', 'Engineering', 'Literature', 'Other'],
            'Electronics': ['Phone', 'Laptop', 'Tablet', 'Headphones', 'Other'],
            'Clothing': ['Shirt', 'Pants', 'Jacket', 'Shoes', 'Other'],
            'Vehicles': ['Car', 'Bike', 'Bus', 'Other']
            // Add more categories as needed
        };
    
        // Show category-specific options when Buy/Sell is clicked
        function showCategoryOptions(category) {
            categorySpecificSelection.style.display = 'block';
            categoryOptionsDiv.innerHTML = ''; // Clear previous options
    
            // Create option buttons for the selected category
            categories[category].forEach(item => {
                const optionDiv = document.createElement('div');
                optionDiv.classList.add('option');
                optionDiv.textContent = item;
                optionDiv.dataset.item = item;
                optionDiv.addEventListener('click', function() {
                    selectItem(item);
                });
                categoryOptionsDiv.appendChild(optionDiv);
            });
            
            // Show the "Other" input
            otherOptionDiv.style.display = 'block';
            proceedBtn.style.display = 'none';
        }
    
        // Handle item selection
        function selectItem(item) {
            if (item === 'Other') {
                otherOptionInput.style.display = 'block'; // Allow the user to type the item name
            } else {
                otherOptionInput.style.display = 'none'; // Hide the "Other" input if an option is selected
            }
            proceedBtn.style.display = 'block'; // Enable Proceed button
            proceedBtn.textContent = `Proceed with ${item}`;
            proceedBtn.onclick = function() {
                proceedWithSelection(item);
            };
        }
    
        // Proceed after selecting an item
        function proceedWithSelection(item) {
            let selectedItem = item;
            if (item === 'Other') {
                selectedItem = otherOptionInput.value.trim();
                if (!selectedItem) {
                    alert('Please specify the item.');
                    return;
                }
            }
            alert(`You have selected: ${selectedItem}. Proceeding to the next step...`);
            // Proceed with the item selection (e.g., move to the next page or process the sale/buy)
        }
    
        // Show category options when Buy or Sell is clicked
        buyBtn.addEventListener('click', function() {
            const category = 'Furniture'; // Replace with dynamic category
            showCategoryOptions(category);
        });
    
        sellBtn.addEventListener('click', function() {
            const category = 'Electronics'; // Replace with dynamic category
            showCategoryOptions(category);
        });
    });
    
});
document.addEventListener("DOMContentLoaded", function() {
    const uploadBtn = document.getElementById('upload-btn');
    const productImages = document.getElementById('product-images');
    const productPrice = document.getElementById('product-price');
    const negotiable = document.getElementById('negotiable');
    const productDescription = document.getElementById('product-description');
    const sellProductForm = document.getElementById('sell-product-form');
    const successMessage = document.getElementById('success-message');
    
    let productDetailsFilled = false;

    // Function to check if all fields are filled and enable the upload button
    function checkFields() {
        const imagesValid = productImages.files.length >= 3; // Check if at least 3 images are uploaded
        const priceValid = productPrice.value.trim() !== '';
        const negotiableValid = negotiable.value !== '';
        const descriptionValid = productDescription.value.trim() !== '';

        if (imagesValid && priceValid && negotiableValid && descriptionValid) {
            uploadBtn.disabled = false;
            uploadBtn.classList.add('enabled'); // Highlight button green
        } else {
            uploadBtn.disabled = true;
            uploadBtn.classList.remove('enabled'); // Keep button disabled
        }
    }

    // Event listeners to check form fields
    productImages.addEventListener('change', checkFields);
    productPrice.addEventListener('input', checkFields);
    negotiable.addEventListener('change', checkFields);
    productDescription.addEventListener('input', checkFields);

    // Show Sell Form when "Sell" is chosen
    sellBtn.addEventListener('click', function() {
        // Show the sell product form
        sellProductForm.style.display = 'block';
        buySellPrompt.style.display = 'none'; // Hide buy/sell prompt
    });

    // Handle Upload Button Click
    uploadBtn.addEventListener('click', function() {
        if (!uploadBtn.disabled) {
            // Simulate product upload process
            setTimeout(function() {
                // Hide the sell form and show success message
                sellProductForm.style.display = 'none';
                successMessage.style.display = 'block';
            }, 1500); // Simulate upload time
        }
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const maxPriceInput = document.getElementById('max-price');
    const searchBtn = document.getElementById('search-btn');
    const filteredProductsDiv = document.getElementById('filtered-products');
    const productListDiv = document.getElementById('product-list');
    const buyerSearchForm = document.getElementById('buyer-search-form');
    
    let products = []; // Array to store uploaded products

    // Sample data (Replace this with real data from the seller's uploads)
    products = [
        {
            id: 1,
            name: "Used Textbook - Math 101",
            price: 50000,
            negotiable: "Yes",
            description: "A well-used textbook for Math 101.",
            images: ["img1.jpg", "img2.jpg"],
            sellerWhatsapp: "+256700000000"
        },
        {
            id: 2,
            name: "Laptop - Dell XPS",
            price: 1000000,
            negotiable: "No",
            description: "A gently used Dell XPS laptop.",
            images: ["laptop.jpg"],
            sellerWhatsapp: "+256700000001"
        }
        // Add more products dynamically
    ];

    // Show the buyer search form when "Buy" is clicked
    document.getElementById('buy-btn').addEventListener('click', function() {
        buyerSearchForm.style.display = 'block';
    });

    // Handle Search Button Click
    searchBtn.addEventListener('click', function() {
        const maxPrice = parseInt(maxPriceInput.value.trim());
        
        if (isNaN(maxPrice) || maxPrice <= 0) {
            alert("Please enter a valid price.");
            return;
        }

        // Filter products based on max price
        const filteredProducts = products.filter(product => product.price <= maxPrice);

        // Clear previous results
        productListDiv.innerHTML = '';

        if (filteredProducts.length === 0) {
            productListDiv.innerHTML = '<p>No products found within the specified price range.</p>';
        } else {
            // Display filtered products
            filteredProducts.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('product-item');
                productDiv.innerHTML = `
                    <h3>${product.name}</h3>
                    <p><strong>Price:</strong> UGX ${product.price}</p>
                    <p><strong>Negotiable:</strong> ${product.negotiable}</p>
                    <p><strong>Description:</strong> ${product.description}</p>
                    <button class="interested-btn" data-whatsapp="${product.sellerWhatsapp}" data-product-id="${product.id}">Send "Interested"</button>
                `;
                productListDiv.appendChild(productDiv);
            });
        }

        // Show filtered products
        filteredProductsDiv.style.display = 'block';
        buyerSearchForm.style.display = 'none'; // Hide search form
    });

    // Handle "Send Interested" Button Click
    productListDiv.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('interested-btn')) {
            const whatsappNumber = e.target.getAttribute('data-whatsapp');
            const productId = e.target.getAttribute('data-product-id');

            // Send message to seller (open WhatsApp chat with pre-filled message)
            const message = encodeURIComponent("Interested");
            const url = `https://wa.me/${whatsappNumber}?text=${message}`;
            window.open(url, '_blank'); // Open in a new tab

            alert(`Message sent to the seller of product ID: ${productId}`);
        }
    });
});
// Collect data and handle the form submission when the user presses the "Upload" button
document.getElementById('upload-btn').addEventListener('click', function (e) {
    e.preventDefault(); // Prevent default form submission behavior

    const form = document.getElementById('sell-form');
    const formData = new FormData(form); // Collect all form data, including images

    // Check if images are uploaded
    const imageFiles = formData.getAll('images');
    if (imageFiles.length < 3) {
        alert('Please upload at least 3 images.');
        return;
    }

    // Check if other required fields are filled
    if (!formData.get('price') || !formData.get('description') || !formData.get('category')) {
        alert('Please fill in all required fields.');
        return;
    }

    // Send data to the backend (your server)
    fetch('https://your-backend-endpoint.com/upload', { // Replace with your server URL
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Successfully uploaded
            alert('Upload successful!');
            document.getElementById('upload-status').innerText = "Good Luck!";
            form.reset(); // Reset form fields after successful upload
        } else {
            // Handle upload failure
            alert('Failed to upload data.');
        }
    })
    .catch(error => {
        console.error('Error uploading data:', error);
        alert('There was an error uploading your data.');
    });
});


