<template>
  <div class="row">
    <div class="col-8">
      <div class="profile-rewards mb-4">
        <img alt="" src="@/assets/images/trophy.png" />
        <div class="d-flex align-items-center">
          <span class="ml-auto"><i class="icon-star"></i> 6532 Points</span>
        </div>
        <div class="reward-level">
          <h2 class="">Diamond</h2>
          <el-progress :percentage="50">
            <el-button text></el-button>
          </el-progress>
          <p>Using available points will not affect the level progression</p>
          <router-link class="btn" :to="{ name: 'rewards' }"> 🏆 My Rewards </router-link>
        </div>
      </div>
      <div class="personal-info card mb-4 p-3">
        <div class="row">
          <div class="col-6 mb-3">
            <label class="form-label">Total Balance</label>
            <div class="form-control form-control-plaintext text-success"><i class="icon-taka"></i> 2323544</div>
          </div>
          <div class="col-6 mb-3">
            <label class="form-label">Pending earnings</label>
            <div class="form-control form-control-plaintext text-danger"><i class="icon-taka"></i> 2323</div>
          </div>
          <div class="col-6">
            <label class="form-label">Withdrawn</label>
            <div class="form-control form-control-plaintext text-warning"><i class="icon-taka"></i> 5000</div>
          </div>
          <div class="col-6">
            <label class="form-label">Reward Point </label>
            <div class="form-control form-control-plaintext text-success"><i class="icon-bookmark"></i> 302324</div>
          </div>
        </div>
      </div>
      <form @submit.prevent="submitForm">
        <div class="personal-info card mb-4 p-3">
          <div class="d-flex align-items-center mb-3">
            <h3><i class="icon-user mr-2"></i> Your Personal Information</h3>
            <button @click="editPrimaryInfo" class="btn btn-outline ml-auto" type="button"><i class="icon-edit"></i> Edit</button>
          </div>
          <div class="form-group">
            <label class="form-label">Full Name</label>
            <input :class="isEditPrimary ? 'form-control' : 'form-control-plaintext'" :readonly="!isEditPrimary" type="text" id="full-name" v-model="formData.personalInfo.fullName" />
          </div>
          <div class="row">
            <div class="col-6">
              <div class="form-group">
                <label class="form-label">E-mail</label>
                <input :class="isEditPrimary ? 'form-control' : 'form-control-plaintext'" :readonly="!isEditPrimary" type="email" id="email" v-model="formData.personalInfo.email" />
              </div>
            </div>
            <div class="col-6">
              <div class="form-group">
                <label class="form-label">Phone Number</label>
                <input :class="isEditPrimary ? 'form-control' : 'form-control-plaintext'" :readonly="!isEditPrimary" type="text" id="phone" v-model="formData.phoneNumber" />
              </div>
            </div>
          </div>
          <el-collapse class="form-group" v-model="activeNames">
            <el-collapse-item title="Change Password" name="1">
              <div class="form-group mt-3">
                <label class="form-label">Old Password</label>
                <div class="password">
                  <input v-model="formData.personalInfo.showOldPassword" class="form-control" :type="showOldPassword ? 'text' : 'password'" />
                  <span class="password-toggle" @click="toggleOldPassword">
                    <i :class="{ 'icon-eye-off': showOldPassword, 'icon-eye': !showOldPassword }"></i>
                  </span>
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Password</label>
                <div class="password">
                  <input v-model="formData.personalInfo.password" class="form-control" :type="showPassword ? 'text' : 'password'" />
                  <span class="password-toggle" @click="togglePassword">
                    <i :class="{ 'icon-eye-off': showPassword, 'icon-eye': !showPassword }"></i>
                  </span>
                </div>
                <small>Requires a minimum of 8 characters.</small>
              </div>
              <div class="form-group m-0">
                <label class="form-label">Confirm Password</label>
                <div class="password">
                  <input v-model="formData.personalInfo.confirmPassword" class="form-control" :type="showConfPwd ? 'text' : 'password'" />
                  <span class="password-toggle" @click="toggleConfirmPassword">
                    <i :class="{ 'icon-eye-off': showConfPwd, 'icon-eye': !showConfPwd }"></i>
                  </span>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>

        <div class="shop-info card p-3 mb-4">
          <div class="d-flex align-items-center mb-3">
            <h3><i class="icon-shop mr-2"></i> Your Shop Information</h3>
            <button @click="editShopInfo" class="btn btn-outline ml-auto" type="button"><i class="icon-edit"></i> Edit</button>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="form-group">
                <label class="form-label">Your Shop Name</label>
                <input type="text" :class="isEditShop ? 'form-control' : 'form-control-plaintext'" :readonly="!isEditShop" v-model="formData.shopInfo.shopName" />
              </div>
            </div>
            <div class="col-12">
              <div class="form-group">
                <label class="form-label">Shop Address</label>
                <input type="text" :class="isEditShop ? 'form-control' : 'form-control-plaintext'" :readonly="!isEditShop" v-model="formData.shopInfo.shopAddress" />
              </div>
            </div>
            <div class="col-12">
              <div class="form-group">
                <label class="form-label">District</label>
                <select class="form-control" v-if="isEditShop" v-model="formData.shopInfo.district">
                  <option disabled value="">Select District</option>
                  <option v-for="district in districts" :key="district">{{ district }}</option>
                </select>
                <input v-else type="text" class="form-control-plaintext" v-model="formData.shopInfo.district" />
              </div>
            </div>
            <div class="col-12">
              <div class="form-group">
                <label class="form-label">Website</label>
                <input type="url" :class="isEditShop ? 'form-control' : 'form-control-plaintext'" :readonly="!isEditShop" v-model="formData.shopInfo.website" placeholder="https://" />
              </div>
            </div>
            <div class="col-12">
              <div class="form-group">
                <label class="checkbox">
                  <input type="checkbox" v-model="formData.shopInfo.shopInvoice" />
                  <span class="checkmark"></span> I want to use my logo in my invoice
                </label>
              </div>
            </div>
            <div class="col-12">
              <div class="form-group">
                <label class="form-label">Trade License No</label>
                <input type="url" :class="isEditShop ? 'form-control' : 'form-control-plaintext'" :readonly="!isEditShop" v-model="formData.shopInfo.licenseNo" />
              </div>
            </div>
            <div class="col-12">
              <div class="form-group">
                <label class="form-label">Expired Date</label>
                <input type="url" :class="isEditShop ? 'form-control' : 'form-control-plaintext'" :readonly="!isEditShop" v-model="formData.shopInfo.expired" />
                <el-tag type="danger">Expired update soon</el-tag>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Upload your Company Logo</label>
            <label class="upload">
              <input class="upload-input" title="" type="file" value="" />
              <div class="text-center">
                <img alt="" class="mx-auto" src="@/assets/images/upload.png" />
                <h4 class="my-1">Browse your image here</h4>
                <p class="text-muted m-0">Support: jpeg, png</p>
              </div>
            </label>
          </div>
          
          <div class="form-group m-0">
            <label class="form-label">Upload your valid trade licence</label>
            <label class="upload">
              <input class="upload-input" title="" type="file" value="" />
              <div class="text-center">
                <img alt="" class="mx-auto" src="@/assets/images/upload.png" />
                <h4 class="my-1">Browse your image here</h4>
                <p class="text-muted m-0">Support: jpeg, png</p>
              </div>
            </label>
          </div>
        </div>

        <button class="btn" type="submit">Update</button>
      </form>
    </div>
    <div class="col-4 sticky">
      <div class="leaderboard">
        <div class="leaderboard__header">
          <img class="gift" src="@/assets/images/gift.png" alt="gift" />
          <div class="leaderboard__avatar">231</div>
          <div class="leaderboard__position-title">Your Position</div>
          <div class="leaderboard__position-number"></div>
          <div class="leaderboard__description"><span class="leaderboard__highlight">3402</span> more points to reach the top 10</div>
          <button class="leaderboard__calculate">Calculate Point</button>
        </div>

        <table class="leaderboard__table">
          <tbody>
            <tr class="leaderboard__row">
              <td class="leaderboard__rank"><img src="@/assets/images/trophy.png" alt="trophy" /></td>
              <td class="leaderboard__name">
                <h4>Mr. Kazi Zaman <span>Diamond</span></h4>
              </td>
              <td class="leaderboard__icon"><i class="icon-medal-fill"></i></td>
              <td class="leaderboard__score"><strong>7342342</strong></td>
            </tr>
            <tr class="leaderboard__row">
              <td class="leaderboard__rank">2</td>
              <td class="leaderboard__name">
                <h4>Mr. Jewel <span>Platinum</span></h4>
              </td>
              <td class="leaderboard__icon"><i class="icon-medal-fill"></i></td>
              <td class="leaderboard__score"><strong>7342342</strong></td>
            </tr>
            <tr class="leaderboard__row">
              <td class="leaderboard__rank">3</td>
              <td class="leaderboard__name">
                <h4>Rahat Zamil <span>Diamond</span></h4>
              </td>
              <td class="leaderboard__icon"><i class="icon-medal-fill"></i></td>
              <td class="leaderboard__score"><strong>7342342</strong></td>
            </tr>
            <tr class="leaderboard__row">
              <td class="leaderboard__rank">4</td>
              <td class="leaderboard__name">
                <h4>Rafiqul Islam <span>Silver</span></h4>
              </td>
              <td class="leaderboard__icon"><i class="icon-medal-fill"></i></td>
              <td class="leaderboard__score"><strong>7342342</strong></td>
            </tr>
            <tr class="leaderboard__row">
              <td class="leaderboard__rank">5</td>
              <td class="leaderboard__name">
                <h4>Shafiqul Islam <span>Bronze</span></h4>
              </td>
              <td class="leaderboard__icon"><i class="icon-medal-fill"></i></td>
              <td class="leaderboard__score"><strong>7342342</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isEditPrimary: false,
      isEditShop: false,
      showOldPassword: false,
      showPassword: false,
      showConfPwd: false,
      formData: {
        phoneNumber: "01964037334",
        personalInfo: {
          fullName: "Mr. Kazi Zaman",
          email: "zaman.kazi1989@gmail.com",
        },
        shopInfo: {
          shopName: "Zaman Store",
          shopAddress: "13/15, Road 4/A, Block - B, Nobodoy Housing Society",
          district: "Dhaka",
          website: "https://www.blaze-computer.com",
          shopInvoice: false,
          licenseNo: "4343642",
          expired: "26 Jun 2027",
        },
      },
      districts: ["Comilla", "Faridpur", "Savar"], 
    };
  },
  computed: {
    editPrimaryInfo() {
      this.isEditPrimary = !this.isEditPrimary;
    },
    editShopInfo() {
      this.isEditShop = !this.isEditShop;
    },
  },
  methods: {
    toggleOldPassword() {
      this.showOldPassword = !this.showOldPassword;
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    toggleConfirmPassword() {
      this.showConfPwd = !this.showConfPwd;
    },

    async submitForm() {
      try {
        const payload = {
          phoneNumber: this.formData.phoneNumber,
          personalInfo: this.formData.personalInfo,
          shopInfo: this.formData.shopInfo,
        };

        const response = await this.$axios.post("http://localhost:3000/sellers", payload);

        console.log("Seller created:", response.data);
        this.formData = { ...this.$options.data().formData };
        const token = response.data.email;
        localStorage.setItem("sellerToken", token);
        this.$router.push({ name: "dashboard" });
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
    changePassword() {},

    includeLogoInInvoice() {},
  },
};
</script>

<style scoped>
.form-label {
  font-weight: 500;
}
.form-group {
  margin-bottom: 1.5rem;
}
.el-collapse {
  border: 1.5px solid rgba(111, 118, 126, 0.4);
  padding: 1rem;
  border-radius: 0.375rem;
}
</style>
