<template>
    <main>
        <div class="bg-image">
            <div class="bg-overlay text-white">
                <div class="container">
                    <div class="jumbotron">
                        <h1 class="display-3">Jobs</h1>
                        <div style="margin-top: 25px; min-height: 350px; display:flex;">
                            <div v-for="job in jobsList.slice(0, 4)" class="job__post" :key="job.id">
                                <h2>{{ job.title }}</h2>
                                <p class="salary">{{ job.salary }} <small>USD</small></p>
                                <p>
                                    <small>Annual Revenue</small>
                                </p>
                                <div>
                                    <span class="tech" v-for="tech in job.techs.slice(0, 2)" :key="tech">{{ tech }}</span>
                                </div>

                                <div style="margin-top: 25px; font-weight: bolder;" class="text-white">
                                    <router-link to="/sign-up">Apply for this job</router-link>
                                </div>
                            </div>

                        </div>

                        <div style="padding-top: 50px;">
                            <h4>If you are a recruiter, you can post a job.</h4>
                            <h3>Feel free to <router-link to="/sign-up">sign up</router-link> and continue with recruitment for you company.</h3>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
    export default {
        data() {
            return {
                jobsList: []
            }
        },
        methods: {
            getJobs() {
                return new Promise((res) => {
                    fetch( 'https://udemy-test-3353a.firebaseio.com/jobs.json', {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then( res => res.json() )
                    .then( data => {
                        if(data) {
                            let result = Object.keys(data);
                            result = result.map( item => {
                                return { 
                                    id: item,
                                    ...data[item],
                                }
                            });
                            
                            res(result.filter( item => item.status === 'published' ));
                        } else {
                            res([]);
                        }
                    });
                });
            }
        },
        beforeMount() {
            this.getJobs().then( data => {
                this.jobsList = data;
            });
        }
    }
</script>

<style scoped>
    .bg-image {
        background-image: url('https://websensepro.com/wp-content/uploads/2019/12/work-remotely-remote-work.png');
    }
</style>