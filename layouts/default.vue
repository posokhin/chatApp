<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list subheader>
        <v-subheader>Пользователи в сети</v-subheader>
        <v-list-item
          v-for="(item, index) of users"
          :key="index"
          @click.prevent=""
        >
          <v-list-item-content>
            <v-list-item-title v-text="item.name" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn color="primary" small @click="exit">
        Выйти
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container style="height: 100%;">
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data: () => ({
    drawer: true,
    title: 'Чат'
  }),
  computed: {
    ...mapState(['user', 'users'])
  },
  methods: {
    ...mapMutations(['clearData']),
    exit () {
      this.$socket.emit('userExit', this.user.id, () => {
        this.$router.push('/auth')
        this.clearData()
      })
    }
  }
}
</script>
