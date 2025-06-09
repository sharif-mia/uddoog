<template>
  <h1 class="page__title d-flex mt-0">My Rewards</h1>

  <div class="rewards-info mb-4">
    <div class="profile-rewards">
      <div class="d-flex align-items-center mb-3">
        <span class="ml-auto"><i class="icon-star"></i> 6532 Points</span>
      </div>
      <div class="reward-level">
        <h2 class="">Diamond</h2>
        <el-progress :percentage="50">
          <el-button text></el-button>
        </el-progress>
        <p>Using available points will not affect the level progression</p>
      </div>
    </div>
    <div class="rewards-process">
      <h4>How It Works</h4>
      <ul>
        <li>Earn points for regular rewards</li>
        <li>Tap on your favourite Uddoog reward to view details</li>
        <li>Use points to claim Uddoog rewards and enjoy the benefits</li>
        <li>Keep earning points to reach a higher reward level and unlock more Uddoog rewards</li>
      </ul>
    </div>
  </div>

  <el-tabs v-model="activeName" class="demo-tabs">
    <el-tab-pane name="Earned">
      <template #label>
        <span class="custom-tabs-label">
          <span>Earned</span>
        </span>
      </template>
      <div class="mt-3" v-if="rewards.length != 0">
        <div class="card">
          <div class="transactions table-responsive-md">
            <table class="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Points</th>
                  <th>Earned by</th>
                  <th>Status</th>
                  <th class="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="reward in rewards" :key="reward.id">
                  <td>{{ formatDate(new Date(reward.date)) }}</td>
                  <td>
                    <strong class="cashAmount text-success"> <i class="icon-arrow-right cashIn" ></i>{{ reward.points }}</strong>
                  </td>
                  <td>{{ reward.action }}</td>
                  <td>
                    <span class="badge bg-success" v-if="reward.status === 'Successful'">{{ reward.status }}</span>
                    <span class="badge bg-warning" v-else-if="reward.status === 'Pending'">{{ reward.status }}</span>
                    <span class="badge bg-danger" v-else>{{ reward.status }}</span>
                  </td>
                  <td class="text-right">
                    <a class="btn-delete" @click.prevent="deleteItem(reward.id)"><i class="icon-trash"></i></a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="d-flex align-center justify-between mt-3">
          <button class="btn btn-outline">Previous</button>
          <el-pagination layout="prev, pager, next" :total="1000" />
          <button class="btn btn-outline">Next</button>
        </div>
      </div>
      <div v-else><h3>There is no Rewards</h3></div>
    </el-tab-pane>

    <el-tab-pane name="second">
      <template #label>
        <span class="custom-tabs-label">
          <span>Used</span>
        </span>
      </template>
      <div class="mt-3" v-if="rewards.length != 0">
        <div class="card">
          <div class="transactions table-responsive-md">
            <table class="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Points</th>
                  <th>Used by</th>
                  <th>Status</th>
                  <th class="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="reward in rewards" :key="reward.id">
                  <td>{{ formatDate(new Date(reward.date)) }}</td>
                  <td>
                    <strong class="cashAmount text-danger"> <i class="icon-arrow-right cashOut" ></i>{{ reward.points }}</strong>
                  </td>
                  <td>{{ reward.action }}</td>
                  <td>
                    <span class="badge bg-success" v-if="reward.status === 'Successful'">{{ reward.status }}</span>
                    <span class="badge bg-warning" v-else-if="reward.status === 'Pending'">{{ reward.status }}</span>
                    <span class="badge bg-danger" v-else>{{ reward.status }}</span>
                  </td>
                  <td class="text-right">
                    <a class="btn-delete" @click.prevent="deleteItem(reward.id)"><i class="icon-trash"></i></a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="d-flex align-center justify-between mt-3">
          <button class="btn btn-outline">Previous</button>
          <el-pagination layout="prev, pager, next" :total="1000" />
          <button class="btn btn-outline">Next</button>
        </div>
      </div>
      <div v-else><h3>There is no Rewards</h3></div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: "Rewards",
  data() {
    return {
      activeName: "Earned",
      rewards: [
        {
          id: 1,
          date: "2023-10-24T14:25:00",
          points: 2000,
          action: "Make Order",
          status: "Successful",
          type: "Earned",
        },
        {
          id: 2,
          date: "2023-10-25T09:15:00",
          points: "1500",
          action: "Top Seller",
          status: "Successful",
          type: "Used",
        },
        {
          id: 3,
          date: "2023-10-26T11:45:00",
          points: "3000",
          action: "Order Cashback",
          status: "Pending",
          type: "Earned",
        },
        {
          id: 4,
          date: "2023-10-27T16:30:00",
          points: "2500",
          action: "Social Boost",
          status: "Failed",
          type: "Used",
        },
      ],
    };
  },

  methods: {
    setTab(tab) {
      this.currentTab = tab;
    },
    formatDate(date) {
      const options = { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", hour12: false };
      const formattedDate = date.toLocaleString("en-GB", options).replace(",", ""); // Remove comma for formatting
      return formattedDate;
    },

    async deleteItem(rewardId) {},
  },
};
</script>

<style scoped>
.el-radio-button {
  margin-bottom: 0;
}
.el-progress-bar__inner {
  background-color: #1f1f1f;
  border-radius: 100px;
  height: 100%;
  left: 0;
  line-height: 1;
  position: absolute;
  text-align: right;
  top: 0;
  transition: width 0.6s ease;
  white-space: nowrap;
}
</style>
