<template>
    <footer class="text-white">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 offset-lg-3">
                    <div style="text-align:center">
                        <h4>Jobs 4 All | {{ currentYear }}</h4>
                        <p>Made by <strong>{{ developer }}</strong></p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>

export default {
    data() {
        return {
            developer: 'Eduardo Vallecillo Cervantes',
            currentYear: new Date().getFullYear()
        }
    }
}
</script>


<style>
    footer {
        padding-top: 25px;
        height: 20vh;
        background-color: #121212;
    }
</style>