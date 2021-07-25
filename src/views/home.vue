<template>
  <div>
    <create class="userForm" v-if="isCreate" />
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
      <v-list-item v-for="(item, i) in listData.data" :key="`item-${i}`">
        <v-list-item-avatar @click="getUser(item.id)">
          <v-img :src="item.avatar"></v-img>
        </v-list-item-avatar>

        <v-list-item-content @click="getUser(item.id)">
          <v-list-item-title
            >{{ item.firstName }} {{ item.lastName }}</v-list-item-title
          >
          <v-list-item-subtitle>{{ item.email }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-btn @click="updateUser(item)" icon>
          <v-icon>mdi-pencil-outline</v-icon>
        </v-btn>
        <v-btn @click="deleteUser" icon>
          <v-icon> mdi-delete-empty-outline</v-icon>
        </v-btn>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import router from '@/router';
import create from '../components/user/create.vue';

export default {
  components: { create },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      listData: (state) => state.user.listData,
      user: (state) => state.user.user,
      isCreate: (state) => state.create.isCreate,
      isUpdate: (state) => state.update.isUpdate,
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
    createUser() {
      this._setIsCreate(true);
    },
    updateUser(item) {
      this._setUser(item);
    },
    deleteUser() {
      this._setIsDelete(true);
    },
    ...mapMutations({
      _setUser: 'user/setUser',
      _setIsCreate: 'create/setIsCreate',
      _setIsDelete: 'delete/setIsDelete',
    }),
    ...mapActions({
      _getList: 'user/getList',
      _getUser: 'user/getUser',
    }),
  },
};
</script>
