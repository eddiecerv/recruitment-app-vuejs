<template>
    <div>
        <h1>Jobs</h1>

        <div v-if="userData && userData.role === 'company'" class="row">
            <div class="col-lg-8 offset-lg-2">
                <div class="card shadow-sm">
                    <div class="card-body">

                        <div class="row">
                            <div class="col-sm-4">
                                <div v-if="!jobsList.length" class="jobs_box">
                                    <p align="center" class="text-secondary">No jobs posted yet.</p>
                                </div>
                                <div v-if="jobsList.length" class="jobs_box">
                                    <div id="jobs_list" class="list-group">
                                        <div class="list-group-item" v-for="job of jobsList" :key="job.id" @click="setEditJob(job.id)">
                                            <div style="text-align:left">
                                                <span class="badge bg-info" style="margin-right: 5px;">{{ getCapitalName(job.level)[0] }}</span>
                                                <span class="text-secondary">{{ job.title }}</span>
                                            </div>

                                            <div class="row" style="margin-top: 6px; font-size: 10px;">
                                                <div class="col-6">
                                                    <span :class="job.status === 'draft' ? 'text-warning' : 'text-success'">{{ getCapitalName(job.status) }}</span>
                                                </div>
                                                <div class="col">
                                                    <div class="text-secondary" style="text-align: right;">
                                                        {{ getJobDate( job ) }}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-8">
                                <form class="job_form" @submit.prevent="onSubmit">
                                    <fieldset>
                                        <div v-if="isUpdate" class="option__icon">
                                            <a href="#" class="text-danger" @click.prevent="deleteJob">
                                                <i class="fa-solid fa-trash-can"></i>
                                            </a>
                                        </div>

                                        <legend>Job Post</legend>

                                        <div class="mb-3">
                                            <label>Job Title: </label>
                                            <input type="text" name="title" v-model="formData.title" class="form-control" placeholder="Title" />
                                        </div>
                                        <div class="mb-3">
                                            <label>Tech Level: </label>
                                            <div style="display: flex;">
                                                <div v-for="level in levels" :key="level" class="form__multiple" :class="formData.level === level ? 'active' : ''" @click="onSelectLevel(level)">
                                                    {{ getCapitalName(level) }}
                                                </div>
                                            </div>
                                        </div>

                                        <div class="mb-3">
                                            <label>Top Annual Salary: (digits only)</label>
                                            <input type="number" name="salary" v-model="formData.salary" class="form-control" placeholder="$ Top Salary" />
                                        </div>
                                        <div class="mb-3">
                                            <label>Techs (add All Techs Required for this Job separated by comas): </label>
                                            <textarea name="techs" class="form-control" v-model="techsList" placeholder="Technologies (vuejs, reactjs, java, golang...)" rows="2"></textarea>
                                        </div>
                                        <div class="mb-3">
                                            <label>Job Description: </label>
                                            <textarea name="description" class="form-control" v-model="formData.description" placeholder="Description" rows="4"></textarea>
                                        </div>
                                        <div class="mb-3">
                                            <label>Job Status: </label>
                                            <div style="display: flex;">
                                                <div v-for="status in statuses" :key="status" class="form__multiple" :class="formData.status === status ? 'active' : ''" @click="onSelectStatus(status)">
                                                    {{ getCapitalName(status) }}
                                                </div>
                                            </div>
                                        </div>

                                        <div class="d-grid gap-2" v-if="!isUpdate">
                                            <button class="btn btn-outline-primary" type="submit">Create</button>
                                        </div>

                                        <div class="d-grid gap-2" v-if="isUpdate">
                                            <button class="btn btn-outline-success" type="submit">Update</button>
                                            <button class="btn btn-secondary" type="button" @click="resetForm">Cancel</button>
                                        </div>
                                    </fieldset>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Swal from 'sweetalert2';
    export default {
        data() {
            return {
                jobId: null,
                isUpdate: false,
                jobsList: [],
                levels: ['junior', 'mid', 'senior'],
                statuses: ['published', 'draft'],
                userData: null,
                techsList: '',
                formData: {
                    title: '',
                    level: 'junior',
                    status: 'draft',
                    salary: 0,
                    companyId: '',
                    description: '',
                    techs: []
                }
            }
        },
        methods: {
            getJobDate(jobData) {
                if( jobData.updatedAt ) {
                    return new Date(jobData.updatedAt).toLocaleDateString() + ' ' + new Date( jobData.updatedAt ).toLocaleTimeString() + 'h';
                } else {
                    return new Date(jobData.createdAt).toLocaleDateString() + ' ' + new Date( jobData.createdAt ).toLocaleTimeString() + 'h';
                }
            },
            resetForm() {
                this.techsList = '';
                this.formData = {
                    title: '',
                    level: 'junior',
                    status: 'draft',
                    salary: 0,
                    companyId: this.userData.id,
                    description: '',
                    techs: []
                }
                this.jobId = null;
                this.isUpdate = false;
            },
            verifyLoggedUser() {
                /** Verify if it is logged */
                const isLogged = localStorage.getItem('userData');
                this.userData = JSON.parse( isLogged ) || null;
                this.formData.companyId = this.userData.id;
            },
            getCapitalName( option ) {
                return option[0].toUpperCase() + option.substring(1);
            },
            onSelectLevel(level) {
                this.formData.level = level;
            },
            onSelectStatus(status) {
                this.formData.status = status;
            },
            isFormValid() {
                return true;
            },
            onSubmit() {
                if( this.isFormValid && !this.isUpdate ) {
                    this.formData.techs = this.techsList.split(',');
                    const jobData = {
                        ...this.formData,
                        createdAt: new Date().toISOString(),
                    }
                    this.postJob( jobData ).then( res => {
                        this.jobsList.unshift({...jobData, id: res.name });
                        this.resetForm();
                    }).catch();
                } else if( this.isFormValid && this.isUpdate ) {
                    this.formData.techs = this.techsList.split(',');
                    const jobData = {
                        ...this.jobsList.find( item => item.id === this.jobId ),
                        ...this.formData,
                        updatedAt: new Date().toISOString(),
                    }
                    this.putJob( this.jobId, jobData ).then( () => {
                        this.jobsList = this.jobsList.filter(item => item.id !== this.jobId );
                        this.jobsList.unshift({...jobData, id: this.jobId });
                        this.resetForm();
                    }).catch();
                }
            },
            postJob(jobData) {
                return fetch( 'https://udemy-test-3353a.firebaseio.com/jobs.json', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(jobData)
                }).then( res => res.json() );
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
            putJob(jobId, jobData) {
                return fetch( `https://udemy-test-3353a.firebaseio.com/jobs/${jobId}.json`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(jobData)
                }).then( res => res.json() );
            },
            deleteJob() {
                const jobData = this.jobsList.find( item => item.id === this.jobId );
                Swal.fire({
                    title: `Do you want to delete <strong>${jobData.title}</strong> job?`,
                    icon: 'warning',
                    showCloseButton: true,
                    showCancelButton: true,
                    focusConfirm: false,
                    confirmButtonText: 'Continue',
                    cancelButtonText: 'Cancel',
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        fetch( `https://udemy-test-3353a.firebaseio.com/jobs/${this.jobId}.json`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        .then( res => res.json() )
                        .then(() => {
                            this.jobsList = this.jobsList.filter( job => job.id !== this.jobId );
                            this.jobId = null;
                            Swal.fire('Job Deleted Successfully!', '', 'success');
                        });
                        
                    } else if (result.isDenied) {
                        Swal.fire('Changes are not saved', '', 'info')
                    }
                })
                
            },
            setEditJob(jobId) {
                const jobData = this.jobsList.find( item => item.id === jobId );
                this.jobId = jobId;
                this.techsList = jobData.techs.join(',');
                this.formData = {
                    title: jobData.title,
                    level: jobData.level,
                    status: jobData.status,
                    salary: jobData.salary,
                    companyId: this.userData.id,
                    description: jobData.description,
                    techs: jobData.techs
                }
                this.isUpdate = true;
            }
        },
        beforeMount() {
            this.verifyLoggedUser();
            this.getJobs( this.userData.id ).then( res => this.jobsList = res );
        }
    }
</script>

<style scoped>
    .job_form {
        border-left: 1px solid #cccccc; 
        padding: 25px;
    }
    .jobs_box {
        padding-top: 25px;
    }
    #jobs_list .list-group-item {
        border-radius: 0;
        cursor: pointer;
    }
    #jobs_list .list-group-item:hover {
        background: #E80C7A;
        color: #ffffff !important;
    }
</style>