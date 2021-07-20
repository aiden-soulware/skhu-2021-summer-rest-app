<template>
  <v-navigation-drawer :value="value" absolute temporary>
    <v-list nav dense>
      <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
        <v-list-item > 
          <v-list-item-title>Foo</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Fizz</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Buzz</v-list-item-title>
        </v-list-item>
      
      </v-list-item-group>
    </v-list>
    
  </v-navigation-drawer>

          
      
</template>
<script>
export default {
  model: {
    prop: "value",
    event: "input",
  },
  props: {
    value: Boolean,
  },
  data() {
    return {
      group: null,
    };
  },
  watch: {
    group() {
      this.close();
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() { },
    close() {
      console.log('test');
      this.$emit("input", false);
    },

  },

};
</script>
<style lang="scss" scoped></style>
