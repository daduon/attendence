<template>
    <div>
        <div class="container">
            <div class="my-2">
                <v-btn color="primary" to="/add-student" >Add New</v-btn>
            </div>
            <v-card :loading="isLoading">
                <v-card-title>
                List Student
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
                    :items="getStudent"
                    :search="search"
                >
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
                    @click="deleteItem(item)"
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
            getStudent:[],
            text: 'Delete successfully!',
            dialog: true,
            search: '',
            headers: [
                { text: 'Id', value: 'id',sortable:false},
                { text: 'First Name', value: 'firstname' },
                { text: 'Last Name', value: 'lastname' },
                { text: 'Address', value: 'address'},
                { text: 'Phone', value: 'phone',sortable:false},
                { text: 'Grade', value: 'grade.name',sortable:false},
                { text: 'Action', value: 'actions' ,sortable: false},
            ],
            editedItem: {
                name: '',
            },
        }
    },

    created(){
        axios.get("/api/student").then(response =>{
            this.getStudent = response.data
            // console.log(this.getTeacher);
        }).catch((e) =>{
            console.log(e);
        });
    },
    methods:{
        editItem (item) {
            const Id = item.id;
            console.log(Id);
            // this.$router.push(`/edit-grade/${userId}`);
            this.$router.push({ name: "EditStudent", params: { id: Id } });
        },
        deleteItem(item) { 
            this.isLoading = true;
            const id = item.id;
            axios
                .delete(`/api/delete-student/${id}`)
                .then(response => {
                //  console.log(response);
                    let i = this.getStudent.map(data => data.id).indexOf(id);
                    this.getStudent.splice(i, 1)
                    this.snackbar = true;
                }).catch(() =>{
                    console.error();
                }).finally(() =>{
                    this.isLoading = false;
                })
        }
    }
}
</script>