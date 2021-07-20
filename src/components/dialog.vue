<template>
  <v-card :class="{'close-header-content' : opt.showClose}">
    <!-- close btn -->
    <v-card-title v-if="opt.showClose" v- class="dialog-header-close">
      <v-btn icon dark @click="$emit('close')" class="btn-close-black">
        <em></em>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <h1 v-if="title">{{title}}</h1>
      <p v-if="message" v-html="message"></p>
    </v-card-text>
    <v-card-actions v-if="!opt.noActionButtons">
      <v-row class="ma-0">
        <v-col v-if="!opt.noCancel" class="pa-0 border-right-1">
          <v-btn class="text-red" block text @click="$emit('cancel')">
            {{opt.cancelText}}
          </v-btn>
        </v-col>
        <v-col class="pa-0">
          <v-btn block text class="text-azure" @click="$emit('ok')">
            {{opt.okText}}
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>

export default {
  props: {
    inputData: {
      type: Object,
    },
  },
  data() {
    return {
      title: null,
      message: null,
      opt: {
        showClose : false,
        noCancel: false,
        noActionButtons : false,
        cancelText: '취소', //'Cancel',
        okText: '확인', // 'Ok'
        persistent: false,
      },
    }
  },
  watch: {
    // props가 변경되었을때,
    inputData: {
      immediate: true,
      handler() {
        this.title = this.inputData.title
        this.message = this.inputData.message

        this.opt = Object.assign(this.opt, this.inputData.opt)
      }
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style> 
