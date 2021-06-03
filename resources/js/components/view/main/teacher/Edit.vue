<template>
    <div>
               <div id="add-grade">
            <v-card :loading="isLoading">
                <v-card-title>
                    <v-icon
                        large
                        left
                    >
                        mdi-account-tie
                    </v-icon>
                    <span class="title font-weight-light">Add New Teacher</span>
                </v-card-title>
                <v-form
                    ref="form"
                    lazy-validation
                    style="padding:30px;"
                >
                    <v-text-field
                        v-model="teacher.firstname"
                        label="First Name"
                        name="firstname"
                        :rules="validate.firstname"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="teacher.lastname"
                        label="Last Name"
                        name="lastname"
                        :rules="validate.lastname"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="teacher.address"
                        label="Address"
                        name="address"
                        :rules="validate.address"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="teacher.phone"
                        label="Phone"
                        name="phone"
                        :rules="validate.phone"
                        required
                    ></v-text-field>


                    <v-select
                        v-model="teacher.grade_id"
                        :items="getGrade"
                        item-text="name"
                        item-value="id"
                        label="Select Grade"
                    ></v-select>

                    <v-btn
                        color="info"
                        class="mr-4"
                        @click="doUpdate"
                    >
                    Update
                    </v-btn>
                    <v-btn
                        class="mr-4"
                        to="/teacher"
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
            teacher:{},
            getGrade:[],
            snackbar: false,
            text: 'Add New Grade Successfully!',
            validate:{
                firstname:[v => !!v || 'first name is required'],
                lastname:[v => !!v || 'last name is required'],
                address:[v => !!v || 'address is required'],
                phone:[v => !!v || 'phone is required'],
                grade_id:[v => !!v || 'Grade is required'],
            },

        }
    },
    created () {
        axios
        .get(`/api/edit-teacher/${this.$route.params.id}`)
        .then((response) => {
            // console.log(response.data.id);
            this.teacher = response.data
        })
        .catch(error => console.log(error));

        axios.get("/api/get-grade").then(response =>{
            this.getGrade = response.data;
            // console.log(this.getGrade);
        }).catch((e) =>{
            console.log(e);
        });
    }, 
    methods:{
        doUpdate() {
            axios
                .post(`/api/update-teacher/${this.$route.params.id}`, this.teacher)
                .then((res) => {
                    this.snackbar = true;
                    this.$refs.form.validate()
                    this.$refs.form.reset()
                    this.$refs.form.resetValidation()
                    this.$router.push({ name: 'Teacher' });
                });
        },
    }
}
</script>