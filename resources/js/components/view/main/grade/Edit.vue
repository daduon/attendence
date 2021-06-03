<template>
    <div>
        <v-card :loading="isLoading">
            <v-card-title>
                    <v-icon
                        large
                        left
                    >
                        mdi-temperature-celsius
                    </v-icon>
                    <span class="title font-weight-light">Update Grade</span>
            </v-card-title>
            <v-form
                ref="form"
                lazy-validation
                style="padding:30px;"
            >
                <v-text-field
                    :rules="nameRules"
                    label="Title"
                    v-model="grade.name"
                    required
                ></v-text-field>
                <v-switch v-model="grade.status" :input-value="grade.status" v-if="grade.status == 1" label="Open"></v-switch>
                <v-switch v-model="grade.status" :input-value="grade.status" v-else label="Cloose"></v-switch>
                <v-btn
                    color="info"
                    class="mr-4"
                    @click="doUpdate"
                >
                Update
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
</template>
<script>
import axios from "axios";
export default {
    data(){
        return{
            grade:{},
            isLoading:false,
            nameRules: [
                v => !!v || 'Name is required',
            ],
            snackbar: false,
            text: 'Update Grade Successfully!',
        }
    },
    created () {
        console.log(this.grade)
        axios
        .get(`/api/edit-grade/${this.$route.params.id}`)
        .then((response) => {
            // console.log(response.data.name);
            this.grade = response.data
        })
        .catch(error => console.log(error))
    }, 
    methods:{
        doUpdate() {
            this.isLoading = true
            axios
                .post(`/api/update-grade/${this.$route.params.id}`, this.grade)
                .then((res) => {
                    this.snackbar = true;
                    this.$refs.form.validate()
                    this.$refs.form.reset()
                    this.$refs.form.resetValidation()
                    this.$router.push({ name: 'Grade' });
                })
                .catch((e) =>{
                    console.log(e);
                })
                .finally(() =>{
                    this.isLoading = false
                })
        }
    }
}
</script>