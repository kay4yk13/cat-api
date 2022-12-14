<template>
  <v-container 
  class="grey lighten-5">
    
      <v-card 
      class="d-flex justify-space-between mb-12" 
      color="grey lighten-2" 
      flat 
      tile>

        <v-card 
        class="pa-4 align-self-stretch" 
        color="grey lighten-2" 
        outlined tile>
          {{ $t('numOfReq') }}:  {{ FactsQty }}
          <v-slider
            v-model="FactsQty"
            max="5"
            min="1"
            step="1"
            @change="saveSelectedFactsQty"
            >
          </v-slider>
        </v-card>

        <v-card 
        class="pa-4 align-self-center align-self-stretch" 
        color="grey lighten-2" 
        outlined 
        tile>
          <v-btn
          class="pa-2 align-self-center"
            :disabled="isLoading"
            @click="fetchFacts">
            {{ !isLoading ? $t('loadButton') : $t('loadButtonMsg') }}
          </v-btn>
        </v-card>

        <v-card 
        class="pa-4 align-self-stretch" 
        color="grey lighten-2" 
        outlined 
        tile>
          <v-btn
            color="primary"
            dark
            @click.stop="openModal">
            {{ $t('columnsAdj') }}
          </v-btn>
        </v-card>

      </v-card>
      <v-alert
      :value="showAlert"
      color="pink"
      dark
      border="top"
      icon="mdi-alert"
      transition="scale-transition">
      <span>
        {{ $t('loadError') }}</span>
      <span>
        <v-btn
          @click="showAlert = false">
          {{ $t('ok') }}
        </v-btn>
      </span>
    </v-alert>

    <!--headers selector modal dialog-->
    <v-dialog
      v-model="modal"
      max-width="750"
      @click:outside="modal = false"
      >

      <v-card>
        <v-card-title 
        class="text-h5">
          {{ $t('columnsAdjHeadline') }}
        </v-card-title>
        <v-card-text>
          <template>
            <v-data-table
              v-model="selectedHeaders"
              :items="allHeaders"
              :headers="headersForModal"
              :single-select=false
              show-select
              hide-default-footer
              :items-per-page="15"
              item-key="text"
              class="elevation-1">
              <template 
              v-slot:item.text="{ item }"
              >
                {{ $t(`tableHeaders.${item.text}`) }}
              </template>
            </v-data-table>
          </template>
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="success"
            @click.stop="applyHeadersSelect">
            {{ $t('apply') }}
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>

    <!--Facts table-->
    <v-data-table
      :headers="tableHeaders"
      :items="catFacts"
      @click:row="seeDetails"
      hide-default-footer
      hide-default-header
      class="elevation-1 table-row">
      <template 
      v-slot:header="{ props: { headers } }"
      >
        <thead>
          <th 
          v-for="header in headers"
          >
            {{ $t(`tableHeaders.${header.text}`) }}
          </th>
        </thead>
      </template>
    </v-data-table>

  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

interface Fact {
    _id: string
}

export default Vue.extend({
  name: 'CatFactsTable',

  data() {
    return {
      isLoading: false,
      modal: false,
      showAlert: false,
      FactsQty: 5,
      selectedHeaders: new Array as string[],
    }
  },

  computed: {
    headersForModal() {
      return [
        { text: this.$t('modalTitle'), value: 'value' },
        { text: this.$t('title'), value: "text" }
      ]
    },
    tableHeaders(): string[] {
      return this.savedHeadersCollection.length ? this.savedHeadersCollection : this.allHeaders
    },
    allHeaders() {
      return this.$store.getters['getHeaders']
    },
    savedHeadersCollection() {
      return this.$store.getters['getSelectedHeaders']
    },
    savedFactsQty(){
      return this.$store.getters['getFactsQty']
    },
    catFacts() {
      let n: number = this.FactsQty
      return n ? this.$store.getters['getCatFactsList'].slice(0, n) : this.$store.getters['getCatFactsList']
    }
  },

  mounted() {
    this.setBackSelectedHeaders()
    this.FactsQty = this.savedFactsQty
  },

  methods: {
    setBackSelectedHeaders() {
     this.selectedHeaders  = this.tableHeaders 
    },
    openModal(){
      this.setBackSelectedHeaders()
      this.modal = true
    },
    fetchFacts() {
      this.isLoading = true
      this.$store.dispatch('fetchData', this.FactsQty)
        .then((response) => {
          this.isLoading = false
        })
        .catch((error) => {
          this.showAlert = true;
          this.isLoading = false
        })
    },
    applyHeadersSelect() {
      this.$store.dispatch('setSelectedHeaders', this.selectedHeaders)
      this.modal = false
    },
    saveSelectedFactsQty(){
      this.$store.dispatch('setFactsQty', this.FactsQty)
    },

    //TODO find out typification issue
    seeDetails(obj: Fact) {
      this.$router.push({ name: 'fun fact', params: { id: obj._id } })
    }
  },
})
</script>
<style lang="scss">
.table-row:hover {
  cursor: pointer
}
</style>
