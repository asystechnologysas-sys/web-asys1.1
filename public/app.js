const header=document.querySelector('.site-header'), glow=document.querySelector('.cursor-glow'), stage=document.querySelector('.logo-stage');
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>30),{passive:true});
window.addEventListener('pointermove',e=>{glow.style.transform=`translate(${e.clientX-160}px,${e.clientY-160}px)`;if(stage&&innerWidth>700){const x=(e.clientX/innerWidth-.5)*10,y=(e.clientY/innerHeight-.5)*-10;stage.style.setProperty('--rx',`${y}deg`);stage.style.setProperty('--ry',`${x}deg`)}});
document.querySelectorAll('.service').forEach(s=>s.addEventListener('mouseenter',()=>{document.querySelectorAll('.service').forEach(x=>x.classList.remove('active'));s.classList.add('active')}));
const reveal=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('shown')}),{threshold:.13});document.querySelectorAll('section, .project-card, .service').forEach(el=>reveal.observe(el));


document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const b = form.querySelector('button');
    
    const inputs = form.querySelectorAll('input');
    const mensajeArea = form.querySelector('textarea');

    // Mapeo de campos
    const campos = [
        { el: inputs[0], required: true },  // Nombre
        { el: inputs[1], required: false }, // Empresa
        { el: inputs[2], required: true },  // Correo
        { el: inputs[3], required: true },  // Teléfono
        { el: mensajeArea, required: true } // Mensaje
    ];

    let formValido = true;

    // Validar cada campo
    campos.forEach(campo => {
        const parent = campo.el.parentElement;
        if (campo.required && !campo.el.value.trim()) {
            parent.classList.add('error');
            formValido = false;
        } else {
            parent.classList.remove('error');
        }
    });

    if (!formValido) return; // Si hay errores, no enviamos nada

    // Si todo está bien, enviamos los datos
    const datos = {
        nombre: inputs[0].value,
        empresa: inputs[1].value,
        correo: inputs[2].value,
        telefono: inputs[3].value,
        mensaje: mensajeArea.value
    };

    b.textContent = 'ENVIANDO...';
    b.disabled = true;

    try {
        const response = await fetch('/api/contacto', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });

        if (response.ok) {
            b.textContent = 'MENSAJE ENVIADO ✓';
            b.classList.add('sent');
            form.reset();
        } else {
            throw new Error();
        }
    } catch (err) {
        b.textContent = 'ERROR AL ENVIAR';
        setTimeout(() => {
            b.textContent = 'INICIAR CONVERSACIÓN →';
            b.disabled = false;
        }, 3000);
    }
});



document.querySelector('.menu-toggle').addEventListener('click',()=>document.querySelector('nav').classList.toggle('open'));
const modal=document.querySelector('.detail-modal'),modalContent=document.querySelector('.modal-content');
const serviceDetails={
 automation:{title:'Automatización<br><em>que libera tiempo.</em>',text:'Diseñamos flujos que eliminan tareas repetitivas, conectan decisiones y permiten que cada equipo concentre su energía en lo estratégico.',points:['MAPEO DE PROCESOS','FLUJOS Y ALERTAS INTELIGENTES','MEDICIÓN DE EFICIENCIA']},
 software:{title:'Software<br><em>hecho a la medida.</em>',text:'Construimos productos digitales escalables, seguros y claros de usar. Desde la primera interfaz hasta el sistema que sostiene la operación.',points:['APLICACIONES WEB Y MÓVILES','ARQUITECTURA ESCALABLE','EXPERIENCIA DE USUARIO']},
 intelligence:{title:'Inteligencia<br><em>aplicada.</em>',text:'Convertimos información en respuestas útiles mediante asistentes virtuales, analítica y automatización orientada a cada contexto.',points:['ASISTENTES CON IA','ANALÍTICA DE DATOS','DECISIONES MÁS RÁPIDAS']},
 integration:{title:'Todo conectado.<br><em>Todo en movimiento.</em>',text:'Integramos las herramientas que tu negocio ya utiliza para que los datos viajen con precisión y los equipos operen como uno solo.',points:['APIS Y CONECTORES','SINCRONIZACIÓN DE DATOS','OPERACIÓN UNIFICADA']}
};
const projects={
 tienda:{title:'Sistema<br><em>de Tienda.</em>',text:'Una solución de gestión creada para una tienda de barrio: centraliza el inventario, el registro de ventas, las categorías y el control diario del negocio.',points:['INVENTARIO Y PRODUCTOS','REGISTRO DE VENTAS','PANEL DE CONTROL'],images:['proyectos/tienda-dashboard.jpeg','proyectos/tienda-pos.jpeg']},
 jmbarber:{title:'JM<em>barber.</em>',text:'Una experiencia digital para barberías que combina el acceso de clientes, la reserva de citas y un panel operativo para organizar cada jornada.',points:['AGENDA DE CITAS','ACCESO DE CLIENTES Y BARBERO','PANEL DE ADMINISTRACIÓN'],images:['proyectos/jmbarber-login.jpeg','proyectos/jmbarber-panel.jpeg']},
 unimagdalena:{title:'Chatbot<br><em>Unimagdalena.</em>',text:'Asistente virtual para Ingeniería de Sistemas de la Universidad del Magdalena, orientado a agilizar la atención académica y resolver consultas de estudiantes.',points:['ATENCIÓN ACADÉMICA','ORIENTACIÓN A ESTUDIANTES','EXPERIENCIA CON IA'],images:['proyectos/unimagdalena-chat.jpeg','proyectos/unimagdalena-web.jpeg']}
};
function openDetail(detail){const points=detail.points.map(x=>`<span>${x}</span>`).join('');const visual=detail.images?`<div class="modal-visual two">${detail.images.map((src,i)=>`<img src="${src}" alt="Vista ${i+1} del proyecto" />`).join('')}</div>`:`<div class="service-visual"><b>SOLUCIÓN ASYS</b><strong>Procesos que<br>se sienten<br>naturales.</strong></div>`;modalContent.innerHTML=`<div><h2>${detail.title}</h2><p>${detail.text}</p><div class="modal-points">${points}</div></div>${visual}`;modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}
function closeDetail(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow=''}
document.querySelectorAll('[data-service]').forEach(button=>button.addEventListener('click',e=>{e.stopPropagation();openDetail(serviceDetails[button.dataset.service])}));
document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>openDetail(projects[button.dataset.project])));
document.querySelector('.modal-close').addEventListener('click',closeDetail);document.querySelector('.modal-backdrop').addEventListener('click',closeDetail);window.addEventListener('keydown',e=>{if(e.key==='Escape')closeDetail()});
const reviewTrack=document.querySelector('.review-track');document.querySelector('.review-prev').addEventListener('click',()=>reviewTrack.scrollBy({left:-reviewTrack.clientWidth*.75,behavior:'smooth'}));document.querySelector('.review-next').addEventListener('click',()=>reviewTrack.scrollBy({left:reviewTrack.clientWidth*.75,behavior:'smooth'}));
const projectTrack=document.querySelector('.project-showcase');document.querySelector('.project-prev').addEventListener('click',()=>projectTrack.scrollBy({left:-projectTrack.clientWidth*.82,behavior:'smooth'}));document.querySelector('.project-next').addEventListener('click',()=>projectTrack.scrollBy({left:projectTrack.clientWidth*.82,behavior:'smooth'}));
Object.assign(projects,{
tienda:{title:'Sistema<br><em>de Tienda.</em>',images:['proyectos/tienda-dashboard.jpeg','proyectos/tienda-pos.jpeg','proyectos/tienda-ventas.jpeg'],metrics:[['Ganancia de Eficiencia','+92%'],['Tiempo Ahorrado','3.5 hrs/día'],['Precisión Operativa','100%'],['Resultado Clave','Control Total de Caja']],quote:'“Antes todo lo anotaba en cuadernos de papel y no sabía qué productos se vencían ni cuánto dinero entraba por Nequi. Ahora registro mis ventas en segundos, controlo las cuentas por cobrar y sé exactamente qué comprar.”',author:'Sra. Luzmila · Propietaria de Tienda de Barrio',description:'Desarrollo de una solución tecnológica accesible diseñada para la tienda de barrio de la Sra. Luzmila. La plataforma permite registrar ventas rápidamente con Efectivo, Nequi, Daviplata y Fiado local; controla el stock en tiempo real, visualiza gráficas de ventas y detecta productos de menor rotación para evitar pérdidas.',features:['Registro de ventas táctil o por teclado con múltiples formas de pago.','Control y actualización automática del inventario.','Gráficas de ventas diarias, semanales y margen de ganancia.','Reporte inteligente de productos menos vendidos.','Gestión de libreta de clientes y saldos fiados.'],steps:['Selección rápida del producto en el catálogo o escaneo.','Elección del método de pago del cliente.','Descuento automático del inventario en tiempo real.','Actualización del tablero de ventas y alertas de stock bajo.'],before:'Anotaciones manuales, descuadres al final del día y descontrol en cobros por Nequi y cuentas fiadas.',after:'Control digital instantáneo de inventario y dinero en caja, con registro transparente de todos los métodos de pago.'},
jmbarber:{title:'JM<em>barber.</em>',images:['proyectos/jmbarber-login.jpeg','proyectos/jmbarber-panel.jpeg','proyectos/jmbarber-horarios.jpeg'],metrics:[['Ganancia de Eficiencia','+96%'],['Tiempo Ahorrado','15 hrs/semana'],['Precisión Operativa','0 Citas Traslapadas'],['Resultado Clave','+40% Citas Cumplidas']],quote:'“Perdía clientes y tiempo precioso respondiendo chats de WhatsApp a mitad de un corte. Ahora mis clientes agendan su cita solos en segundos y el sistema les envía recordatorios automáticos.”',author:'Jorge Mendoza · Barbero Profesional & Propietario',description:'Solución web a medida creada para resolver el caos del agendamiento manual en la barbería de Jorge Mendoza. Los clientes ingresan desde su celular, eligen el barbero, el servicio, la hora disponible y reciben confirmaciones y alertas por WhatsApp.',features:['Reserva de citas 24/7 sin interrupciones al barbero.','Catálogo visual de servicios, precios y tiempos configurables.','Bloqueo automático de horarios ocupados.','Recordatorio automático por WhatsApp antes del turno.','Panel ejecutivo con historial de clientes e ingresos.'],steps:['El cliente ingresa desde celular o WhatsApp.','Selecciona servicio y barbero.','Elige un horario disponible en el calendario.','Recibe confirmación y recordatorio automático.'],before:'Pérdida de clientes por respuestas tardías, libretas manchadas y cruces accidentales de turnos.',after:'Agenda 100% organizada en línea, reservas inmediatas y cero llamadas o chats durante los cortes.'},
unimagdalena:{title:'Chatbot<br><em>Unimagdalena.</em>',images:['proyectos/unimagdalena-chat.jpeg','proyectos/unimagdalena-web.jpeg','proyectos/unimagdalena-opciones.jpeg'],metrics:[['Ganancia de Eficiencia','+98%'],['Tiempo Ahorrado','Respuesta < 2 seg'],['Precisión Operativa','97.8% Precisión'],['Resultado Clave','Tesis de Grado Aprobada']],quote:'“Como proyecto de tesis en la Universidad del Magdalena, desarrollamos este chatbot inteligente con Procesamiento de Lenguaje Natural. Fue gratificante ver cómo resolvió de forma inmediata miles de dudas académicas de nuestros compañeros.”',author:'José Narváez · Estudiante de Ing. de Sistemas · Universidad del Magdalena',description:'Proyecto académico y técnico desarrollado por José Narváez para la Universidad del Magdalena. Implementa Procesamiento de Lenguaje Natural entrenado con normativa, pensum, electivas, prerrequisitos y horarios de tutorías de Ingeniería de Sistemas.',features:['Comprensión de lenguaje natural para consultas informales.','Consultas en tiempo real sobre pensum académico.','Información de prerrequisitos, créditos y tutorías.','Identidad visual de la Universidad del Magdalena.','Métricas sobre las dudas más frecuentes.'],steps:['El estudiante redacta su consulta académica.','El motor de PLN analiza intención y palabras clave.','Consulta la base de conocimiento de Ingeniería de Sistemas.','Genera una respuesta inmediata, contextual y guiada.'],before:'Filas en secretaría académica y desinformación sobre prerrequisitos de materias.',after:'Atención inmediata 24/7 desde cualquier dispositivo, con respuestas basadas en el reglamento oficial.'}
});
openDetail=function(detail){if(!detail.metrics){modalContent.className='modal-content';const points=detail.points.map(x=>`<span>${x}</span>`).join('');modalContent.innerHTML=`<div><h2>${detail.title}</h2><p>${detail.text}</p><div class="modal-points">${points}</div></div><div class="service-visual"><b>SOLUCIÓN ASYS</b><strong>Procesos que<br>se sienten<br>naturales.</strong></div>`}else{modalContent.className='modal-content case-study';modalContent.innerHTML=`<div class="case-gallery">${detail.images.map((src,i)=>`<img src="${src}" alt="Pantalla ${i+1} del proyecto" />`).join('')}</div><div class="case-heading"><div><h2>${detail.title}</h2><p>${detail.description}</p></div><div class="case-before"><b>ANTES</b><p>${detail.before}</p><hr><b>CON ASYS TECHNOLOGY</b><p>${detail.after}</p></div></div><div class="case-metrics">${detail.metrics.map(x=>`<div class="case-metric"><small>${x[0]}</small><b>${x[1]}</b></div>`).join('')}</div><blockquote class="case-quote">${detail.quote}<footer>— ${detail.author}</footer></blockquote><div class="case-grid"><div><h3>CARACTERÍSTICAS PRINCIPALES</h3><ul>${detail.features.map(x=>`<li>${x}</li>`).join('')}</ul></div><div><h3>FUNCIONAMIENTO PASO A PASO</h3><ol>${detail.steps.map(x=>`<li>${x}</li>`).join('')}</ol></div></div>`};modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'};
let autoProjectCarousel;function startProjectCarousel(){clearInterval(autoProjectCarousel);autoProjectCarousel=setInterval(()=>{const max=projectTrack.scrollWidth-projectTrack.clientWidth;if(projectTrack.scrollLeft>=max-20){projectTrack.scrollTo({left:0,behavior:'smooth'})}else{projectTrack.scrollBy({left:projectTrack.clientWidth*.82,behavior:'smooth'})}},4200)}startProjectCarousel();projectTrack.addEventListener('mouseenter',()=>clearInterval(autoProjectCarousel));projectTrack.addEventListener('mouseleave',startProjectCarousel);
openDetail=function(detail){if(!detail.metrics){modalContent.className='modal-content';modalContent.innerHTML=`<div><h2>${detail.title}</h2><p>${detail.text}</p><div class="modal-points">${detail.points.map(x=>`<span>${x}</span>`).join('')}</div></div><div class="service-visual"><b>SOLUCIÓN ASYS</b><strong>Procesos que<br>se sienten<br>naturales.</strong></div>`}else{modalContent.className='modal-content case-study';modalContent.innerHTML=`<div class="case-gallery"><button class="gallery-arrow gallery-prev" aria-label="Imagen anterior">←</button><button class="gallery-arrow gallery-next" aria-label="Imagen siguiente">→</button>${detail.images.map((src,i)=>`<img class="${i===0?'active':''}" src="${src}" alt="Pantalla ${i+1} del proyecto" />`).join('')}<span class="gallery-count">01 / ${String(detail.images.length).padStart(2,'0')}</span><div class="gallery-dots">${detail.images.map((_,i)=>`<button class="${i===0?'active':''}" data-slide="${i}" aria-label="Ver imagen ${i+1}"></button>`).join('')}</div></div><div class="case-heading"><div><h2>${detail.title}</h2><p>${detail.description}</p></div><div class="case-before"><b>ANTES</b><p>${detail.before}</p><hr><b>CON ASYS TECHNOLOGY</b><p>${detail.after}</p></div></div><div class="case-metrics">${detail.metrics.map(x=>`<div class="case-metric"><small>${x[0]}</small><b>${x[1]}</b></div>`).join('')}</div><blockquote class="case-quote">${detail.quote}<footer>— ${detail.author}</footer></blockquote><div class="case-grid"><div><h3>CARACTERÍSTICAS PRINCIPALES</h3><ul>${detail.features.map(x=>`<li>${x}</li>`).join('')}</ul></div><div><h3>FUNCIONAMIENTO PASO A PASO</h3><ol>${detail.steps.map(x=>`<li>${x}</li>`).join('')}</ol></div></div>`};modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'};
modalContent.addEventListener('click',event=>{const gallery=event.target.closest('.case-gallery');if(!gallery)return;const images=[...gallery.querySelectorAll('img')];let index=images.findIndex(img=>img.classList.contains('active'));if(event.target.closest('.gallery-next'))index=(index+1)%images.length;else if(event.target.closest('.gallery-prev'))index=(index-1+images.length)%images.length;else if(event.target.matches('[data-slide]'))index=Number(event.target.dataset.slide);else return;images.forEach((img,i)=>img.classList.toggle('active',i===index));gallery.querySelectorAll('[data-slide]').forEach((dot,i)=>dot.classList.toggle('active',i===index));gallery.querySelector('.gallery-count').textContent=`${String(index+1).padStart(2,'0')} / ${String(images.length).padStart(2,'0')}`});
const projectCards=[...projectTrack.querySelectorAll('.project-card:not(.dashboard)')];projectCards.forEach(card=>projectTrack.append(card.cloneNode(true)));projectTrack.addEventListener('click',event=>{const open=event.target.closest('[data-project]');if(open)openDetail(projects[open.dataset.project])});clearInterval(autoProjectCarousel);startProjectCarousel=()=>{};let continuousMotion;function runContinuousCarousel(){clearInterval(continuousMotion);continuousMotion=setInterval(()=>{projectTrack.scrollLeft+=.95;const threshold=projectTrack.scrollWidth/2;if(projectTrack.scrollLeft>=threshold)projectTrack.scrollLeft-=threshold},16)}runContinuousCarousel();projectTrack.addEventListener('mouseenter',()=>clearInterval(continuousMotion));projectTrack.addEventListener('mouseleave',runContinuousCarousel);document.querySelector('.project-prev').addEventListener('click',()=>{projectTrack.scrollBy({left:-projectTrack.clientWidth*1.15,behavior:'smooth'})});document.querySelector('.project-next').addEventListener('click',()=>{projectTrack.scrollBy({left:projectTrack.clientWidth*1.15,behavior:'smooth'})});
