<template>
  <div id="app">
    <div id="nav" class="mb-3 text-center">
      <h1><b>My To Do List</b></h1>
      <br>
      <router-link to="/">Home</router-link
      ><i style="margin-left: -11px" class="mr-1 bi bi-three-dots-vertical"></i>
      <router-link to="/add">Add</router-link>
      <i
        style="margin-left: -11px"
        class="mr-1 bi bi-three-dots-vertical"
        v-if="$route.name == 'edit-data'"></i>
      <button active to="#" id="edite" v-if="$route.name == 'edit-data'">
        Edit
      </button>
    </div>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
};
</script>
<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 2rem;
}
#title {
  font-weight: bold;
  color: #2c3e50;
  margin: 1rem 1rem 0 1rem;
  background: #eee;
  border-radius: 14px;
  text-decoration: none;
  padding: 0.25rem 0.75rem;
  width: 175px;
  text-align: center;
}
#actionic {
  font-weight: bold;
  color: #2c3e50;
  margin: 0 0.5rem 0 0;
  background: #eee;
  border-radius: 14px;
  text-decoration: none;
  padding: 0.25rem 0.75rem;
  border: 0;
}
#actionic:hover {
  color: #0428ff;
}

h1 {
  font-weight: 1200;
  font-size: 2rem;
  margin: 3rem 0 2rem 0rem;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
  margin: 0 1rem 0 0;
  background: #eee;
  border-radius: 14px;
  text-decoration: none;
  padding: 0.25rem 0.75rem;
}

#nav a.router-link-exact-active {
  color: #0428ff;
}
#edite {
  text-shadow: #0428ff;
  font-weight: bold;
  color: #0428ff;
  margin: 0 1rem 0 0;
  background: #eee;
  border-radius: 14px;
  text-decoration: none;
  padding: 0 0.75rem;
  border: 0;
}
input[type="submit"] {
  background: #0028ff;
  color: white;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  border: none;
  box-shadow: 0 5px 10px #0428ff7a;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.25s ease-out;
  cursor: pointer;
}
input[type="submit"]:hover {
  background: #3600ff;
  box-shadow: 0 3px 7px #0428ff7a;
}
input {
  border-radius: 10px;
  box-sizing: border-box;
  border: 1px solid #aaa;
  font-size: 1rem;
  width: 100%;
  padding: 0.5rem 1rem;
}
</style>
