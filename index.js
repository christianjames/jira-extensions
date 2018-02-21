var moment = eval('moment')
console.log(moment)

console.log('teste extension')
var itemLista = document.createElement('li')
itemLista.id = 'itemListaProgresso'
itemLista.className = 'toolbar-item'

itemLista.innerHTML = `<a class="toolbar-trigger issueaction-logwork-start" href="javascript:;" style="display: none;"><span class="trigger-label">Iniciar Progresso</span></a>
<a class="toolbar-trigger issueaction-logwork-stop" href="javascript:;" style="display: none;"><span class="trigger-label">Parar Progresso</span></a>`


var issueKey = document.querySelector('.issue-link').getAttribute('data-issue-key');
var tempo =  localStorage.getItem('dataHoraLogwork-'+issueKey);

document.querySelector('#opsbar-opsbar-transitions').appendChild(itemLista)

if (tempo) {
    document.querySelector('.issueaction-logwork-stop').style.display = 'block'
}
else {
    document.querySelector('.issueaction-logwork-start').style.display = 'block'
}


if (tempo) {
    setarIntervalTimer()
}

function setarIntervalTimer () {
    var interval = setInterval(function () {
        var tempo =  localStorage.getItem('dataHoraLogwork-'+issueKey);

        var duration = moment.duration(moment().diff(tempo));
        
        var horas = duration.hours() + (duration.days() * 24);
        var minutos = duration.minutes();
        var segundos = duration.seconds();
                
        document.querySelector('.issueaction-logwork-stop .trigger-label').innerHTML = `Parar Progresso (${horas}h ${minutos}m ${segundos}s)`
    }, 1000)
}


document.querySelector('.issueaction-logwork-start').addEventListener('click', function () {  
    var dataHoraAgora = moment().format();  
    document.querySelector('.issueaction-logwork-start').style.display = 'none'
    document.querySelector('.issueaction-logwork-stop').style.display = 'block'
    localStorage.setItem('dataHoraLogwork-'+issueKey, dataHoraAgora)

    setarIntervalTimer()
})

document.querySelector('.issueaction-logwork-stop').addEventListener('click', function () {
    console.log('Clickou parar progresso')
    var tempo =  localStorage.getItem('dataHoraLogwork-'+issueKey);
    var diff = moment(moment()).diff(tempo, 'm')

    console.log(diff)
    document.querySelector('.issueaction-log-work').click()
    document.querySelector('.issueaction-logwork-start').style.display = 'block'
    document.querySelector('.issueaction-logwork-stop').style.display = 'none'
    

    setTimeout(function () {
        document.querySelector('#log-work-time-logged').value = diff+'m';
        localStorage.removeItem('dataHoraLogwork');
        clearInterval(interval)
    }, 1000)    
})
