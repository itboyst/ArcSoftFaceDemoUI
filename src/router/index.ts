import {createRouter, createWebHashHistory} from "vue-router";

import FaceDetect from '../views/FaceDetect.vue'
import FaceCompare from '../views/FaceCompare.vue'
import faceRecognition from '../views/FaceRecognition.vue'
import faceStream from '../views/FaceStream.vue'
import faceStream222 from '../views/FaceStream222.vue'


const routes = [
    {
        path: '/',
        component: () => FaceDetect
    },
    {
        path: '/faceDetect',
        component: () => FaceDetect
    },
    {
        path: '/faceCompare',
        component: () => FaceCompare
    },
    {
        path: '/faceRecognition',
        component: () => faceRecognition
    },
    {
        path: '/faceStream',
        component: () => faceStream
    },
    {
        path: '/faceStream2',
        component: () => faceStream222
    },
]


const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router;
