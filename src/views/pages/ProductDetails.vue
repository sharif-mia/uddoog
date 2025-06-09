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
          <li><a>Huawei MatePad 10.4 WiFi Edition 10.4" IPS LCD Tab (4 GB Ram, 128 GB Storage) </a></li>
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
            <label class="form-label">Color: {{ selectedColor?.name || "None" }}</label>
            <div class="product-details__colors gap-3">
              <label v-for="(color, index) in product.colors" :key="index" class="product-details__color">
                <input type="radio" name="color" :value="color" v-model="selectedColor" />
                <span :style="{ backgroundColor: color.value }"></span>
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
                  <label class="form-label">Extra Profit</label>
                  <input type="number" class="form-control" />
                </div>
              </div>

              <p class="product-details__discount">
                <s class="mr-2"><i class="icon-taka"></i> 350 </s> 40% off
              </p>
            </div>
            <div class="product-details__pricing product-details__profit">
              You make: <strong><i class="icon-taka"></i> 150 </strong>
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

        <div class="py-5">
          <el-tabs v-model="activeName" class="demo-tabs">
            <el-tab-pane name="first">
              <template #label>
                <span class="custom-tabs-label">
                  <span>Product Details</span>
                </span>
              </template>
              <div class="product-details__description" :class="fullDescription ? 'full' : ''">
                <h2>Product details of Huawei MatePad 10.4 WiFi Edition 10.4" IPS LCD Tab (4 GB Ram, 128 GB Storage)</h2>
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
                  <button type="button" class="btn btn-outline" @click="toggleDescription">{{ fullDescription ? "VIEW LESS" : "VIEW MORE" }}</button>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane name="second">
              <template #label>
                <span class="custom-tabs-label">
                  <span>Reviews ({{ reviews.length }})</span>
                </span>
              </template>
              <div class="review">
                <div class="review__item" v-for="review in reviews" :key="review.id">
                  <div class="review__avatar">
                    {{ review.nickname.charAt(0) }}
                  </div>
                  <div class="review__content">
                    <h4 class="review__meta">
                      {{ review.nickname }} — <span>{{ review.created_at }}</span>
                    </h4>
                    <div class="review__rating">
                      <i v-for="n in 5" :key="n" :class="n <= review.rating_absolute_value ? 'icon-star-fill' : 'icon-star'" class="review__star"></i>
                    </div>
                    <p class="review__text">{{ review.content }}</p>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="Gallery" name="gallery">
              <template #label>
                <span class="custom-tabs-label">
                  <span>Gallery</span>
                </span>
              </template>

              <button class="btn" type="button" @click="openGallery">Open Gallery</button>

              <light-gallery ref="galleryRef" 
  v-show="activeName === 'gallery'" 
  :speed="500" 
  :plugins="[lgThumbnail, lgZoom]">
                <a v-for="(img, i) in product.images" :key="i" :href="img" class="gallery-img" :ref="i === 0 ? 'firstImage' : null">
                  <img :src="img" :alt="product.name" class="mb-3" />
                </a>
              </light-gallery>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="qa">
          <div class="qa__header">
            <h3 class="qa__title">Buyer Questions & Answers ({{ questions.length }})</h3>
            <button class="btn" @click="toggleAskInput">Ask question</button>
          </div>

          <div v-if="showAskInput" class="">
            <textarea rows="2" v-model="newQuestion" type="text" class="mb-3 form-control" placeholder="Type your question..."></textarea>
            <button @click="toggleAskInput" class="btn btn-outline mr-3">Cancel</button>
            <button @click="submitQuestion" class="btn">Ask</button>
          </div>

          <div class="qa__list">
            <div v-for="(question, index) in questions" :key="index" class="qa__item">
              <div class="qa__badge"><i class="icon-question"></i></div>
              <div class="qa__content">
                <div class="qa__question">
                  <div class="qa__text">
                    <h4>{{ question.text }}</h4>
                    <small class="qa__meta">Asked by: MD.Rezaul Alam Kazol on Aug 3, 2022, 2:36 PM</small>
                  </div>
                </div>
                <div v-if="question.answer" class="qa__answer">
                  <p class="qa__text">{{ question.answer }}</p>
                  <small class="qa__meta">by seller name, on {{ question.date }}</small>
                </div>

                <div v-else class="qa__submit-answer">
                  <button class="btn btn-outline">answer</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-3 sticky">
        <div class="customer-info">
          <div class="form-group d-flex gap-3">
            <i class="icon-user mr-2"></i>
            <div>
              <label class="form-label">Customer Name</label>
              <p>Md . Imran Kamal Mia</p>
            </div>
          </div>

          <div class="form-group d-flex gap-3">
            <i class="icon-phone mr-2"></i>
            <div>
              <label class="form-label">Customer Phone Number</label>
              <p>017786543323</p>
            </div>
          </div>

          <div class="form-group d-flex gap-3">
            <i class="icon-track mr-2"></i>
            <div>
              <label class="form-label">Select District</label>
              <p>Dhaka</p>
            </div>
          </div>

          <div class="form-group d-flex gap-3">
            <i class="icon-map mr-2"></i>
            <div>
              <label class="form-label">Select Area</label>
              <p>Gulshan</p>
            </div>
          </div>

          <div class="form-group d-flex gap-3">
            <i class="icon-home mr-2"></i>
            <div>
              <label class="form-label">Customer Address</label>
              <p>Plot 59/61, Dhaka Rd 23, Dhaka 1212</p>
            </div>
          </div>

          <div class="form-group border-0 d-flex gap-3">
            <i class="icon-info mr-2"></i>
            <div>
              <label class="form-label">Customer Note</label>
              <textarea class="form-control"></textarea>
            </div>
          </div>

          <div class="customer-info__actions">
            <button class="btn">Add to cart</button>
            <a href="#" class="btn btn-outline">Edit Info</a>
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
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lightgallery.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import LightGallery from "lightgallery/vue";
export default {
  name: "ProductDetails",
  components: {
    Product,
    LightGallery,
    lgThumbnail,
    lgZoom,
  },
  data() {
    return {
      activeName: "first",
      reviews: [],
      products: [],
      lgThumbnail,
      lgZoom,
      loadingProducts: false,
      loadingReviews: false,
      selectedColor: null,
      fullDescription: false,
      dialogVisible: false,
      product: {
        name: `Huawei MatePad 10.4 WiFi Edition 10.4" IPS LCD Tab (4 GB Ram, 128 GB Storage)`,
        images: ["https://www.bdshop.com/pub/media/catalog/product/cache/eaf695a7c2edd83636a0242f7ce59484/h/u/huawei_matepad_10.4.jpg", "https://www.bdshop.com/pub/media/catalog/product/cache/eaf695a7c2edd83636a0242f7ce59484/h/u/huawei_matepad_10.4_1.jpg", "https://www.bdshop.com/pub/media/catalog/product/cache/eaf695a7c2edd83636a0242f7ce59484/h/u/huawei_matepad_10.4_2.jpg"],
        colors: [
          { name: "Red", value: "#ef4444" },
          { name: "Green", value: "#006b50" },
          { name: "Black", value: "#1A1D1F" },
          { name: "Blue", value: "#194f9f" },
        ],
        sizes: ["S", "M", "L"],
        ownerPrice: 15000,
        sellerPrice: 20000,
      },
      activeIndex: 0,
      quantity: 1,
      showAskInput: false,
      newQuestion: "",
      questions: [
        {
          text: "BOYA M1 Microphone এর ব্যাটারির কোন বিকল্প রয়েছে?",
          answer: "Boya M1, Boya M1 Pro, Boya M1DM বা এধরনের মাইক্রোফোন কে ব্যাটারি ছাড়া ইউজ করার জন্য 4 Pole Female To 3 Pole Male অডিও এডাপটার নিতে হবে। এটা ২ ধরনের আছে ১ টি ক্যাবল সহ আর ১ টি ক্যাবল ছাড়া। যেকোনো ১ নিলেই হবে।",
          date: "June 5 2024",
        },
        {
          text: "BOYA BY M1 এর ব্যাটারির কোন বিকল্প রয়েছে?",
          answer: null,
          date: null,
        },
        {
          text: "কোন ধরনের মাইক্রোফোন?",
          answer: null,
          date: null,
        },
      ],
    };
  },
  created() {
    this.selectedColor = this.product.colors[0];
  },
  computed: {
    toggleDescription() {
      this.fullDescription = !this.fullDescription;
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
    this.fetchReviews();
  },
  methods: {
   openGallery() {
    if (this.$refs.galleryRef) {
      this.$refs.galleryRef.openGallery(0); // Opens gallery at first image
    } else {
      console.warn("LightGallery not initialized");
    }
  },
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
    async fetchReviews() {
      try {
        this.loadingReviews = true;
        const response = await this.$axios.get("http://localhost:3000/reviews");
        this.reviews = response.data;
      } catch (error) {
        console.log("Failed to load reviews: ");
      } finally {
        this.loadingReviews = false;
      }
    },
    toggleAskInput() {
      this.showAskInput = !this.showAskInput;
    },
    submitQuestion() {
      if (this.newQuestion.trim() === "") return;
      this.questions.push({
        text: this.newQuestion,
        answer: null,
        date: null,
      });
      this.newQuestion = "";
      this.showAskInput = false;
    },
  },
};
</script>

