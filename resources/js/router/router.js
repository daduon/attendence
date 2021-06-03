import Vue from 'vue'
import VueRouter from 'vue-router'
import IndexMain from './../components/view/main/IndexMain.vue'
import Login from './../components/view/auth/Login.vue'
import Register from './../components/view/auth/Register.vue'
import Dashboard from './../components/view/main/Dashboard.vue'
import Accounts from './../components/view/main/AccountData.vue'
// grade
import Grade from './../components/view/main/grade/Index.vue'
import AddGrade from './../components/view/main/grade/Add.vue'
import EditGrade from './../components/view/main/grade/Edit.vue'
// teacher
import Teacher from './../components/view/main/teacher/Index.vue'
import AddTeacher from './../components/view/main/teacher/Add.vue'
import EditTeacher from './../components/view/main/teacher/Edit.vue'
// student
import Student from './../components/view/main/student/Index.vue'
import AddStudent from './../components/view/main/student/Add.vue'
import EditStudent from './../components/view/main/student/Edit.vue'
// attendence
import Attendence from './../components/view/main/attendence/Index.vue'
import DetailAttend from './../components/view/main/attendence/DetailAttend.vue'
import DetailAttendAbsent from './../components/view/main/attendence/DetailAbsent.vue'


Vue.use(VueRouter)

const routes = [{
        path: "/",
        name: "Main",
        meta: { requiresAuth: true },
        component: IndexMain,
        children: [{
                path: '/dashboard',
                name: 'Dashboard',
                meta: {
                    requiresAuth: true,
                    breadCrumbs: [{
                        to: '/dashboard', // link
                        text: 'Dashboard' // text
                    }]
                },
                components: {
                    default: IndexMain,
                    MainView: Dashboard
                }
            },
            {
                path: '/accounts',
                name: 'Accounts',
                meta: {
                    requiresAuth: true,
                    breadCrumbs: [{
                        to: '/accounts', // link
                        text: 'Accounts' // text
                    }]
                },
                components: {
                    default: IndexMain,
                    MainView: Accounts
                }
            },
            {
                path: '/grade',
                name: 'Grade',
                meta: {
                    requiresAuth: true,
                    breadCrumbs: [{
                        to: '/grade', // link
                        text: 'Grade' // text
                    }]
                },
                components: {
                    default: IndexMain,
                    MainView: Grade
                }
            },
            {
                path: '/add-grade',
                name: 'AddGrade',
                meta: {
                    requiresAuth: true,
                    breadCrumbs: [{
                        to: '/add-grade', // link
                        text: 'Create' // text
                    }]
                },
                components: {
                    default: IndexMain,
                    MainView: AddGrade
                }
            },
            {
                path: '/edit-grade/:id',
                name: 'EditGrade',
                meta: {
                    requiresAuth: true,
                    breadCrumbs: [{
                        to: '/edit-grade/:id', // link
                        text: 'Edit' // text
                    }]
                },
                components: {
                    default: IndexMain,
                    MainView: EditGrade
                }
            },
            {
                path: '/teacher',
                name: 'Teacher',
                meta: {
                    requiresAuth: true,
                    breadCrumbs: [{
                        to: '/teacher', // link
                        text: 'Teacher' // text
                    }]
                },
                components: {
                    default: IndexMain,
                    MainView: Teacher
                }
            },
            {
                path: '/add-teacher',
                name: 'AddTeacher',
                meta: {
                    requiresAuth: true,
                    breadCrumbs: [{
                        to: '/add-teacher', // link
                        text: 'AddTeacher' // text
                    }]
                },
                components: {
                    default: IndexMain,
                    MainView: AddTeacher
                }
            },
            {
                path: '/edit-teacher/:id',
                name: 'EditTeacher',
                meta: {
                    requiresAuth: true,
                    breadCrumbs: [{
                        to: '/edit-teacher/:id', // link
                        text: 'EditTeacher' // text
                    }]
                },
                components: {
                    default: IndexMain,
                    MainView: EditTeacher
                }
            },
            {
                path: '/student',
                name: 'Student',
                meta: {
                    requiresAuth: true,
                    breadCrumbs: [{
                        to: '/student', // link
                        text: 'Student' // text
                    }]
                },
                components: {
                    default: IndexMain,
                    MainView: Student
                }
            },
            {
                path: '/add-student',
                name: 'AddStudent',
                meta: {
                    requiresAuth: true,
                    breadCrumbs: [{
                        to: '/add-student', // link
                        text: 'AddStudent' // text
                    }]
                },
                components: {
                    default: IndexMain,
                    MainView: AddStudent
                }
            },
            {
                path: '/edit-student/:id',
                name: 'EditStudent',
                meta: {
                    requiresAuth: true,
                    breadCrumbs: [{
                        to: '/edit-student/:id', // link
                        text: 'EditStudent' // text
                    }]
                },
                components: {
                    default: IndexMain,
                    MainView: EditStudent
                }
            },
            {
                path: '/attendence',
                name: 'Attendence',
                meta: {
                    requiresAuth: true,
                    breadCrumbs: [{
                        to: '/attendence', // link
                        text: 'Attendence' // text
                    }]
                },
                components: {
                    default: IndexMain,
                    MainView: Attendence
                }
            },
            {
                path: '/detail-attend',
                name: 'DetailAttend',
                meta: {
                    requiresAuth: true,
                    breadCrumbs: [{
                        to: '/detail-attend', // link
                        text: 'DetailAttend' // text
                    }]
                },
                components: {
                    default: IndexMain,
                    MainView: DetailAttend
                }
            },
            {
                path: '/detail-attend-absent',
                name: 'DetailAttendAbsent',
                meta: {
                    requiresAuth: true,
                    breadCrumbs: [{
                        to: '/detail-attend-absent', // link
                        text: 'DetailAttendAbsent' // text
                    }]
                },
                components: {
                    default: IndexMain,
                    MainView: DetailAttendAbsent
                }
            },
        ]
    },
    {
        path: "/login",
        name: "Login",
        meta: { guest: true },
        component: Login
    },
    {
        path: "/register",
        name: "Register",
        meta: { guest: true },
        component: Register
    }
]

const router = new VueRouter({
        mode: "history",
        routes
    })
    // if not login use method meta
function loggedIn() {
    return true;
    // return localStorage.getItem("token");
};
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!loggedIn()) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        if (loggedIn()) { // if user loggedIn true -> redirect to dashboard
            next({
                path: '/dashboard',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next() // make sure to always call next()!
    }
})

export default router;