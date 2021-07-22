<template>
  <div>
    <v-row>
      <v-col>
        <span class="title">
          user
        </span>
        <v-btn @click="back">back</v-btn>
      </v-col>
    </v-row>

    <v-avatar>
      <v-img :src="user.avatar"></v-img>
    </v-avatar>

    <h3>{{ user.firstName }} {{ user.lastName }}</h3>
    <p>{{ user.email }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import router from '@/router';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      user: (state) => state.user.data,
    }),
  },
  methods: {
    back() {
      router.push({ name: 'Home' });
    },
  },
};
</script>
