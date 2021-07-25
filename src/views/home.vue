<template>
  <div>
    <userForm
      title="hi"
      subtitle="hello"
      v-if="isCreate"
      :setState="_setIsCreate"
      :onSubmit="onCreate"
      class="userForm"
    />
    <userForm
      title="hi"
      subtitle="hello"
      v-if="isUpdate"
      :setState="_setIsUpdate"
      :onSubmit="onUpdate"
      class="userForm"
    />
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
        <v-btn @click="deleteUser(item.id)" icon>
          <v-icon> mdi-delete-empty-outline</v-icon>
        </v-btn>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import userForm from '../components/user/form.vue';
import http from '@/utils/http';
import router from '@/router';

export default {
  components: { userForm },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
      listData: (state) => state.user.listData,
      isCreate: (state) => state.create.isCreate,
      isUpdate: (state) => state.update.isUpdate,
      errorMsg: (state) => state.image.message,
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
    updateUser(info) {
      this._setIsUpdate(true);
      this._setForm(info);
    },
    deleteUser(id) {
      return http.process('user', 'delete', { id: id }).then((res) => {
        if (res.success) this.$alert.success(res.message);
        else this.$alert.fail(res.message);
      });
    },
    onCreate(form) {
      this._onCreate(form).then((res) => {
        if (res.success) {
          this._updateAvatar(res.user);
          this.$alert.success(`user create success${this.errorMsg}.`);
        } else this.$alert.fail('user create failed.');
      });
    },
    async onUpdate(form) {
      await this._updateAvatar(form);
      if (this.errorMsg === '') {
        this.$alert.success('user update success.');
      } else this.$alert.fail('user update failed.');
    },
    ...mapMutations({
      _setIsCreate: 'create/setIsCreate',
      _setIsUpdate: 'update/setIsUpdate',
      _setForm: 'form/setUser',
      _updateAvatar: 'image/updateAvatar',
    }),
    ...mapActions({
      _getList: 'user/getList',
      _getUser: 'user/getUser',
      _onCreate: 'create/onCreate',
    }),
  },
};
</script>
