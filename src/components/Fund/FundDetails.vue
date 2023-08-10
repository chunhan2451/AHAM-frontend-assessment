<template>
  <div class="fund-container">
    <div class="back-container">
      <router-link to="/fund" class="fund-link"> Back </router-link>
    </div>
  </div>
  <div class="fund-container">
    <div class="fund-detail-item" v-if="fund">
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
      <div class="performance-chart">
        <canvas :id="'chart-' + fund.id" width="200" height="100"></canvas>
      </div>
    </div>
  </div>
  <div class="fund-container">
    <button
      type="submit"
      class="submit-button"
      v-if="!isInvest"
      @click="isInvest = !isInvest"
    >
      Invest Now
    </button>
    <div class="invest-fund-details" v-if="isInvest">
      <form @submit.prevent="submitInvestment" class="investment-form">
        <label for="investmentAmount">
          Investment Amount in {{ fund.navCurrency }}:
        </label>
        <input
          id="investmentAmount"
          type="number"
          v-model="investment.investmentAmount"
          class="input-field"
        />
        <label for="numberOfUnits">Number of Units:</label>
        <input
          id="numberOfUnits"
          type="number"
          v-model="investment.numberOfUnits"
          class="input-field"
        />
        <br />
        <label>
          {{ fund.navCurrency }}
          {{
            investment.investmentAmount && investment.numberOfUnits
              ? investment.investmentAmount * investment.numberOfUnits
              : 0
          }}
        </label>
        <button type="submit" class="submit-button">Invest</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Chart } from "chart.js/auto";
import { investInFund } from "../../mockAPI";
import "./fund.css";

export default {
  data() {
    return {
      fund: null,
      isInvest: false,
      investment: {
        fund: null,
        investmentAmount: 0,
        numberOfUnits: 0,
      },
    };
  },
  created() {
    this.fetchFundData();
  },
  methods: {
    fetchFundData() {
      const fundId = this.$route.params.id;
      axios.get(`http://localhost:3000/funds/${fundId}`).then((response) => {
        this.fund = response.data;
        this.$nextTick(() => {
          this.initializeChart();
        });
      });
    },
    initializeChart() {
      if (this.fund && this.fund.historicalPerformance) {
        const ctx = document
          .getElementById("chart-" + this.fund.id)
          .getContext("2d");
        new Chart(ctx, {
          type: "line",
          data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], // Sample labels
            datasets: [
              {
                label: "Performance",
                data: this.fund.historicalPerformance, // Use actual historical data here
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
          },
        });
      }
    },
    async submitInvestment() {
      if (!this.investment.investmentAmount || !this.investment.numberOfUnits) {
        alert(
          "Investment Amount or Number of Units is invalid. Please try again."
        );
        return;
      }

      const totalInvestmentValue =
        this.investment.investmentAmount * this.investment.numberOfUnits;
      try {
        await investInFund(
          this.$route.params.id,
          this.investment.investmentAmount,
          this.investment.numberOfUnits
        );

        // Provide feedback to the user about the successful investment
        alert(`Investment of $${totalInvestmentValue} successful!`);

        // Clear input fields and reset
        this.investment = {
          fund: null,
          investmentAmount: 0,
          numberOfUnits: 0,
        };
        this.isInvest = false;
      } catch (error) {
        // Handle errors if necessary
        alert("Investment failed. Please try again.");
      }
    },
  },
};
</script>
