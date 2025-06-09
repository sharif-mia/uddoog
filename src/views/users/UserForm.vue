<template>
  <div>
    <h2 class="page__title gap-3 d-flex">
      <router-link class="btn-back" :to="{ name: 'users' }">
        <i class="icon-arrow-left"></i>
      </router-link>
      {{ isEdit ? "Edit" : "Create" }} User
    </h2>
    <form @submit.prevent="submitForm">
      <div class="row">
        <div class="col-8">
          <div class="row">
            <div class="col-6">
              <div class="form-group">
                <label class="form-label">Phone Number</label>
                <input type="tel" v-model="formData.phone" class="form-control" />
              </div>
            </div>
            <div class="col-6">
              <div class="form-group">
                <label class="form-label">Name</label>
                <input type="text" id="name" v-model="formData.name" class="form-control" />
              </div>
            </div>
            <div class="col-6">
              <div class="form-group">
                <label class="form-label">Password</label>
                <div class="password">
                  <input v-model="formData.password" class="form-control" :type="showPassword ? 'text' : 'password'" />
                  <span class="password-toggle" @click="togglePassword">
                    <i :class="{ 'icon-eye-off': showPassword, 'icon-eye': !showPassword }"></i>
                  </span>
                </div>
                <small>Requires a minimum of 8 characters.</small>
              </div>
            </div>
            <div class="col-6">
              <div class="form-group">
                <label class="form-label">Confirm Password</label>
                <div class="password">
                  <input v-model="formData.confirmPassword" class="form-control" :type="showConfPwd ? 'text' : 'password'" />
                  <span class="password-toggle" @click="toggleConfirmPassword">
                    <i :class="{ 'icon-eye-off': showConfPwd, 'icon-eye': !showConfPwd }"></i>
                  </span>
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="form-group card p-3">
                <label class="permission__list-heading">Set Permission</label>
                <ul class="permission__list">
                  <!-- Category: Customer -->
                  <li>
                    <span class="permission__list-category">Customer</span>
                    <label class="checkbox">
                      <input type="checkbox" v-model="formData.permissions.customer.add" />
                      <span class="checkmark"></span> Add
                    </label>
                    <label class="checkbox">
                      <input type="checkbox" v-model="formData.permissions.customer.edit" />
                      <span class="checkmark"></span> Edit
                    </label>
                    <label class="checkbox">
                      <input type="checkbox" v-model="formData.permissions.customer.delete" />
                      <span class="checkmark"></span> Delete
                    </label>
                  </li>

                  <!-- Product -->
                  <li>
                    <span class="permission__list-category">Product</span>
                    <label class="checkbox">
                      <input type="checkbox" v-model="formData.permissions.product.add" />
                      <span class="checkmark"></span> Add
                    </label>
                    <label class="checkbox">
                      <input type="checkbox" v-model="formData.permissions.product.edit" />
                      <span class="checkmark"></span> Edit
                    </label>
                    <label class="checkbox">
                      <input type="checkbox" v-model="formData.permissions.product.delete" />
                      <span class="checkmark"></span> Delete
                    </label>
                  </li>

                  <!-- Support -->
                  <li>
                    <span class="permission__list-category">Support</span>
                    <label class="checkbox">
                      <input type="checkbox" v-model="formData.permissions.support.add" />
                      <span class="checkmark"></span> Add
                    </label>
                    <label class="checkbox">
                      <input type="checkbox" v-model="formData.permissions.support.edit" />
                      <span class="checkmark"></span> Edit
                    </label>
                    <label class="checkbox">
                      <input type="checkbox" v-model="formData.permissions.support.delete" />
                      <span class="checkmark"></span> Delete
                    </label>
                  </li>


                  <!-- Notification -->
                  <li>
                    <span class="permission__list-category">Notification</span>
                    <label class="checkbox">
                      <input type="checkbox" v-model="formData.permissions.notification.view" />
                      <span class="checkmark"></span> View
                    </label>
                    <label class="checkbox">
                      <input type="checkbox" v-model="formData.permissions.notification.delete" />
                      <span class="checkmark"></span> Delete
                    </label>
                  </li>

                  <!-- Others -->
                  <li>
                    <label class="checkbox">
                      <input type="checkbox" v-model="formData.permissions.others.warranty" />
                      <span class="checkmark"></span> Warranty
                    </label>
                    <label class="checkbox">
                      <input type="checkbox" v-model="formData.permissions.others.transaction" />
                      <span class="checkmark"></span> Transaction
                    </label>
                    <label class="checkbox">
                      <input type="checkbox" v-model="formData.permissions.others.wishList" />
                      <span class="checkmark"></span> Wish List
                    </label>
                     <label class="checkbox">
                      <input type="checkbox" v-model="formData.permissions.others.tracking" />
                      <span class="checkmark"></span> Tracking
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button type="submit" class="btn btn-primary">{{ isEdit ? "Update" : "Submit" }}</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "userForm",
  data() {
    return {
      formData: {
        name: "",
        phone: "",
        password: "",
        confirmPassword: "",

        permissions: {
          customer: { add: false, edit: false, delete: false },
          product: { add: false, edit: false, delete: false },
          support: { add: false, edit: false, delete: false },
          notification: { view: false, delete: false },
          others: {
            warranty: false,
            transaction: false,
            wishList: false,
            tracking: false,
          },
        },
      },
      showPassword: false,
      showConfPwd: false,
      isEdit: false,
    };
  },
  created() {
    this.isEdit = !!this.$route.params.id;
    if (this.isEdit) {
      this.fetchUser();
    }
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    toggleConfirmPassword() {
      this.showConfPwd = !this.showConfPwd;
    },

    async fetchUser() {
      const userId = this.$route.params.id;
      try {
        const response = await this.$axios.get(`http://localhost:3000/users/${userId}`);
        this.formData = response.data;
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Failed to fetch user data. Please try again.");
      }
    },

    async submitForm() {
      const userId = this.$route.params.id;

      try {
        const payload = {
          name: this.formData.name,
          phone: this.formData.phone,
          password: this.formData.password,
          confirmPassword: this.formData.confirmPassword,
          permissions: this.formData.permissions,
          status: false,
        };

        if (this.isEdit) {
          // Update user
          await this.$axios.put(`http://localhost:3000/users/${userId}`, payload);
        } else {
          // New user
          await this.$axios.post("http://localhost:3000/users", payload);
          this.formData = { ...this.$options.data().formData };
        }
        this.$router.push({ name: "users" });
      } catch (error) {
        console.error("Error on submitting:", error);
        alert("An error occurred. Please try again.");
      }
    },
  },
};
</script>
