<template>
  <section class="container product-details py-5">
    <div class="py-1 mb-3">
      <div class="breadcrumb">
        <ul class="d-flex">
          <li>
            <router-link :to="{ path: '/' }"><i class="icon-home"></i></router-link>
          </li>
          <li>
            <a>HomeHair</a>
          </li>
          <li>
            <a>Care</a>
          </li>
          <li><a>Huawei MatePad 10.4 WiFi Edition 10.4" IPS LCD Tab (4 GB Ram, 128 GB Storage)
          </a></li>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="col-9">
        <div class="row">
          <div class="col-6 product-details__gallery">
            <div class="product-gallery__main-image">
              <img :src="activeImage" alt="Main product image" />
              <button class="product-gallery__arrow product-gallery__arrow--left" @click="prevImage"><i class="icon-arrow-left"></i></button>
              <button class="product-gallery__arrow product-gallery__arrow--right" @click="nextImage"><i class="icon-arrow-right"></i></button>
            </div>
            <div class="product-gallery__thumbnails">
              <img v-for="(img, index) in product.images" :key="index" :src="img" :class="{ 'product-gallery__thumbnail--active': index === activeIndex }" class="product-gallery__thumbnail" @click="activeIndex = index" />
            </div>
          </div>
          <div class="col-6 product-details__info">
            <h1 class="product-details__title">
              {{ product.name }}
            </h1>
            <label class="form-label">Color:   {{ selectedColor?.name || 'None' }}</label>
            <div class="product-details__colors gap-3">
              <label v-for="(color, index) in product.colors" :key="index" class="product-details__color">
                <input type="radio" name="color" :value="color"
                v-model="selectedColor" />
                <span :style="{ backgroundColor: color.value }" ></span>
              </label>
            </div>

            <div class="product-details__sizes my-3 gap-3">
              <span class="product-details__label">Size</span>
              <label v-for="size in product.sizes" :key="size" class="product-details__size">
                <input type="radio" name="size" />
                <span>{{ size }}</span>
              </label>
            </div>

            <div class="product-details__pricing">
              <div class="row">
                <div class="col-4">
                  <p class="product-details__our-price">
                      Our Price <strong><i class="icon-taka"></i> {{ formatPrice(product.ownerPrice) }}</strong>
                    </p>
                </div>
                <div class="col-4">
                   
                  <p class="product-details__sale-price">
                      You Sale <strong><i class="icon-taka"></i> {{ formatPrice(product.sellerPrice) }} </strong>
                    </p>
                </div>
                <div class="col-4">
                  <label class="form-label">Set Your Price</label>
                  <input type="number" class="form-control" />
                </div>
              </div>

              <p class="product-details__discount">
                <s class="mr-2"><i class="icon-taka"></i> 250 </s> 40% off
              </p>
            </div>

            <div class="my-3">
              <label class="form-label">Quantity</label>
              <div class="row align-items-center">
                <div class="col-4">
                  <div class="product-details__quantity">
                    <div class="product-details__quantity-controls">
                      <i class="icon-minus" @click="decreaseQuantity"></i>
                      <input type="text" :value="quantity" />
                      <i class="icon-plus" @click="increaseQuantity"></i>
                    </div>
                  </div>
                </div>
                <div class="col-8">
                  <span class="product-details__stock text-success">20 available</span>
                </div>
              </div>
            </div>

            <button class="btn">Add To Cart</button>
          </div>
        </div>
        <div class="product-details__description " :class="fullDescription?'full':''">
          <h2>Product details of Huawei MatePad 10.4 WiFi Edition 10.4" IPS LCD Tab (4 GB Ram, 128 GB Storage)
          </h2>
            <p>The Apple Studio Display 27-inch is a high-end monitor designed for professionals who demand the best in image quality and performance. With its stunning 5K Retina display, this monitor delivers an incredibly sharp and vibrant viewing experience. This is a premium monitor built with a focus on seamless integration with Apple's ecosystem. It features a sleek and minimalist design, with a thin bezel and a built-in stand that allows for easy tilt and height adjustments.</p>
            <img src="https://www.bdshop.com/pub/media/catalog/product/cache/eaf695a7c2edd83636a0242f7ce59484/h/u/huawei_matepad_10.4.jpg" alt="" />
            <ul>
              <li>Additional Features: Armor Shell Tough Build | 90Hz Eye Comfort Display | IP54 Dust &amp; Water Resistance&nbsp;</li>
              <li>OS: realme UI Based on Android 14</li>
              <li>Chipset: UNISOC T612</li>
              <li>CPU: Octa-Core (2x A75 @1.8GHz + 6x A55 @1.8GHz)</li>
              <li>RAM: 4GB (Expandable up to 8GB)</li>
              <li>ROM: 64GB</li>
              <li>SIM Card Slot: Dual Nano SIM + MicroSD</li>
              <li>Network: 2G/3G/4G</li>
              <li>Display: 6.74” HD+ 90Hz Eye Comfort Display | Resolution: 1600 x 720 | Brightness: 450nits (typ), 560nits (HBM) | Touch Sampling Rate: Up to 180Hz | Screen-to-body Ratio: 90.3%</li>
              <li>Rear Camera: 8MP</li>
              <li>Front Camera: 5MP</li>
              <li>Battery &amp; Charging: 5000mAh Massive Battery | 10W Fast Charge | USB Type-C</li>
              <li>Connectivity: Wi-Fi | Bluetooth 5.0 | GPS | 3.5mm Jack</li>
              <li>Sensors: Magnetic Induction Sensor | Light Sensor | Proximity Sensor | Acceleration Sensor</li>
            </ul>
          <iframe width="907" height="510" src="https://www.youtube.com/embed/GuuiRT219LY?si=5qHMbS0aReP1GMXo" title="Apple Event — March 8" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          <h2>Key Specifications of Apple Studio Display 27</h2>
          <ul>
            <li><strong>Display Size:</strong> 27 inches</li>
            <li><strong>Display Resolution:</strong> 5120x2880 (WxH) UHD+</li>
            <li><strong>Refresh Rate:</strong> 60Hz</li>
            <li><strong>Color:</strong> Silver</li>
            <li><strong>Weight:</strong> 6.3 kg</li>
          </ul>
          <h2>What is the price of Apple Studio Display Monitor In Bangladesh?</h2>
          <p>The price of Apple Studio Display Monitor starts from 255,000 . The price may vary due to your customization and product availability. You can buy Apple Studio Display Monitor from our website or visit our showrooms nearby.</p>
        <div class="expand-button">
          <button type="button" class="btn btn-outline" @click="toggleDescription"> {{ fullDescription?'VIEW LESS':'VIEW MORE' }}</button>
        </div>
        </div>
      </div>
      <div class="col-3 sticky">
        <div class="customer-info">
          <div class="form-group">
            <label class="form-label">Customer Name</label>
            <p>Md . Imran Kamal Mia</p>
          </div>

          <div class="form-group">
            <label class="form-label">Customer Phone Number</label>
            <p>017786543323</p>
          </div>

          <div class="form-group">
            <label class="form-label">Select District</label>
            <p>Dhaka</p>
          </div>

          <div class="form-group">
            <label class="form-label">Select Area</label>
            <p>Gulshan</p>
          </div>

          <div class="form-group">
            <label class="form-label">Customer Address</label>
            <p>Plot 59/61, Dhaka Rd 23, Dhaka 1212</p>
          </div>

          <div class="form-group">
            <label class="form-label">Customer Note</label>
            <textarea class="form-control" placeholder="Call me before delivery" readonly></textarea>
          </div>

          <div class="customer-info__actions">
            <button class="btn">Add to cart</button>
            <a href="#" class="customer-info__edit">Edit Info</a>
          </div>
        </div>
      </div>
    </div>
    <div class="related-products">
      <h2>You may also like</h2>
      <div class="product-grid">
        <Product :product="product" v-for="product in relatedProducts" :key="product.id" />
      </div>
    </div>
  </section>
</template>

<script>
import Product from "@/components/product.vue";

export default {
  name: "ProductDetails",
  components: {
    Product,
  },
  data() {
    return {
      products: [],
      loadingProducts: true,
      selectedColor: null,
      fullDescription:false,
      product: {
        name: `Huawei MatePad 10.4 WiFi Edition 10.4" IPS LCD Tab (4 GB Ram, 128 GB Storage)`,
        images: ["https://www.bdshop.com/pub/media/catalog/product/cache/eaf695a7c2edd83636a0242f7ce59484/h/u/huawei_matepad_10.4.jpg", "https://www.bdshop.com/pub/media/catalog/product/cache/eaf695a7c2edd83636a0242f7ce59484/h/u/huawei_matepad_10.4_1.jpg","https://www.bdshop.com/pub/media/catalog/product/cache/eaf695a7c2edd83636a0242f7ce59484/h/u/huawei_matepad_10.4_2.jpg"],
        colors: [
          { name: "Red", value: "#ef4444" },
          { name: "Green", value: "#006b50" },
          { name: "Black", value: "#1A1D1F" },
          { name: "Blue", value: "#194f9f" },
        ],
        sizes: ["S", "M", "L"],
        ownerPrice: 25643000,
        sellerPrice: 28768000,
      },
      activeIndex: 0,
      quantity: 1,
    };
  },
  created() {
    this.selectedColor = this.product.colors[0];
  },
  computed: {
    toggleDescription(){
      this.fullDescription = !this.fullDescription
    },
    activeImage() {
      return this.product.images[this.activeIndex];
    },
    relatedProducts() {
      return this.products.slice(0, 5);
    },
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    nextImage() {
      this.activeIndex = (this.activeIndex + 1) % this.product.images.length;
    },
    prevImage() {
      this.activeIndex = (this.activeIndex - 1 + this.product.images.length) % this.product.images.length;
    },
    increaseQuantity() {
      this.quantity++;
    },
    decreaseQuantity() {
      if (this.quantity > 1) this.quantity--;
    },
    formatPrice(value) {
      return (value / 100).toFixed(2);
    },
    async fetchProducts() {
      try {
        this.loadingProducts = true;
        const response = await this.$axios.get("http://localhost:3000/products");
        this.products = response.data;
      } catch (error) {
        console.log("Failed to load products: ");
      } finally {
        this.loadingProducts = false;
      }
    },
  },
};
</script>

<style scoped lang="scss"></style>
