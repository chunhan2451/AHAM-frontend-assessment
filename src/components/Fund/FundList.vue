<template>
  <div class="fund-container">
    <div v-for="fund in funds" :key="fund.id" class="fund-item">
      <router-link :to="'/fund/' + fund.id" class="fund-link">
        <div class="fund-header">
          <div class="fund-name">{{ fund.name }}</div>
          <div class="fund-nav">{{ fund.navCurrency }} {{ fund.nav }}</div>
        </div>
        <div class="fund-details">
          <div class="fund-description">{{ fund.description }}</div>
          <div class="fund-info">
            <div class="fund-type">{{ fund.investmentType }}</div>
            <div class="fund-performance">{{ fund.performance }}%</div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "./fund.css";

export default {
  data() {
    return {
      funds: [],
    };
  },
  created() {
    axios.get("http://localhost:3000/funds").then((response) => {
      this.funds = response.data;
    });
  },
};
</script>
