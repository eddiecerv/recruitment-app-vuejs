<template>
    <div id="menu" v-if="!isLogged" class="container clearfix">
        <ul class="nav justify-content-end">
            <li class="nav-item">
                <router-link class="nav-link" aria-current="page" to="/">Home</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" aria-current="page" to="/jobs">Jobs</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" aria-current="page" to="/about">About</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" aria-current="page" to="/sign-up">Sign Up</router-link>
            </li>
        </ul>
    </div>

    <nav v-if="isLogged" class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                <i class="fa-solid fa-house"></i>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link" aria-current="page" to="/app">Dashboard</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" aria-current="page" to="/app/jobs">Jobs</router-link>
                    </li>
                    <!-- <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Dropdown
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </li> -->
                    <li class="nav-item">
                        <a class="nav-link disabled">FAQs</a>
                    </li>
                </ul>
                <form class="d-flex" role="search" v-if="!isCompany">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <!--<button class="btn btn-outline-light" type="submit">Search</button>-->
                </form>
                <div class="d-flex">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <router-link class="nav-link" to="/app/profile">{{ userData.name }}</router-link>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link" @click.prevent="signOut">
                                <i class="fa-solid fa-right-from-bracket"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        data() {
            return {
                isLogged: false,
                isCompany: false,
                userData: null
            }
        },
        methods: {
            verifyLoggedUser() {
                /** Verify if it is logged */
                const isLogged = localStorage.getItem('userData');
                this.userData = JSON.parse( isLogged ) || null;
                this.isLogged = this.userData !== null;
                this.isCompany = this.isLogged && this.userData.role === 'company'
            },
            signOut() {
                localStorage.removeItem('userData');
                this.$router.push('/');
            }
        },
        watch: {
            $route () {
                this.verifyLoggedUser();
            }
        },
        created() {
            this.verifyLoggedUser();
        }
    }
</script>

<style scoped>
    .clearfix {
        margin-top: 25px;
    }
    li.nav-item {
        font-size: 18px;
    }
</style>