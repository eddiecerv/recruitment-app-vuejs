<template>
    <div>
        <h1>Profile</h1>
        <div class="row">
            <div class="col-lg-6 offset-lg-3">
                <div class="card shadow-sm">
                    <div class="card-body">
                        <form class="job_form" @submit.prevent="onSubmit">
                            <fieldset>

                                <legend>Update Profile</legend>

                                <div class="mb-3">
                                    <input type="text" name="name" v-model="formData.name" class="form-control" placeholder="Name" />
                                </div>
                                <div class="mb-3">
                                    <input type="email" name="email" v-model="formData.email" class="form-control" placeholder="E-mail" readonly />
                                </div>

                                <div v-if="formData.company.name">
                                    <legend>Recruiter Company Info</legend>
                                    <div class="mb-3">
                                        <input type="text" name="companyName" v-model="formData.company.name" class="form-control" placeholder="Company Name" />
                                    </div>
                                </div>
                                
                                <div class="d-grid gap-2">
                                    <button type="submit" class="btn btn-outline-success">Save Changes</button>
                                </div>
                            </fieldset>
                        </form>

                    </div> 
                </div> 
            </div> 
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                formData: {
                    name: '',
                    company: {
                        name: ''
                    },
                },
                userData: null
            }
        },
        methods: {
            verifyLoggedUser() {
                /** Verify if it is logged */
                const isLogged = localStorage.getItem('userData');
                this.userData = JSON.parse( isLogged ) || null;                
                this.formData = { ...this.userData };
                console.log('Form Data: ', this.userData, this.formData);
            },
            isFormValid() {
                return true;
            },
            onSubmit() {
                if( this.isFormValid ) {
                    let profileData = {
                        ...this.userData,
                        ...this.formData,
                        updatedAt: new Date().toISOString(),
                    }

                    this.putProfile( this.userData.id, profileData ).then( () => {
                        this.userData = profileData;
                        localStorage.setItem('userData', JSON.stringify(profileData));
                    }).catch();
                } 
            },
            putProfile(userId, profileData) {
                return fetch( `https://udemy-test-3353a.firebaseio.com/users/${userId}.json`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(profileData)
                }).then( res => res.json() );
            }
        },
        beforeMount() {
            this.verifyLoggedUser();
        }
    }
</script>