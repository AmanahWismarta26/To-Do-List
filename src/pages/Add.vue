<template>
    <div
        class="card col-md-9 mx-auto"
        style="border: none; border-radius: 60px; box-shadow: 0 5px 10px blue; background-color: lightblue;">
        <h2 style=" text-align: center;">
            Tambah ToDolist :)
        </h2>
        <div class="card-body">
            <!-- form add start-->
            <form ref="form" @submit.stop.prevent="handleSubmit">
               ,<b><b-form-group
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
                        prepend="&#9998;"
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
                <br>
                <b-form-group>
                    <input type="submit" value="Submit" />
                </b-form-group>
            </form>
            <!-- form add end -->
        </div>
    </div>
</template>
<script>
import { db } from "@/firebaseDb";
export default {
    name: "add-data",
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
    methods: {
        checkFormValidity() {
            const valid = this.$refs.form.checkValidity();
            this.nameState = valid;
            this.descriptionState = valid;
            this.created_atState = valid;

            return valid;
        },

        makeToast(variant = null) {
            this.$bvToast.toast("Data successfully created", {
                title: `Create ToDoList`,
                variant: variant,
                solid: true,
            });
        },

        handleSubmit() {
            // Exit when the form isn't valid
            if (!this.checkFormValidity()) {
                return;
            }
            // Push the name to submitted names
            db.collection("todolist")
                .add(this.todo)
                .then(() => {
                    this.makeToast("success");

                    this.todo.name = "";
                    this.todo.description = "";
                    this.todo.created_at = "";
                    this.nameState = null;
                    this.descriptionState = null;
                    this.created_atState = null;
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
