<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card>
        <div>
          <v-card-title>Create new user</v-card-title>
          <v-card-subtitle>type the following informations</v-card-subtitle>
        </div>
        <v-card-text>
          <v-text-field
            ref="firstName"
            v-model="user.firstName"
            :rules="[() => !!user.firstName, firstNameCheck]"
            :error-messages="msg.error.firstName"
            :success-messages="msg.success.firstName"
            label="First Name"
            placeholder="Chanbin"
            required
          ></v-text-field>
          <v-text-field
            ref="lastName"
            v-model="user.lastName"
            :rules="[() => !!user.lastName, lastNameCheck]"
            :error-messages="msg.error.lastName"
            :success-messages="msg.success.lastName"
            label="Last Name"
            placeholder="Lee"
            required
          ></v-text-field>
          <v-text-field
            ref="email"
            v-model="user.email"
            :rules="[() => !!user.email, emailCheck]"
            :error-messages="msg.error.email"
            :success-messages="msg.success.email"
            label="E-mail"
            placeholder="nyamnyam0325@naver.com"
            required
          ></v-text-field>
        </v-card-text>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
          <v-btn class="dialog-header-close" @click="close" text>
            Cancel
          </v-btn>
          <v-spacer></v-spacer>
          <v-slide-x-reverse-transition>
            <v-tooltip left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  class="my-0"
                  v-bind="attrs"
                  @click="refresh"
                  v-on="on"
                >
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
              </template>
              <span>Refresh form</span>
            </v-tooltip>
          </v-slide-x-reverse-transition>
          <v-btn :disabled="!isValidated" color="primary" text @click="submit">
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      user: (state) => state.create.user,
      msg: (state) => state.create.msg,

      iscreate: (state) => state.create.iscreate,
      isValidated: (state) => state.create.isValidated,
    }),
  },

  methods: {
    refresh() {
      this._refresh();
    },
    firstNameCheck() {
      this._validation('firstName');
      return true;
    },
    lastNameCheck() {
      this._validation('lastName');
      return true;
    },
    emailCheck() {
      this._validation('email');
      return true;
    },
    submit() {
      this._submit();
      this._initialize();
    },

    close() {
      this._initialize();
    },

    ...mapMutations({
      _setUser: 'create/setUser',
      _setIsCreate: 'create/setIsCreate',
      _initialize: 'create/initialize',
      _refresh: 'create/refresh',
      _submit: 'create/submit',
    }),
    ...mapActions({
      _validation: 'create/validation',
    }),
  },
};
</script>
