<template>
  <v-app>
    <v-navigation-drawer
      temporary
      fixed
      v-model="sideNav">
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              <router-link to="/" tag="span" class="cursor-pointer">
                {{ siteName }}
              </router-link>
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-divider></v-divider>
      <v-list dense class="pt-0">
        <v-list-tile
          v-for="item in menuItems"
          :key="item.id"
          :to="item.link"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          v-if="userInfo.token"
          @click="logout"
        >
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Logout</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark class="teal darken-3">
      <v-toolbar-side-icon
        @click.native.stop="sideNav = !sideNav"
        class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" class="cursor-pointer">
          {{ siteName }}
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          v-for="item in menuItems"
          :key="item.id"
          :to="item.link"
        >
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn
          flat
          v-if="userInfo.token"
          @click="logout"
        >
          <v-icon left>exit_to_app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view/>
    </main>
    <v-footer class="pa-3">
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  components: {
  },
  data: () => ({
    sideNav: false,
    siteName: 'SiteName'
  }),
  computed: {
    menuItems () {
      let menuItems = [
        { id: 1, icon: 'face', title: 'Sign up', link: '/register' },
        { id: 2, icon: 'lock_open', title: 'Sign in', link: '/login' }
      ]
      if (this.userInfo.token !== null && this.userInfo.token !== '') {
        menuItems = [
          { id: 3, icon: 'add', title: 'Add ads', link: '/new' },
          { id: 4, icon: 'folder', title: 'All categories', link: '/products' }
        ]
        if (this.userInfo.role === 'admin') {
          menuItems.push({ id: 5, icon: 'person', title: 'Profile admin', link: '/admin' })
        } else {
          menuItems.push({ id: 6, icon: 'person', title: 'Profile user', link: '/profile' })
        }
      }
      return menuItems
    },
    ...mapState({
      userInfo: 'user'
    })
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
      this.$router.push('/')
    }
  }
}
</script>
