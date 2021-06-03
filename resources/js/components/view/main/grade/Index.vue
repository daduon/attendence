<template>
    <div>
        <div class="container">
            <div class="my-2">
                <v-btn color="primary" to="/add-grade" >Add New</v-btn>
            </div>
            <v-card :loading="isLoading">
                <v-card-title>
                List Grade
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
                    :items="getGrade"
                    :search="search"
                >
                <template v-slot:[`item.status`]="{ item }">
                    <v-chip
                        small
                        color="teal"
                        text-color="white"
                        v-if="item.status !=0"
                    >
                        open
                    </v-chip>
                    <v-chip
                        small
                        color="red"
                        text-color="white"
                        v-else
                    >
                        cloose
                    </v-chip>
                </template>

                <template v-slot:[`item.actions`]="{ item }">
                    <v-icon
                        small
                        class="mr-2"
                        @click="editItem(item)"
                        color="warning"
                        
                    >
                        mdi-pencil
                    </v-icon>
                    <v-icon
                        small
                        @click="deleteGrade(item)"
                        color="red"
                    >
                        mdi-delete
                    </v-icon>
                </template>
                </v-data-table>
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
            snackbar: false,
            isLoading:false,
            getGrade:[],
            text: 'Delete successfully!',
            dialog: true,
            search: '',
            headers: [
                { text: 'Id', value: 'id' },
                { text: 'Grade', value: 'name' },
                { text: 'Status', value: 'status' },
                { text: 'Action', value: 'actions' ,sortable: false},
            ],
            editedItem: {
                name: '',
            },
        }
    },

    created(){
        axios.get("/api/grade").then(response =>{
            // console.log(response.data);
            this.getGrade = response.data
            // console.log(this.getGrade);
        }).catch(() =>{
            console.error();
        });
    },
    methods:{
        editItem (item) {
            const Id = item.id;
            // this.$router.push(`/edit-grade/${userId}`);
            this.$router.push({ name: "EditGrade", params: { id: Id } });
        },
        deleteGrade(item) { 
            this.isLoading = true;
            const id = item.id;
            axios
                .delete(`/api/delete-grade/${id}`)
                .then(response => {
                //  console.log(response);
                    let i = this.getGrade.map(data => data.id).indexOf(id);
                    this.getGrade.splice(i, 1)
                    this.snackbar = true;
                }).catch(() =>{
                    console.error();
                }).finally(() =>{
                    this.isLoading = false;
                })
        },
        change(){
            console.log("change");
        }

    }
}
</script>