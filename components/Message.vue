<template>
  <div>
    <div v-if="message.name === 'system'" class="message-system">
      {{ message.text }}
    </div>
    <div v-else class="message" :class="{current: message.userId === user.id}">
      <strong>{{ message.name }}</strong>
      <p>{{ message.text }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Message',
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>
