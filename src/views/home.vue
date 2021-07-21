<template>
  <div>
    <v-row>
      <v-col>
        <span class="title">
          home
        </span>
        <v-btn @click="getList">load user</v-btn>
        <v-btn @click="createUser({ first_name: 'hi' })">create user</v-btn>
      </v-col>
    </v-row>
    <v-list v-if="listData && listData.data" three-line>
      <v-list-item
        v-for="(item, i) in listData.data"
        :key="`item-${i}`"
        @click="getUser(item.id)"
      >
        <v-list-item-avatar>
          <v-img :src="item.avatar"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title
            >{{ item.first_name }} {{ item.last_name }}</v-list-item-title
          >
          <v-list-item-subtitle>{{ item.email }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import router from '@/router';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      listData: (state) => state.users.listData,
      user: (state) => state.users.user.data,
    }),
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      console.log('home init...');
    },
    getList() {
      this.$alert.popupWithCancel('load', 'load?', () => {
        this._getList()
          .then(() => {
            this.$alert.success('load success.');
          })
          .catch(() => {
            this.$alert.fail('load failed.');
          });
      });
    },
    getUser(id) {
      this._getUser(id)
        .then(() => {
          router.push({ name: 'User', params: { id: this.user.id } });
        })
        .catch(() => {
          this.$alert.fail('user load failed.');
        });
    },
    createUser(item) {
      this._createUser(item)
        .then(() => {})
        .catch(() => {
          this.$alert.fail('user load failed.');
        });
    },
    ...mapActions({
      _getList: 'users/getList',
      _getUser: 'users/getUser',
      _createUser: 'users/createUser',
    }),
  },
};
</script>
