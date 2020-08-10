<template>
  <div class="chat__text-field">
    <v-form v-model="valid" @submit.prevent="submit">
      <v-text-field v-model="text" height="70px" filled placeholder="Напишите сообщение" />
    </v-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'TextField',
  data: () => ({
    valid: false,
    text: ''
  }),
  computed: {
    ...mapState(['user'])
  },
  methods: {
    submit () {
      if (!this.text.trim()) {
        return
      }
      const data = {
        userId: this.user.id,
        name: this.user.name,
        text: this.text
      }
      this.$socket.emit('createMessage', data, () => {
        this.text = ''
      })
    }
  }
}
</script>
