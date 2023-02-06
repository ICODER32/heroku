const projectId = window.location.pathname.split('/')[2]
const hour = document.querySelector('.hour')
const minute = document.querySelector('.minute')
const second = document.querySelector('.second')
const start_timer = document.getElementById('start_timer')
const pause_btn = document.getElementById('pause_btn')
const close_save = document.getElementById('close_save')
const source = document.getElementById('source')
const work = document.getElementById('work')

var hr = 00;
var min = 00;
var sec = 00;
var stoptime = true;
var isPaused = false;


async function startTimer() {
    var timer = setInterval(() => {
        if (!isPaused) {
            sec = sec + 01;
            if (sec >= 60) {
                sec = 00;
                min = min + 01;
            }
            if (min >= 60) {
                hr = hr + 01
                min = 00;
            }
            hour.innerHTML = hr
            minute.innerHTML = min
            second.innerHTML = sec
        }
    }, 1000);
}
// startTimer()


start_timer.addEventListener('click', () => {
    startTimer();
    isPaused = false;
})
pause_btn.addEventListener('click', () => {
    isPaused = true
})
close_save.addEventListener('click', async () => {
    clearInterval()
    const data = {
        hr, min, sec
    }
    const response1 = await fetch(`/api/project/${projectId}`,
        {
            method: 'put',
            headers: {
                'Content-type': 'Application/json'
            },
            body: JSON.stringify(data)
        })

    const response2 = await fetch('/api/notepad', {
        method: 'post',
        headers: {
            'Content-type': 'Application/json'
        },
        body: JSON.stringify({
            project_id: projectId,
            links_used: source.value,
            worked: work.value
        })
    })
    if (response1 && response2) {
        window.location.href = '/'
    } else {
        alert('Something went Wrong!!')
    }
})
