var time;
window.onload = function () {
    fetch('/api/project/projects').
        then((res) => {
            res.json().
                then(arr => {
                    let myChart = document.getElementById('myChart').getContext('2d');

                    let barChart = new Chart(myChart, {
                        type: 'bar', data: { labels: arr.name, datasets: [{ label: 'Time Spent  (MINUTES)', data: arr.time, backgroundColor: 'darkorange' }] }, options: {
                            responsive:
                                true, maintainAspectRatio: false,
                        }
                    })
                })
        })
        .catch(err => console.log(err))
};

