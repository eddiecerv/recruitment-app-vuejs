<template>
    <main>
        <div class="row">
            <div class="col-lg-12">

                <div class="bg-image">
                    <div class="bg-overlay text-white">
                        <div class="container">
                            <div class="jumbotron">
                                <h1 style="font-size: 48px;">Remote Jobs for All</h1>
                                <div>
                                    <p>This is the place you can get a job.</p>
                                </div>
                                <div style="height:350px"></div>
                                <div style="text-align:right">
                                    <router-link class="btn btn-primary btn-lg" to="/sign-up">Sign Up</router-link>
                                </div>
                            </div>
                            <hr />

                            <p>Please go to reach your job of our dreams <router-link to="/jobs">Go to Look for a Job</router-link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>

    import { getJobs } from '../../app/providers/jobs.service.tsx';
    export default {
        data() {
            return {
                jobsList: []
            }
        },
        methods: {
            onSubmit() {
                this.$emit()
            }
        },
        beforeCreate() {
            getJobs().then( res => {
                this.jobsList = res;
            });
        }
    }
</script>

<style scoped>
    .bg-image {
        background-image: url('https://fjwp.s3.amazonaws.com/blog/wp-content/uploads/2019/12/09102853/top-paying-remote-jobs.png');
    }
</style>