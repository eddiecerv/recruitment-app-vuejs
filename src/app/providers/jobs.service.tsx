const apiUrl = 'https://udemy-test-3353a.firebaseio.com/jobs.json';

export const getJobs = () => {
    return fetch( apiUrl, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then( res => res.json() );
}