<template lang="">
    <div
        class="card col-md-9 mx-auto"
        style="border: none; border-radius: 30px; box-shadow: 0 5px 10px blue; background-color: lightblue">
        <h3 id="title">
            Edit Data
        </h3>
        <div class="card-body">
            <!-- form edit start -->
            <form ref="form" @submit.stop.prevent="handleUpdate">
                <b><b-form-group
                    label="Name"
                    label-for="name-input"
                    invalid-feedback="Name
                    is required"
                    :state="nameState">
                    <b-form-input
                        style="
                            border-radius: 10px;
                            box-sizing: border-box;
                            border: 1px solid #aaa;
                            font-size: 1rem;
                            width: 100%;
                            padding: 0.5rem 1rem;
                        "
                        v-model="todo.name"
                        :state="nameState"
                        placeholder="masukkan nama"
                        required />
                </b-form-group></b>
                <b><b-form-group
                    label="Description"
                    label-for="description-input"
                    invalid-feedback="description is required"
                    :state="descriptionState">
                    <b-textarea
                        style="
                            border-radius: 10px;
                            box-sizing: border-box;
                            border: 1px solid #aaa;
                            font-size: 1rem;
                            width: 100%;
                            padding: 0.5rem 1rem;
                        "
                        id="name-input"
                        v-model="todo.description"
                        :state="descriptionState"
                        placeholder="masukkan deskripsi"
                        required></b-textarea>
                </b-form-group></b>
                <b><b-form-group
                    label="Date"
                    label-for="description-input"
                    invalid-feedback="created_at is required"
                    :state="created_atState">
                    <b-form-datepicker
                        style="
                            border-radius: 10px;
                            box-sizing: border-box;
                            border: 1px solid #aaa;
                            font-size: 1rem;
                            width: 100%;
                            padding: 0.5rem 1rem;
                        "
                        id="name-input"
                        type="date"
                        v-model="todo.created_at"
                        :state="created_atState"
                        required></b-form-datepicker>
                </b-form-group></b>
                <b-form-group>
                    <br>
                    <input type="submit" value="Update" />
                </b-form-group>
            </form>
            <!-- form edit end -->
        </div>
    </div>
</template>
<script>
import { db } from "@/firebaseDb";
export default {
    name: "edit-data",
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
        };
    },
    created() {
        let dbRef = db.collection("todolist").doc(this.$route.params.id);
        dbRef
            .get()
            .then((doc) => {
                this.todo = doc.data();
                console.log(this.todo);
            })
            .catch((err) => {
                console.log(err);
            });
    },
    methods: {
        checkFormValidity() {
            const valid = this.$refs.form.checkValidity();
            this.nameState = valid;
            this.created_atState = valid;
            this.descriptionState = valid;

            return valid;
        },

        getOneData(data) {
            this.todo.key = data.key;
            this.todo.name = data.name;
            this.todo.description = data.description;
            this.todo.created_at = data.created_at;

            this.$refs["modal-edit"].show();
        },

        makeToast(variant = null) {
            this.$bvToast.toast("Data successfully edited", {
                title: `Edit ToDoList`,
                variant: variant,
                solid: true,
            });
        },

        handleUpdate() {
            if (!this.checkFormValidity()) {
                return;
            }
            db.collection("todolist")
                .doc(this.$route.params.id)
                .update(this.todo)
                .then(() => {
                    this.makeToast("warning");
                    delete this.todo.key;
                    this.$refs["modal-edit"].hide();

                    // reset form value
                    this.todo.name = "";
                    this.todo.description = "";
                    this.todo.created_at = "";

                    this.loadData();
                })
                .catch((err) => {
                    console.log(err);
                });
            this.$router.push({ name: "home-screen" });
        },
    },
};
</script>
