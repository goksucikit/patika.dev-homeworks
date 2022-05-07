const form = document.querySelector('.to-do-form');
const list = document.querySelector('.todo-list');

const toastTrigger = document.querySelector('#liveToastBtn');
const toastLiveExample = document.querySelector('#liveToast');

let events = [];

function submitToDos (e) {
    e.preventDefault();
    
    //Name of todo
    const eventName = e.currentTarget.item.value;
    //If no name, then trigger toast message and return nothing
    if (!eventName) {
            var toast = new bootstrap.Toast(toastLiveExample);
            toast.show();
            return;
    }
          

    //To-do event object
    const event = {
        name: eventName,
        id: Date.now(),
        complete: false,
    }

    //Push to-dos to todos array
    events.push(event);

    //reset the form input after submit event
    e.target.reset()

    list.dispatchEvent(new CustomEvent('eventsUpdated'));
};

//Display Events
function displayEvents (event) {
    const html = events.map(event => `
        <div class="event">
            <li class="event-to-do ${event.complete && 'completed'}">
                ${event.name}
                
                <div class="event-buttons">
                    <button value="${event.id}" 
                            class="btn-complete">
                        <i class="fa-solid fa-check"></i>
                    </button>
                
                    <button value="${event.id}" 
                            class="btn-delete">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </li>
        </div>
        `).join('');

    list.innerHTML = html.toLowerCase();
};

//Store events in local storage
function saveLocal () {
    localStorage.setItem('events', JSON.stringify(events));
}

//Restore events from local storage
function restoreEvents () {
    const storedEvents = JSON.parse(localStorage.getItem('events'));

    if(storedEvents.length) {
        events.push(...storedEvents);
    }

    list.dispatchEvent(new CustomEvent('eventsUpdated'));
}

//delete events
function deleteEvent(id) {
    events = events.filter(event => event.id !== id);
    list.dispatchEvent(new CustomEvent('eventsUpdated'));

}

function checkEvent(id) {
    const isChecked = events.find(event => event.id === id);
    isChecked.complete = !isChecked.complete;

    list.dispatchEvent(new CustomEvent('eventsUpdated'));
}

// Event Listeners
form.addEventListener('submit', submitToDos);
list.addEventListener('eventsUpdated', displayEvents);
list.addEventListener('eventsUpdated', saveLocal);


//Event Delegation
list.addEventListener('click', e => {
    const id = parseInt(e.target.value);
    
    if(e.target.classList.contains('btn-delete')) {
        deleteEvent(id);
    }
    
    if(e.target.classList.contains('btn-complete')) {
        checkEvent(id);
        
    }
})

restoreEvents();