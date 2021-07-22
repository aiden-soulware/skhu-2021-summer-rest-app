<template>
  <div>
    <create class="create" v-if="isCreate" />
    <div>
      <v-row>
        <v-col>
          <span class="title">
            home
          </span>
          <v-btn @click="getList">load user</v-btn>
          <v-btn @click="createUser">create user</v-btn>
        </v-col>
      </v-row>
    </div>
    <v-list class="userList" v-if="listData && listData.data" three-line>
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
            >{{ item.firstName }} {{ item.lastName }}</v-list-item-title
          >
          <v-list-item-subtitle>{{ item.email }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import router from '@/router';
import create from '../components/create.vue';

export default {
  components: { create },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      listData: (state) => state.user.listData,
      userInfo: (state) => state.user.info,
      isCreate: (state) => state.create.isCreate,
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
      this._getUserInfo(id)
        .then(() => {
          router.push({ name: 'User', params: { id: this.userInfo.id } });
        })
        .catch(() => {
          this.$alert.fail('user load failed.');
        });
    },
    createUser() {
      this._setIsCreate(true);
    },
    ...mapMutations({
      _setIsCreate: 'create/setIsCreate',
    }),
    ...mapActions({
      _getList: 'user/getList',
      _getUserInfo: 'user/getInfo',
    }),
  },
};
</script>
