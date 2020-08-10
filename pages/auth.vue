<template>
  <v-card class="elevation-12">
    <v-toolbar
      color="primary"
      dark
      flat
    >
      <v-toolbar-title>Введите имя</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form @submit.prevent="auth">
        <v-text-field
          v-model="user.name"
          label="Имя"
          prepend-icon="mdi-account"
          type="text"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="primary" @click="auth">
        Войти
      </v-btn>
    </v-card-actions>
    <v-snackbar v-model="error" color="error" top centered>
      <template #default>
        <div style="text-align: center; font-weight:bold;">
          {{ errorText }}
        </div>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'AuthPage',
  layout: 'auth',
  data: () => ({
    user: {
      name: ''
    },
    error: false,
    errorText: ''
  }),
  methods: {
    ...mapMutations(['setUser']),
    auth () {
      this.$socket.emit('userJoin', this.user, (data) => {
        if (typeof data === 'string') {
          this.error = true
          this.errorText = data
        } else {
          this.user.id = data.userId
          this.setUser(this.user)
          this.$router.push('/')
        }
      })
    }
  }
}
</script>
