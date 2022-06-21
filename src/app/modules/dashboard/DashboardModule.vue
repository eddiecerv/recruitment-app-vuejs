<template>
    <div>
        <h1>Dashboard</h1>

        <div class="row">
            <div class="col-lg-8 offset-lg-2">
                <div style="margin-bottom: 25px; text-align:right">
                    <router-link class="btn btn-outline-info" to="/app/jobs">
                        <i class="fa-solid fa-comment-dots"></i> Post a New Job
                    </router-link>
                </div>


                <div class="row">
                    <div class="col">
                        <div class="card shadow-sm">
                            <div class="card-body">
                                <div>
                                    <h2>{{ jobsPosted.length }}</h2>
                                </div>
                                <p>Jobs Posted</p>
                            </div> 
                        </div>
                    </div>
                    <div class="col">
                        <div class="card shadow-sm">
                            <div class="card-body">
                                <div>
                                    <h2>{{ this.getRandomNumber(100, 1000) }}</h2>                                    
                                </div>
                                <p v-if="!isCompany">Jobs Applied</p>
                                <p v-else>Jobs Applications</p>
                            </div> 
                        </div>
                    </div>
                    <div class="col">
                        <div class="card shadow-sm">
                            <div class="card-body">
                                <div>
                                    <h2>{{ this.getRandomNumber(25, 100) }}</h2>                    
                                </div>
                                <p v-if="!isCompany">Jobs Feedback</p>
                                <p v-else>Pending Feedback</p>
                            </div> 
                        </div>
                    </div>
                </div>

                <div style="margin-top: 50px;" v-if="isCompany">
                    <high-charts :options="chartOptions"></high-charts>
                </div>
            </div> 
        </div>
    </div>
</template>

<script>
    import moment from 'moment';

    export default {
        data() {
            return {
                isCompany: false,
                userData: null,
                jobsPosted: [],
                chartOptions: {
                    maintainAspectRatio: false,
                    responsive: true,
                    type: 'line',
                    title: {
                        text: `Job Postulation ( ${ this.getCurrentMonthName() } )`
                    },
                    elements: {
                        line: {
                            tension: 0.4
                        }
                    },     
                    yAxis: {
                        title: {
                            display: true,
                            text: 'Daily Postulations',
                        },
                        min: 0
                    },
                    series: []
                }
            }
        },
        methods: {
            verifyLoggedUser() {
                /** Verify if it is logged */
                const isLogged = localStorage.getItem('userData');
                this.userData = JSON.parse( isLogged ) || null;
                this.isCompany = this.userData && this.userData.role === 'company';
            },
            getCurrentMonthName() {
                return moment().format('MMMM');
            },
            getSeries(jobs) {
                jobs.forEach( job => {
                    if( job.status === 'published' ) {
                        this.chartOptions.series.push( this.getMonthlyPostulations( job.title ) );
                    }
                })
            },
            getRandomNumber(min, max) {
                return Math.floor( Math.random() * max ) + min;
            },
            getMonthlyPostulations(jobId) {
                const postulationResults = [];
                const today = new Date();

                /** This is simulated randomly. It should be a calculated number */
                for(let i = 0; i <= today.getDate(); i++) {
                    const randNum = this.getRandomNumber(0, 100);
                    postulationResults.push( randNum );
                }

                return {
                    name: jobId,
                    data: postulationResults
                }
            },
            getJobs(companyId) {
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
                            
                            res(result.filter( item => item.companyId === companyId ));
                        } else {
                            res([]);
                        }
                    });
                });
            },
        },
        async beforeMount() {
            this.verifyLoggedUser();
            await this.getJobs( this.userData.id ).then( jobs => {
                this.jobsPosted = jobs;
                this.getSeries(jobs);
            });
        }
    }
</script>

<style scoped>
    .card .card-body div {
        min-height: 100px;
        padding-top: 30px;
        text-align:center;
    }
    .card .card-body h2 {
        font-size: 44px;
        font-weight: light;
    }
    .card p {
        text-align: center;
    }
</style>