<template>
    <div>
        <div class="container" id="attend">
            <div class="row">
                <div class="col-3">
                    <v-card
                        max-width="200"
                    >
                        <v-card-text>
                            <h3 style="color:#007bff;">
                                List Student Present
                            </h3>
                            <hr class="my-3">
                            <h3>Students Total: {{countPre}}</h3>
                            <v-btn class="my-2" to="/detail-attend" small outlined color="indigo">Detials <v-icon x-small>mdi-arrow-right</v-icon> </v-btn>
                        </v-card-text>
                    </v-card>
                </div>
                <div class="col-3">
                    <v-card
                        max-width="200"
                    >
                        <v-card-text>
                            <h3 style="color:#ffc107;">
                                List Student Absent
                            </h3>
                            <hr class="my-3">
                            <h3>Students Total: {{countAb}}</h3>
                            <v-btn class="my-2" to="/detail-attend-absent" small outlined color="indigo">Detials <v-icon x-small>mdi-arrow-right</v-icon> </v-btn>
                        </v-card-text>
                    </v-card>
                </div>
            </div>
        </div>
        <div class="container">
            <v-card
                :loading="isLoading"
            >
                <v-card-title>
                    <h3>Take Attendence on</h3>
                    <span class="mx-3">{{ timestamp }}</span>
                    <v-spacer></v-spacer>
                    <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                    ></v-text-field>
                </v-card-title>
                <v-data-table
                    :headers="headers"
                    :items="listStudent"
                    :search="search"
                >
                    <template v-slot:[`item.actions`]="{ item }">
                        <div class="d-flex">
                            <v-form
                                @submit.prevent="present"
                                style="margin:7px;"
                            >
                                <v-btn 
                                    type="submit" 
                                    icon 
                                >
                                    <v-icon
                                        size="30"
                                        class="mr-2"
                                        color="success"
                                        style="margin:0px 10px;"
                                        @click="getId(item.id)"
                                    >
                                        mdi-checkbox-marked-circle
                                    </v-icon>
                                </v-btn>

                            </v-form>

                            <v-form
                                @submit.prevent="absent"
                                style="margin:7px;"
                            >
                                <v-btn type="submit" icon >
                                    <v-icon
                                        size="30"
                                        color="red"
                                        @click="getId(item.id)"
                                    >
                                        mdi-cancel
                                    </v-icon>
                                </v-btn>
                            </v-form>
                        </div>
                    </template>
                </v-data-table>
            </v-card>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data(){
        return{
            listStudent:[],
            listAttend:[],
            dialog: true,
            search: '',
            headers: [
                { text: 'Id', value: 'id',sortable:false},
                { text: 'First Name', value: 'firstname' },
                { text: 'Last Name', value: 'lastname' },
                { text: 'Present & Absent', value: 'actions' ,sortable: false},
            ],
            student_id:null,
            stu_present:1,
            stu_absent:0,
            countAb:0,
            countPre:0,
            isLoading:false,
            timestamp: ""
        }
    },

    created(){
        axios.get("/api/get-student").then(response =>{
            // console.log(response.data);
            this.listStudent = response.data
        }).catch((e) =>{
            console.log(e);
        });

        axios.get("/api/get-attend").then(response =>{
            // console.log(response.data);
            var getAttend = response.data
            this.listAttend = getAttend;
            var couterAbsent = 0;
            var counterPresent = 0;
            for (let index = 0; index < getAttend.length; index++) {
                const element = getAttend[index];
                if(element.attend == 0){
                    couterAbsent++
                }
                if(element.attend == 1){
                    counterPresent++
                }
            }
            this.countAb = couterAbsent;
            this.countPre = counterPresent;
        }).catch((e) =>{
            console.log(e);
        });
        setInterval(this.getNow, 1000);
    },
    methods:{
        getId(id){
            this.student_id = id;
        },
        present () {
            this.isLoading = true
            axios.post("/api/add-atten-student",{student_id:this.student_id,attend:this.stu_present,atten_date:this.timestamp})
            .then((response) => {
                // console.log('success!')
            })
            .catch((e) => console.log(e))
            .finally(() =>{
                this.isLoading = false
            })
           
        },
        absent () {
            this.isLoading = true
            axios.post("/api/add-atten-student",{student_id:this.student_id,attend:this.stu_absent,atten_date:this.timestamp})
            .then((response) => {
                // console.log('success!')
            })
            .catch((e) => console.log(e))
            .finally(() =>{
                this.isLoading = false
            })
        },
        getNow: function() {
            const today = new Date();
            const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            const dateTime = date;
            this.timestamp = dateTime;
        }
    },
}
</script>
