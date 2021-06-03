<template>
    <div>
      <div id="index">
        <v-app id="inspire">
          <v-app id="inspire">
            <v-navigation-drawer
              v-model="drawer"
              app
            >

              <v-list dense>
                <v-list-item link to="/dashboard">
                  <v-list-item-action>
                    <v-icon>mdi-home</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>Dashboard</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item link to="/accounts">
                  <v-list-item-action>
                    <v-icon>mdi-email</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>Accounts</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item link to="/teacher">
                  <v-list-item-action>
                    <v-icon>mdi-account-tie</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>Teachers</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item link to="/student">
                  <v-list-item-action>
                    <v-icon>mdi-account-group</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>Students</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item link to="/grade">
                  <v-list-item-action>
                    <v-icon>mdi-temperature-celsius</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>Grade</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item link to="/attendence">
                  <v-list-item-action>
                    <v-icon>mdi-archive-arrow-down</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>Attendence</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>

            </v-navigation-drawer>
            <v-app-bar
              app
              color="indigo"
              dark
            >
              <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
              <v-toolbar-title>Take Attendence</v-toolbar-title>
            </v-app-bar>
        
            <v-main>
              <v-container
                class="fill-height"
                fluid
              >
                <v-row>
                  <!-- <v-breadcrumbs :items="crumbs"></v-breadcrumbs> -->
                  <!-- <v-breadcrumbs :items="items" style="display:unset;">
                    <template v-slot:item="{ item }">
                      <v-breadcrumbs-item
                        :href="item.href"
                        :disabled="item.disabled"
                      >
                        {{ item.text.toUpperCase() }}
                      </v-breadcrumbs-item>
                    </template>
                  </v-breadcrumbs> -->
                    <v-col>
                        <router-view class="main-view" name="MainView"></router-view>
                    </v-col>
                </v-row>
              </v-container>
            </v-main>
            <v-footer
              color="indigo"
              app
            >
              <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
              <span class="white--text">: Take Attendence Students</span>
            </v-footer>
          </v-app>
        </v-app>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    source: String,
  },

  data(){
    return{
      drawer: null,
      // items: [
      //   {
      //     text: 'Dashboard',
      //     disabled: false,
      //     href: 'dashboard',
      //   },
      //   {
      //     text: 'Grade',
      //     disabled: false,
      //     href: 'grade',
      //   },
      //   {
      //     text: 'Add Grade',
      //     disabled: true,
      //     href: 'add-grade',
      //   },
      // ],
    }
  },
  // computed: {
  //   crumbs: function() {
  //     let pathArray = this.$route.path.split("/")
  //     pathArray.shift()
  //     let breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
  //       breadcrumbArray.push({
  //         path: path,
  //         to: breadcrumbArray[idx - 1]
  //           ? "/" + breadcrumbArray[idx - 1].path + "/" + path
  //           : "/" + path,
  //         text: this.$route.matched[idx].meta.breadCrumb || path,
  //       });
  //       return breadcrumbArray;
  //     }, [])
  //     return breadcrumbs;
  //   }
  // }
}
</script>