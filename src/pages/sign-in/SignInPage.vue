<template>
    <main>
        <div class="bg-image">
            <div class="bg-overlay text-white">
                <div class="container">
                    <div class="jumbotron">
                        <h1 class="display-3">Sign In</h1>
                        <div style="padding-top: 100px;">

                        <div class="row">
                                <div class="col-lg-6 offset-lg-3">
                                    <form v-on:submit.prevent="onSubmit">
                                        <fieldset>
                                            <div class="mb-3">
                                                <input type="email" name="email" v-model="formData.email" class="form-control" placeholder="E-mail" />
                                            </div>
                                            <div class="mb-3">
                                                <input type="password" name="password" v-model="formData.password" class="form-control" placeholder="Password" />
                                            </div>
                                            <div class="d-grid gap-2">
                                                <button type="submit" class="btn btn-outline-light">Sign In</button>
                                            </div>
                                        </fieldset>
                                    </form>
                                </div>
                            </div>

                        </div>

                        <div style="padding-top: 50px; text-align: center;">
                            <h3>
                                <router-link class="text-white" to="/sign-up">New User?</router-link>
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
                errorMessage: '',
                usersList: [],
                formData: {
                    email: '',
                    password: '',
                }
            }
        },
        computed: {
            
        },        
        methods: {
            onSubmit() {
                this.errorMessage = '';
                if( this.canSubmit() ) {
                    this.signIn().then( res => {
                        if( res ) {
                            const userData = res.find( item => item.email === this.formData.email && item.password === btoa(this.formData.password) );
                            if( userData === null || typeof userData === 'undefined' ) {
                                this.errorMessage = 'User not found or not exists';
                                return;
                            }

                            localStorage.setItem('userData', JSON.stringify({ ...userData }));
                            this.$router.push('/app');
                        }
                    })
                } else {
                    console.error('Error: cant submit', this.formData.email);
                }
            },
            canSubmit() {
                if( this.formData.email && (this.formData.password && this.formData.password.length > 6) ) {
                    return true;
                }

                return false;
            },
            signIn() {
                return new Promise(resolve => {
                    fetch( 'https://udemy-test-3353a.firebaseio.com/users.json', {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    }).then( res => res.json() )
                    .then(res => {
                        let result = Object.keys(res);
                        result = this.usersList && this.usersList.length ? this.usersList : result.map( item => {
                            return { 
                                id: item,
                                ...res[item],
                            }
                        });
                        console.log('Users: ', result);
                        resolve( result );
                    });
                });
            }

        }
    }
</script>


<style scoped>
    .bg-image {
        background-image: url('https://runningremote.com/wp-content/uploads/2019/04/shutterstock_1006574452-1024x684.jpg');
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