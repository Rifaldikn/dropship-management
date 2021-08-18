<template>
  <v-container class="pa-5">
    <v-card class="pa-5" flat rounded="lg">
      <v-row class="d-flex justify-center text-center">
        <v-col cols="12">
          <v-avatar size="100" color="secondary">
            <v-img> </v-img>
          </v-avatar>
        </v-col>
        <v-card-title class="primary--text font-weight-bold pa-0">
          Calica Store
        </v-card-title>
        <v-card-text class="grey--text text--darken-1">
          Location: Jakarta
        </v-card-text>
      </v-row>
    </v-card>

    <v-card class="pa-5 my-3" flat rounded="lg">
      <v-row no-gutters>
        <v-col>
          <v-card-text class="px-0"> Store Link </v-card-text>
          <v-card
            class="d-flex pa-1 align-center rounded-lg"
            flat
            outlined
            tile
          >
            <v-text-field
              hide-details
              solo
              filled
              background-color="#F7F7FC"
              flat
              dense
              readonly
              label="dwadaw"
            >
            </v-text-field>
            <v-btn color="grey" x-small class="elevation-0 ma-2" icon>
              <v-icon>mdi-clipboard-multiple-outline</v-icon>
            </v-btn>
          </v-card>
          <v-btn
            color="primary"
            block
            class="text-capitalize rounded-lg elevation-0 my-2"
            tile
            small
            >Insert Store Link</v-btn
          >
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<style scoped>
.v-text-field--outlined >>> fieldset {
  border-color: #b9bcff;
}
</style>