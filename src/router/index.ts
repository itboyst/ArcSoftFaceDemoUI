import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";


const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: () => import("@/views/FaceDetect.vue")
    },
    {
        path: '/faceDetect',
        component: () =>import("@/views/FaceDetect.vue")
    },
    {
        path: '/faceCompare',
        component: () => import("@/views/FaceCompare.vue")
    },
    {
        path: '/faceRecognition',
        component: () => import("@/views/FaceRecognition.vue")
    },
    {
        path: '/faceStream',
        component: () =>import("@/views/FaceStream.vue")
    }
]


const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router;
