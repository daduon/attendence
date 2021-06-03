<template>
    <div>
        <div class="container" id="absent">
            <v-btn class="my-2" color="primary" to="/attendence"><v-icon x-small>mdi-arrow-left</v-icon> Back</v-btn>
            <v-card>
                <h3 style="padding:30px;" class="text-center">List Student Absent</h3>
                <hr>

                <v-toolbar
                    flat
                    color="transparent"
                    style="padding:20px 0px;"
                >
                    <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search by first name..............."
                        single-line
                    ></v-text-field>
                </v-toolbar>

                <v-list three-line 
                    v-for="(students,index) in searching" 
                    :key="index" 
                    ripple
                    @click="() => {}"
                >
                    <v-list-item 
                        :id="'attend'+'-'+students.attend"
                    >
                        <v-list-item-content v-if="students.attend != 1">
                            <v-list-item-title>
                                <v-row>
                                    <v-col cols="12">
                                        <h4>Date: {{students.atten_date}}</h4>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="3">
                                        <span class="label-stu">Fist Name:</span>
                                        <span>{{students.student.firstname}}</span>
                                    </v-col>
                                    <v-col cols="3">
                                        <span class="label-stu">Last Name:</span> 
                                        <span>{{students.student.lastname}}</span>
                                    </v-col>
                                    <v-col cols="3">
                                        <span class="label-stu">Address:</span> 
                                        <span>{{students.student.address}}</span>
                                    </v-col>
                                    <v-col cols="3">
                                        <span class="label-stu">Phone:</span>   
                                        <span>{{students.student.phone}}</span> 
                                    </v-col>
                                </v-row>
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card>
        </div>
    </div>
</template>

<style>
    #absent #attend-1{
        display: none !important;
    }
    #absent #attend-0{
        border-bottom:1px solid #ccc;
    }
    #absent .label-stu{
        color:#c79b69e5;
    }
</style>

<script>
import axios from "axios";
  export default {
    data(){
        return{
            getStudent:[],
            search:''
        }
    },
    created(){
        axios.get('/api/get-attend')
                .then((response) =>{
                    // console.log(response.data)
                    this.getStudent = response.data;
                })
                .catch((e) =>{
                    console.log(e)
                })
                .finally(() =>{

                })
    },
    computed: {
        searching () {
        if (!this.search) return this.getStudent
        const search = this.search.toLowerCase()
            return this.getStudent.filter(item => {
                const text = item.student.firstname.toLowerCase()
                return text.indexOf(search) > -1
            })
        },
    },
  }
</script>