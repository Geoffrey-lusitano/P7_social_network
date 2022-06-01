<template>
    <div>
        <h3 v-if="user">Bienvenue {{ user.name }}  {{ user.last_name }}</h3>
    </div>
</template>

<script>
    import axios from "axios"
    //import {mapGetters} from 'vuex'
    export default {
        name: 'Home',
        data () {
            return {
                user: null
            }
        },    
        async created () {
            const id = localStorage.getItem('userId');
            const response = await axios.get(`http://localhost:3000/api/auth/user/${id}`, { 
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            });
            this.user = response.data;
        },   
    }
</script>

<style lang="scss" scoped>

</style>