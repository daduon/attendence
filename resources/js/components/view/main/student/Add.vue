<template>
    <div>
        <div id="add-grade">
            <v-card :loading="isLoading">
                <v-card-title>
                    <v-icon
                        large
                        left
                    >
                        mdi-account-group
                    </v-icon>
                    <span class="title font-weight-light">Add New Student</span>
                </v-card-title>
                <v-form
                    ref="form"
                    lazy-validation
                    style="padding:30px;"
                >
                    <v-text-field
                        v-model="form.firstname"
                        label="First Name"
                        name="firstname"
                        :rules="validate.firstname"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="form.lastname"
                        label="Last Name"
                        name="lastname"
                        :rules="validate.lastname"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="form.address"
                        label="Address"
                        name="address"
                        :rules="validate.address"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="form.phone"
                        label="Phone"
                        name="phone"
                        :rules="validate.phone"
                        required
                    ></v-text-field>

                    <v-select
                        v-model="form.grade_id"
                        :items="getGrade"
                        item-text="name"
                        item-value="id"
                        label="Select Grade"
                    ></v-select>
                    <v-btn
                        color="info"
                        class="mr-4"
                        @click="doAddNew"
                    >
                    Add New
                    </v-btn>
                    <v-btn
                        class="mr-4"
                        to="/student"
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
            text: 'Add New Student Successfully!',
            form:{},
            validate:{
                firstname:[v => !!v || 'first name is required'],
                lastname:[v => !!v || 'last name is required'],
                address:[v => !!v || 'address is required'],
                phone:[v => !!v || 'phone is required'],
                grade_id:[v => !!v || 'Grade is required'],
            },
            getGrade:[],
        }
    },
    created(){
        axios.get("/api/get-grade").then(response =>{
            this.getGrade = response.data;
            // console.log(this.getGrade);
        }).catch((e) =>{
            console.log(e);
        });
    }
    ,
    methods:{
        doAddNew(){
            axios.post("/api/add-student",this.form).then(response =>{
                this.snackbar = true;
                this.$refs.form.validate()
                this.$refs.form.reset()
                this.$refs.form.resetValidation()
            }).catch((e) =>{
                console.log(e);
            }).finally(() =>{
                this.isLoading = false
            })
        }
    }
}
</script>