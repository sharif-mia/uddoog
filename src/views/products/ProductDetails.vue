<template>
    <div class="product-details">
      <!-- Breadcrumb Navigation -->
      <nav>
        <ul class="breadcrumb">
          <li>Products</li>
          <li>Home, Garden</li>
          <li>Decor</li>
          <li>Seasonal Decor</li>
        </ul>
      </nav>
  
      <!-- Product Information -->
      <div class="product-info">
        <div class="image-gallery">
          <button @click="prevImage">←</button>
          <img :src="currentImage" alt="Product Image" />
          <button @click="nextImage">→</button>
        </div>
  
        <div class="product-details-text">
          <h1>Plating Clear Magnetic For Magsafe Wireless Charging Cases</h1>
          <p>For iPhone 16 15 14 13 Pro Max Crossbody Lanyard Necklace Cover</p>
          
          <div class="options">
            <div class="color-options">
              <label>Color:</label>
              <select v-model="selectedColor">
                <option v-for="color in colors" :key="color" :value="color">{{ color }}</option>
              </select>
            </div>
  
            <div class="size-options">
              <label>Size:</label>
              <select v-model="selectedSize">
                <option v-for="size in sizes" :key="size" :value="size">{{ size }}</option>
              </select>
            </div>
          </div>
  
          <div class="pricing">
            <p>Our Price: <strong>{{ discountedPrice }} BDT</strong></p>
            <p>You Save: <strong>{{ savings }} BDT</strong></p>
          </div>
  
          <div class="quantity">
            <label>Quantity:</label>
            <button @click="decrementQuantity">−</button>
            <span>{{ quantity }}</span>
            <button @click="incrementQuantity">+</button>
            <p>{{ availableStock }} available</p>
          </div>
          
          <button class="add-to-cart" @click="addToCart">Add To Cart</button>
          
        </div>
      </div>
  
      <!-- Product Details Section -->
      <div class="product-details-section">
        <h2>Product Details</h2>
        <h3>Specification</h3>
        <ul>
          <li>Shipping Limitations: Unlimited</li>
          <li>Dimensions: 33.43cm x 20.87in x 0.24in</li>
          <li>Weight: 0.4lbs</li>
          <li>Available Ship United States</li>
          <li>Material: Felt</li>
          <li>Quantity/Specs: 1</li>
          <li>Length: 28ft/28ft</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        images: [
          'path/to/image1.jpg',
          'path/to/image2.jpg',
          'path/to/image3.jpg',
        ],
        currentImage: 'path/to/image1.jpg',
        colors: ['Dark Red', 'Green', 'Black', 'White'],
        sizes: ['S', 'M', 'L'],
        selectedColor: 'Dark Red',
        selectedSize: 'S',
        quantity: 1,
        availableStock: 20,
        originalPrice: 250,
        discountPercentage: 40,
      };
    },
    computed: {
      discountedPrice() {
        const discountAmount = (this.originalPrice * this.discountPercentage) / 100;
        return this.originalPrice - discountAmount;
      },
      savings() {
        return (this.originalPrice - this.discountedPrice).toFixed(2);
      },
    },
    methods: {
      nextImage() {
        const currentIndex = this.images.indexOf(this.currentImage);
        this.currentImage = this.images[(currentIndex + 1) % this.images.length];
      },
      prevImage() {
        const currentIndex = this.images.indexOf(this.currentImage);
        this.currentImage = this.images[(currentIndex - 1 + this.images.length) % this.images.length];
      },
      incrementQuantity() {
        if (this.quantity < this.availableStock) {
          this.quantity++;
        }
      },
      decrementQuantity() {
        if (this.quantity > 1) {
          this.quantity--;
        }
      },
      addToCart() {
        // Logic to add the product to the cart
        alert(`Added ${this.quantity} of ${this.selectedColor} ${this.selectedSize} to the cart.`);
      },
    },
  };
  </script>
  
  <style scoped>
  .product-details {
    font-family: Arial, sans-serif;
    margin: 20px;
  }
  
  .breadcrumb {
    list-style-type: none;
    padding: 0;
  }
  
  .breadcrumb li {
    display: inline;
    margin-right: 10px;
  }
  .image-gallery {
    display: flex;
    align-items: center;
  }
  .product-info {
    display: flex;
    justify-content: space-between;
  }
  .product-details-text {
    flex: 1;
    padding-left: 20px;
  }
  .options {
    display: flex;
  }
  .color-options, .size-options {
    margin-right: 20px;
  }
  .quantity {
    display: flex;
    align-items: center;
  }
  .add-to-cart {
    background-color: #28a745;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
  }
  .product-details-section {
    margin-top: 20px;
  }
  </style>