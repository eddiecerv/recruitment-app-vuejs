<template>
    <main>
        <div class="bg-image">
            <div class="bg-overlay text-white">
                <div class="container">
                    <div class="jumbotron">
                        <h1 class="display-3">Sign Up</h1>
                        <div style="padding-top: 100px;">

                            <div class="row">
                                <div class="col-lg-6 offset-lg-3">
                                    <form v-on:submit.prevent="onSubmit">
                                        <fieldset>
                                            <legend>Please fill the form below to Register</legend>
                                            <div class="mb-3">
                                                <input type="text" name="name" v-model="formData.name" class="form-control" placeholder="Name" />
                                            </div>
                                            <div class="mb-3">
                                                <input type="email" name="email" v-model="formData.email" class="form-control" placeholder="E-mail" />
                                            </div>
                                            <div class="mb-3">
                                                <input type="password" name="password" v-model="formData.password" class="form-control" placeholder="Password" />
                                            </div>

                                            <div v-if="isRecruiter">
                                                <legend>Recruiter Company Info</legend>
                                                <div class="mb-3">
                                                    <input type="text" name="companyName" v-model="formData.company.name" class="form-control" placeholder="Company Name" />
                                                </div>
                                            </div>
                                            <div class="d-grid gap-2">
                                                <button type="submit" class="btn btn-outline-light">Sign Up</button>
                                            </div>
                                        </fieldset>
                                    </form>
                                </div>
                            </div>

                        </div>

                        <div style="padding-top: 50px; text-align: center;">
                            <h4>If you are a recruiter, <a href="#" @click.prevent="enableRecruiterForm">click here</a>.</h4>
                            <h3>
                                <router-link class="text-white" to="/sign-in">I already have a user</router-link>
                            </h3>
                            <p>Please review our Privacy Policy.</p>
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
                isRecruiter: false,
                formData: {
                    name: '',
                    email: '',
                    password: '',
                    company: {
                        name: ''
                    }
                }
            }
        },
        computed: {
            
        },        
        methods: {
            onSubmit() {
                if( this.canSubmit() ) {
                    const userData = {
                        ...this.formData,
                        role: this.formData.company.name !== '' ? 'company' : 'user',
                        password: btoa(this.formData.password),
                        createdAt: new Date().toISOString()
                    };

                    this.signUp( userData ).then( res => {
                        if( res ) {
                            localStorage.setItem('userData', JSON.stringify({ ...userData, id: res.name }));
                            this.$router.push('/app');
                        }
                    })
                } else {
                    console.error('Error: cant submit', this.formData.email);
                }
            },
            enableRecruiterForm() {
                this.isRecruiter = !this.isRecruiter;
            },
            canSubmit() {
                if( this.formData.name && this.formData.email && (this.formData.password && this.formData.password.length > 6) ) {
                    return true;
                }

                return false;
            },
            signUp(userData) {
                return fetch( 'https://udemy-test-3353a.firebaseio.com/users.json', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                }).then( res => res.json() );
            }

        }
    }
</script>

<style scoped>
    .bg-image {
        background-image: url('https://www.livecareer.com/wp-content/uploads/2020/06/best-remote-jobs-hero.jpg');
    }

    .form-control {
        color: #ffffff;
    }

    .d-grid {
        padding-top: 25px;
    }

    legend {
        font-size: 18px;
        margin-bottom: 15px;
    }
</style>