<template>
  <v-app>
    <v-app-bar app flat>
      <v-app-bar-nav-icon @click.stop="openMenu = !openMenu" />
      <div>
        <v-toolbar-title>
          rest-api
        </v-toolbar-title>
      </div>
    </v-app-bar>
    <sw-drawer v-model="openMenu" />

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
      <v-snackbar v-model="snackbar.open" :color="snackbar.color" class="toast-cover" content-class="toast-content" :multi-line="true" :timeout="5000">
        {{ snackbar.text }}
      </v-snackbar>
      <template v-for="(item, i) in popups">
        <v-dialog :persistent="item.opt.persistent" v-model="item._open" content-class="basics-dialog" :key="`popup-${i}`" style="overflow-x: hidden;">
          <sw-dialog v-if="item._open" :inputData="item" @close="_closePopup('close', item)" @cancel="_closePopup('cancel', item)" @ok="_closePopup('ok', item)" />

        </v-dialog>
      </template>
    </v-main>
  </v-app>
</template>

<script>
import SwDrawer from "@/components/drawer";
import SwDialog from "@/components/dialog";
import { EventBus } from "@/event-bus";

export default {
  components: {
    SwDrawer,
    SwDialog,
  },
  data() {
    return {
      snackbar: {
        open: false,
        color: "",
        text: "",
      },
      popups: [],
      openMenu: false,
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      console.log("app init...")

      EventBus.$on("alert:success", message => this.snackbar = { open: true, color: "primary", text: message });
      EventBus.$on("alert:fail", message => this.snackbar = { open: true, color: "error", text: message });
      EventBus.$on("dialog:open", data => {
        this.popups.push(Object.assign(data, { _open: true, _id: this._generateId(8) }))
      });
    },

    _generateId(length) {
      var result = '';
      var characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    },
    _closePopup(type, item) {
      if (!item.opt.persistent) {
        item._open = false;
      }
      if (type == 'ok' && item.ok) {
        item.ok();
      }
      if (type == 'cancel' && item.cancel) {
        item.cancel();
      }
      const idx = this.popups.findIndex(v => v._id == item._id);
      if (idx > -1 && !item.opt.persistent) this.popups.splice(idx, 1);
    },
  }
}
</script>
