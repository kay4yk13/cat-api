<template>
  <v-container class="grey lighten-5">
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
        </v-btn></span>
    </v-alert>

    <v-col
      cols="12"
      sm="6">
      <v-row align="center">
        <v-col
          cols="12"
          sm="3">
          <v-text-field
            v-model="numberOfFacts"
            type="'integer'"
            solo
            :placeholder="$t('numOfReq')">
          </v-text-field>

          <v-slider
            v-model="numberOfFacts"
            max="20"
            min="0"
            step="1"></v-slider>
        </v-col>

        <v-col
          cols="12"
          sm="6">
          <v-btn
            :disabled="isLoading"
            @click="fetchFacts">
            {{ !isLoading ? $t('loadButton') : $t('loadButtonMsg') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
    <v-col
      cols="12"
      sm="12">
      <v-row justify="start">
        <v-btn
          color="primary"
          dark
          @click.stop="dialog = true">
          {{ $t('columnsAdj') }}
        </v-btn>
      </v-row>
    </v-col>

    <!--!!Modal headers selector-->
    <v-dialog
      v-model="dialog"
      max-width="750"
      @click:outside="dialog = false">

      <v-card>
        <v-card-title class="text-h5">
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
              <template v-slot:item.text="{ item }">
                {{ $t(`tableHeaders.${item.text}`) }}
              </template>
            </v-data-table>
          </template>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="success"
            @click.stop="applyHeadersSelect">
            {{ $t('apply') }}
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>

    <!--!!Facts table-->
    <v-data-table
      :headers="tableHeaders"
      :items="catFacts"
      @click:row="seeDetails"
      hide-default-footer
      hide-default-header
      class="elevation-1 table-row">
      <template v-slot:header="{ props: { headers } }">
        <thead>
          <th v-for="header in headers">
            {{ $t(`tableHeaders.${header.text}`) }}
          </th>
        </thead>
      </template>
    </v-data-table>

  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'CatFactsTable',

  data() {
    return {
      isLoading: false,
      dialog: false,
      showAlert: false,
      numberOfFacts: 5,
      selectedHeaders: [],
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
      return this.savedCollectionOfSelectedHeaders ? this.savedCollectionOfSelectedHeaders : this.allHeaders
    },
    allHeaders() {
      return this.$store.getters['getHeaders']
    },
    savedCollectionOfSelectedHeaders() {
      return this.$store.getters['getSelectedHeaders']
    },
    catFacts() {
      let n: number = this.numberOfFacts
      return n ? this.$store.getters['getCatFacts'].slice(0, n) : this.$store.getters['getCatFacts']
    }
  },

  mounted() {
    this.setBackSelectedHeaders()
  },

  methods: {
    setBackSelectedHeaders() {
      if (this.savedCollectionOfSelectedHeaders) { this.selectedHeaders = this.savedCollectionOfSelectedHeaders }
    },
    fetchFacts() {
      this.isLoading = true
      this.$store.dispatch('fetchData', this.numberOfFacts)
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
      this.dialog = false
    },

    //TODO findout typization issue
    seeDetails(obj: any) {
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
