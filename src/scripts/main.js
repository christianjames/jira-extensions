import moment from 'moment'

const itemLista = document.createElement('li')
const botaoRegistroTrabalho = document.querySelector('.issueaction-log-work');

if (botaoRegistroTrabalho) {
    itemLista.id = 'itemListaProgresso'
    itemLista.className = 'toolbar-item'
    
    itemLista.innerHTML = `<a class="toolbar-trigger issueaction-logwork-start" href="javascript:;" style="display: none;"><span class="trigger-label">Iniciar Progresso</span></a>
    <a class="toolbar-trigger issueaction-logwork-stop" href="javascript:;" style="display: none;"><span class="trigger-label">Parar Progresso</span></a>`
        
    const issueKey = document.querySelector('.issue-link').getAttribute('data-issue-key');
    const tempo =  localStorage.getItem('dataHoraLogwork-'+issueKey);
    var interval = null;
    
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
            const tempo =  localStorage.getItem('dataHoraLogwork-'+issueKey);
    
            const duration = moment.duration(moment().diff(tempo));
            
            const horas = duration.hours() + (duration.days() * 24);
            const minutos = duration.minutes();
            const segundos = duration.seconds();
                    
            document.querySelector('.issueaction-logwork-stop .trigger-label').innerHTML = `Parar Progresso (${horas}h ${minutos}m ${segundos}s)`
        }, 1000)
    }
    
    
    document.querySelector('.issueaction-logwork-start').addEventListener('click', function () {  
        const dataHoraAgora = moment().format();  
        document.querySelector('.issueaction-logwork-start').style.display = 'none'
        document.querySelector('.issueaction-logwork-stop').style.display = 'block'
        localStorage.setItem('dataHoraLogwork-'+issueKey, dataHoraAgora)
    
        setarIntervalTimer()
    })
    
    document.querySelector('.issueaction-logwork-stop').addEventListener('click', function () {
        console.log('Clickou parar progresso')
        const tempo =  localStorage.getItem('dataHoraLogwork-'+issueKey);
        const diff = moment(moment()).diff(tempo, 'm')
    
        document.querySelector('.issueaction-log-work').click()
        document.querySelector('.issueaction-logwork-start').style.display = 'block'
        document.querySelector('.issueaction-logwork-stop').style.display = 'none'
        
    
        setTimeout(function () {
            if (parseInt(diff) > 0) {
                document.querySelector('#log-work-time-logged').value = diff+'m';
            }
            
            localStorage.removeItem('dataHoraLogwork-'+issueKey);
            clearInterval(interval)
        }, 1000)    
    })
    
}
