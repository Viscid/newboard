<template>
    <div id="menuBar" class="noselect"> 
      <router-link class="homeButton" :to="{ name: 'Home' }" exact>
        <span @click="setPage">
          <img height="24" width="24" class="mobile" src="../assets/icons/Home.svg" />
          <span class="screen"> Home </span>
          <div v-if="(Number(newPosts) >= 1)" class="newPostNotifier"> {{ newPosts }} </div>
        </span>
      </router-link><!--
      --><router-link class="composeLink" v-show="isLoggedIn" :to="{ name: 'Compose' }"  exact>
        <img height="24" width="24" class="mobile" src="../assets/icons/Compose.svg" />
        <span class="screen"> Compose </span>
      </router-link><!--
      --><router-link v-show="!isLoggedIn" :to="{ name: 'Login' }"  exact> Login </router-link><!--
      --><router-link v-show="!isLoggedIn" :to="{ name: 'Registration' }"  exact> Register </router-link><!--
      --><router-link v-show="isLoggedIn" :to="{ name: 'Search' }"  exact>
        <img height="24" width="24" class="mobile" src="../assets/icons/Search.svg" />
        <span class="screen"> Search </span>
      </router-link><!--
      --><router-link v-show="(isLoggedIn && isAdmin)" :to="{ name: 'AdminPanel' }"  exact> Admin </router-link><!--
      --><a v-if="username" @click="showModal" class="userMenuLink" v-show="isLoggedIn">
        <img height="24" width="24" class="mobile" src="../assets/icons/Profile.svg" />
        <span class="screen"> {{ username }} </span>
      </a>
      <modal :height="250" :width="300" :adaptive="true" name="userModal">
        <div class="modalContent">
          <h3> {{ username }} </h3>
          <ul class="userMenuList">
            <li class="userMenuListItem"> <router-link :to="{ name: 'UserProfile', params: { username }}"> <a  @click="closeModal"> My Profile </a> </router-link> </li>
            <li class="userMenuListItem"> <a @click="logout"> Sign Out </a> </li>
            <li class="userMenuListItem"> <router-link :to="{ name: 'Settings' }"> <a @click="closeModal"> Interface Settings </a> </router-link> </li>
          </ul>
        </div>
      </modal>
    </div>
</template>

<script>
export default {
  props: ['newPosts'],
  computed: {
    username () {
      return this.$store.state.user.username
    },
    isFetching () {
      return this.$store.state.fetching
    },
    isLoggedIn () {
      return 'username' in this.$store.state.user
    },
    isAdmin () {
      return (this.$store.state.user['role'] === 'admin')
    }
  },
  methods: {
    closeModal () {
      this.$modal.hide('userModal')
    },
    logout () {
      this.$router.push('/')
      this.$store.dispatch('logout').then(() => {
        this.$modal.hide('userModal')
      })
    },
    showModal () {
      this.$modal.show('userModal')
    },
    setPage () {
      this.$store.dispatch('setPage', 1)
    },
    getNewPosts () {
      this.$store.dispatch('getNewPosts')
    }
  }
}
</script>

<style scoped>
.homeButton {
  position: relative;
  display: inline-block;
  height: 24px;
}

.newPostNotifier {
  position: absolute;
  right: -5px;
  top: 5px;
  background-color: rgba(255, 255, 255, 0.85);
  border: 1px solid #666;
  color: black;
  height: 18px;
  width: 18px;
  font-size: 12px;
  text-align: center;
  font-weight: bold;
  line-height: 18px;
  border-radius: 4px;
}

h3 {
  margin: 0;
  margin-bottom: 20px;
  font-size: 1.4em;
  background-color: #aa4439;
  color: white;
  padding: 0;
}

 .modalContent {
  text-align: center;
  box-sizing: border-box;
  height: 300px;
}

.userMenuListItem {
  display: block;
  color: black;
  text-align: left;
  background-color: transparent;
  margin: 0;
  padding: 0;
  line-height: 40px;
}

.userMenuList {
  padding-left: 2em;
}

.userMenuListItem a {
  background-color: none;
  color: black;
  padding: 0;
  opacity: 1;
} 

.userMenuListItem a:hover {
  color: #aa4439;
}

@media(max-width: 500px) {
  .mobile { display: inline-block; }
  .screen { display: none; }
}

@media(min-width: 501px) {
  .mobile { display: none; }
  .screen { display: normal; }
}

  .router-link-active {
    opacity: 1;
  }

  .mobile {
    line-height: 50px;
    margin-bottom: -5px;
    transition: opacity 0.25s;
  }

  .mobile:hover {
    opacity: 1;
    color: white;
  }

  #menuBar {
    background: #aa4439;
    line-height: 50px;
    padding: 0 1.25em;
    height: 50px;
  }

  a {
    text-decoration: none;
    color: #FFF;
    padding: 0 0.5em;
    margin: 0;
    opacity: 0.5;
    transition: color 0.25s;
    cursor: pointer; 
  }

  a:hover {
    opacity: 1;
  }

  .userMenuLink {
    float: right;
    font-weight: bold;
    display: inline-block;
    opacity: 1;
    color: white;
  }

  .newPost {
    font-weight: bold;
    color: white;
  }

  .signoutButton {
    display: block;
    float: right;
    opacity: 1;
    color: #DDD;
  }
</style>
