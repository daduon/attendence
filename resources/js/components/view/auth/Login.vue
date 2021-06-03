<template>
    <div>
        <div id="login">
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
                            <v-toolbar-title>Login form</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                            <v-form>
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
                                name="password"
                                prepend-icon="mdi-lock"
                                type="password"
                                v-model="form.password"
                                ></v-text-field>
                            </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <router-link class="ml-4" to="/register">Regsiter account</router-link>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click="doLogin" >Login</v-btn>
                            </v-card-actions>
                        </v-card>
                        </v-col>
                    </v-row>
                    </v-container>
                </v-main>
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
            isLogin:false,
            form:{
                email:'',
                password:'',
                device_name:'browser' // ios/anddroid/etc...
            },
            errors:{}
        }
    },
    methods:{
        doLogin(){
            this.isLogin = 'white';
            axios.post("/api/login",this.form).then(response =>{
                localStorage.setItem("token",response.data) // we store our token in localstorage
                this.$router.push('/dashboard');
            }).catch(errors =>{
                console.log(errors.response.data.errors)
            }).finally(() =>{
                this.isLogin = true;
            })
        }
    }
}
</script>