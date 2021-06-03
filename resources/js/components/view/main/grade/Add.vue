<template>
    <div>
        <div id="add-grade">
            <v-card :loading="isLoading">
                <v-card-title>
                    <v-icon
                        large
                        left
                    >
                        mdi-temperature-celsius
                    </v-icon>
                    <span class="title font-weight-light">Add New Grade</span>
                </v-card-title>
                <v-form
                    ref="form"
                    lazy-validation
                    style="padding:30px;"
                >
                    <v-text-field
                        v-model="name"
                        label="Name"
                        name="name"
                        :rules="nameRules"
                        required
                    ></v-text-field>
                    <v-switch v-model="status" :input-value="status" v-if="status" label="Open"></v-switch>
                    <v-switch v-model="status" :input-value="status" v-else label="Cloose"></v-switch>
                    <v-btn
                        color="info"
                        class="mr-4"
                        @click="doAddNew"
                    >
                    Add New
                    </v-btn>
                    <v-btn
                        class="mr-4"
                        to="/grade"
                    >
                    Back
                    </v-btn>
                </v-form>
            </v-card>
            <div class="text-center bg-success">
                <v-snackbar
                    v-model="snackbar"
                    color="#28a745"
                    top
                >
                {{ text }}
                </v-snackbar>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data(){
        return{
            isLoading:false,
            snackbar: false,
            text: 'Add New Grade Successfully!',
            name:'',
            status:false,
            nameRules: [
                v => !!v || 'Name is required',
            ],
        }
    },
    methods:{
        doAddNew(){
            this.isLoading = true
            axios.post("/api/add-grade",{name:this.name,status:this.status}).then(response =>{
                this.snackbar = true;
                this.$refs.form.validate()
                this.$refs.form.reset()
                this.$refs.form.resetValidation()
            }).catch(() =>{
                console.error();
            }).finally(() =>{
                this.isLoading = false
            })
        }
    }
}
</script>