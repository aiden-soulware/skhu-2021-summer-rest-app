<template>
  <div>
    <v-row>
      <v-col>
        <span class="title">
          home
        </span>
        <v-btn @click="getList">load user</v-btn>
      </v-col>
    </v-row>
    <v-list v-if="listData  && listData.data" three-line>
      <v-list-item v-for="(item, i) in listData.data" :key="`item-${i}`">
        <v-list-item-avatar>
          <v-img :src="item.avatar"></v-img>
        </v-list-item-avatar>

         <v-list-item-content>
          <v-list-item-title>{{item.first_name}} {{item.last_name}}</v-list-item-title>
          <v-list-item-subtitle>{{item.email}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      listData: state => state.users.listData,
    }),
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      console.log("home init...")
    },
    getList() {
      this.$alert.popupWithCancel('load', 'load?', () => {
        this._getList().then(() => {
          this.$alert.success('load success.')
        })
      })
    },
    ...mapActions({
      _getList: "users/getList",
    }),
  }
}
</script>
