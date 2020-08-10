<template>
  <v-layout
    column
    fill-height
  >
    <div class="chat-wrapper py-3">
      <Message v-for="(item, index) of getMessages" :key="index" :message="item" />
      <TextField />
    </div>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import Message from '../components/Message'
import TextField from '../components/TextField'
export default {
  name: 'Index',
  components: { TextField, Message },
  middleware: ['auth'],
  sockets: {
    connect () {
      // eslint-disable-next-line no-console
      console.log('socket connected')
    }
  },
  computed: {
    ...mapGetters(['getMessages'])
  }
}
</script>
