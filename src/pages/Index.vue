<template>
  <b-card
    header-bg-variant="light"
    style="border: none; border-radius: 30px; box-shadow: 0 5px 15px black; background-color: burlywood;">
    <b-card-body>
          <blockquote class="blockquote text-center">
      <b><p class="mb-0">--Sama seperti besi yang bisa berkarat karena jarang digunakan--</p></b>
      <br>
      <b><footer class="blockquote-footer">Maka berdiam diri bisa merusak kesehatan</footer></b>
      </blockquote>
      <br>
      <b-card-group>
        <b-card-body v-for="row in resultQuery" :key="row.key">
          <b-card
            style="
              border: none;
              border-radius: 30px;
              box-shadow: 0 3px 0 3px grey;
            ">
            <b-card-title>
              <div class="float-left">
                <small
                  ><b>
                    <h4>{{ row.name }}</h4>
                  </b></small>
              </div>
                <router-link
                  :to="{ name: 'edit-data', params: { id: row.key } }"
                  id="edite">
                  <i class="bi bi-pencil-fill">edit</i>
                </router-link>

                <button @click="deleteData(row.key)" id="edite" style="text-align:center">
                  <i class="bi bi-trash-fill">hapus</i>
                </button>
            </b-card-title>
            <div class="float-left container text-justify">
              <b-card-body>
                {{ row.description }}
              </b-card-body>
            </div>
            <small class="text-muted float-right"
              >created {{ row.created_at }}</small
            >
          </b-card>
        </b-card-body>
      </b-card-group>
    </b-card-body>
  </b-card>
</template>

<script>
import { db } from "../firebaseDb";
export default {
  name: "home-screen",
  data() {
    return {
      todolist: [],
      todo: {
        name: "",
        description: "",
        created_at: "",
      },
      nameState: null,
      descriptionState: null,
      created_atState: null,

      searchQuery: null,
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    deleteData(id) {
      if (window.confirm("Yakin ingin hapus?")) {
        db.collection("todolist")
          .doc(id)
          .delete()
          .then(() => {
            this.makeToast("danger");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    loadData() {
      db.collection("todolist").onSnapshot((snapshotChange) => {
        this.todolist = [];
        snapshotChange.forEach((doc) => {
          this.todolist.push({
            key: doc.id,
            name: doc.data().name,
            description: doc.data().description,
            created_at: doc.data().created_at,
          });
        });
      });
    },
    makeToast(variant = null) {
      this.$bvToast.toast("Data deleted", {
        title: `Delete ToDoList`,
        variant: variant,
        solid: true,
      });
    },
  },
  computed: {
    resultQuery() {
      if (this.searchQuery) {
        return this.todolist.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => item.name.toLowerCase().includes(v));
        });
      } else {
        return this.todolist;
      }
    },
  },
};
</script>
