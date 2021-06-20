<template>
  <div id="app">
    <div class="main-container">
      <div class="sub-main-container">
        <div class="header-section">
          <h1>
            There's
            <div class="number">{{ numberWithCommas(sumComfirmed) }}</div>
            confirmed cases of Coronavirus around the world today 
            
          </h1>
          <div class="header-section">
          <h1>
            There's
            <div class="number">{{  numberWithCommas(sumDeath)  }}</div>
            death cases of Coronavirus around the world today 
            
          </h1>
          </div>
          <div class="header-section">
          <h1>
            There's
            <div class="number">{{ numberWithCommas(sumRecover) }}</div>
            recover cases of Coronavirus around the world today 
            
          </h1>
          </div>
          
        </div>
        <div class="world-map-chart">
          <!-- <WorldChart /> -->
        </div>
      </div>
      <div class="sub-main-container">
        <div class="german-container">
          <div class="header-section-title">
            To date, German has vaccinated
            <div class="number">
              {{ numberWithCommas(dataGerman["people_vaccinated"]) }}
            </div>
            people.
          </div>
          <div>
            That's the amount of people that have received all jabs required to
            be immune. In total, the vaccine has been administered
            <b>{{
              numberWithCommas(dataGerman["people_partially_vaccinated"])
            }}</b>
            times.
          </div>
          <div>
            According to the OECD, {{ dataGerman["capital_city"] }} has life
            expectancy about {{ dataGerman["life_expectancy"] }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Api } from "./components/api/index";

// import WorldChart from "./components/chart/worldChart.vue";

const vaccine = Api.get("vaccine");
const getCase = Api.get("getCase");

export default {
  name: "App",
  components: {
    // WorldChart,
  },
  data() {
    return {
      dataGerman: [],
      dataWorld: new Array(),
      sumComfirmed: 0,
      sumRecover: 0,
      sumDeath: 0,
    };
  },
  mounted() {
    this.fetchDataGerman();
    this.fetchDataWorld();
  },
  methods: {
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    fetchDataGerman() {
      vaccine.get("").then((response) => {
        this.dataGerman = response.data["Germany"]["All"];
        this.dataWorld = response.data;
      });
    },
    fetchDataWorld() {
      getCase.get().then((response) => {
        console.log(response.data)
        this.dataWorld = response.data;
        delete this.dataWorld['Global'];
        var self = this;
        Object.keys(this.dataWorld).map(function(key) {

          
          (self.sumComfirmed += response.data[key]["All"]["confirmed"]),
            (self.sumRecover += response.data[key]["All"]["recovered"]),
            self.sumDeath += response.data[key]['All']['deaths']
        });
      });
    },
  },
};
</script>

<style>
.main-container {
  padding: 50px;
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-direction: column;
}

.main-container .sub-main-container:nth-child(2n) {
  background-color: #f3f3f3;
}

.main-container .sub-main-container .header-section > h1,
.header-section-title {
  margin-bottom: 0.5rem;
  word-break: break-word;
  max-width: 100% !important;
  color: #4a4a4a;
  display: flex;
}

.main-container .sub-main-container .header-section {
  display: flex;
  justify-content: center;
      flex-direction: column;
}

.main-container .sub-main-container .header-section > h1 {
  display: flex;
  justify-content: center;
}

.main-container .sub-main-container .header-section > h1 .case-title {
  color: #eb4647;
}

.main-container .sub-main-container .german-container {
  padding: 50px;
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.main-container .sub-main-container .german-container .header-section-title {
  color: #4a4a4a;
  font-size: 36px;
}

.main-container .sub-main-container .german-container > div {
  font-size: 20px;
}

.number {
  margin: 0 10px;
  color: #246eb9;
}
</style>
