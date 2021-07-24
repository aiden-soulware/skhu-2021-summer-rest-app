<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" md="10" lg="6">
      <v-card>
        <div>
          <v-card-title>Create new user</v-card-title>
          <v-card-subtitle>type the following informations</v-card-subtitle>
        </div>
        <v-card-text>
          <v-text-field
            ref="firstName"
            messages="maximum 20 letters"
            v-model="user.firstName"
            :rules="[() => !!user.firstName, firstNameCheck]"
            :error-messages="msg.error.firstName"
            :success-messages="msg.success.firstName"
            label="First Name"
            placeholder="Chanbin"
            prepend-icon="mdi-alpha-f-box-outline"
            required
          ></v-text-field>
          <v-text-field
            ref="lastName"
            messages="maximum 20 letters"
            v-model="user.lastName"
            :rules="[() => !!user.lastName, lastNameCheck]"
            :error-messages="msg.error.lastName"
            :success-messages="msg.success.lastName"
            label="Last Name"
            placeholder="Lee"
            prepend-icon="mdi-alpha-l-box-outline"
            required
          ></v-text-field>
          <v-text-field
            ref="email"
            messages="e-mail should be unique"
            v-model="user.email"
            :rules="[() => !!user.email, emailCheck]"
            :error-messages="msg.error.email"
            :success-messages="msg.success.email"
            label="E-mail"
            placeholder="nyamnyam0325@naver.com"
            prepend-icon="mdi-at"
            required
          ></v-text-field>

          <v-file-input
            class="fileInput"
            :value="image"
            :messages="image ? '' : 'default'"
            accept="image/*"
            label="Avatar"
            prepend-icon="mdi-camera-outline"
            @change="setImage"
          ></v-file-input>
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
          <v-btn
            :disabled="!_getIsValidated()"
            color="primary"
            text
            @click="submit"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      user: (state) => state.create.user,
      msg: (state) => state.create.msg,
      image: (state) => state.create.image,
      iscreate: (state) => state.create.iscreate,
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
      this._submit()
        .then(() => {
          this.$alert.success('user create success.');
          this._initialize();
        })
        .catch(() => {
          this.$alert.fail('user create failed.');
        });
    },

    close() {
      this._initialize();
    },
    setImage(file) {
      this._setImage(file);
    },
    ...mapGetters({
      _getIsValidated: 'create/getIsValidated',
    }),
    ...mapMutations({
      _setImage: 'create/setImage',
      _setIsCreate: 'create/setIsCreate',
      _refresh: 'create/refresh',
    }),
    ...mapActions({
      _validation: 'create/validation',
      _initialize: 'create/initialize',
      _submit: 'create/submit',
    }),
  },
};
</script>
