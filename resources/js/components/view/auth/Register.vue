<template>
    <div>
        <div id="register">
            <v-app id="inspire">
                <v-app id="inspire">
                <v-main>
                    <v-container
                    class="fill-height"
                    fluid
                    >
                    <v-row
                        align="center"
                        justify="center"
                    >
                        <v-col
                        cols="12"
                        sm="8"
                        md="4"
                        >
                        <v-card class="elevation-12" :loading="isLogin">
                            <v-toolbar
                            color="primary"
                            dark
                            flat
                            >
                            <v-toolbar-title>Register form</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                            <v-form ref="form">
                                <v-text-field
                                label="Name"
                                name="name"
                                prepend-icon="mdi-account"
                                type="text"
                                v-model="form.name"
                                ></v-text-field>

                                <v-text-field
                                label="Email"
                                name="email"
                                prepend-icon="mdi-email"
                                type="text"
                                v-model="form.email"
                                ></v-text-field>
            
                                <v-text-field
                                id="password"
                                label="Password"
                                prepend-icon="mdi-lock"
                                type="password"
                                name="password"
                                v-model="form.password"
                                ></v-text-field>

                                <v-text-field
                                id="confirm_password"
                                label="Password Confirmation"
                                name="password_confirmation"
                                prepend-icon="mdi-lock-question"
                                type="password"
                                v-model="form.password_confirmation"
                                ></v-text-field>

                            </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <router-link class="ml-4" to="/login">Back to login ?</router-link>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click="doRegister" >Register</v-btn>
                            </v-card-actions>
                        </v-card>
                        </v-col>
                    </v-row>
                    </v-container>
                </v-main>
                <div class="text-center bg-success">
                    <v-snackbar
                        v-model="snackbar"
                        color="#28a745"
                        top
                    >
                    {{ text }}
                    </v-snackbar>
                </div>
                </v-app>
            </v-app>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data(){
        return{
            isLogin: false,
            snackbar: false,
            text: 'Register successfully!',
            form:{
                name:'',
                email:'',
                password:'',
                password_confirmation:''
            },
            errors:{}
        }
    },
    methods:{
        doRegister(){
            this.isLogin = "white";
            axios.post("/api/register",this.form).then(response =>{
                // console.log(response.data);
                this.snackbar = true;
                this.$refs.form.reset()
                this.$refs.form.resetValidation()
            }).catch(errors =>{
                // console.log(errors.response.data.errors)
                this.errors = errors.response.data.errors
            }).finally(() =>{
                this.isLogin =true
            })
        },
        goLogin(){
            this.snackbar = false
            setTimeout(() =>{
                this.$router.push('/login')
            },300)
        }

    }
}
</script>