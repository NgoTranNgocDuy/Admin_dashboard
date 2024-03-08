import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import './Calendar.css'
import useCalendar from '../../store/Calendar'
import { createEventId } from '../../data'

const Calendar = () => {

    const { currentEvents, setCurrentEvents } = useCalendar()

    const handleEvents = async (events) => {
        await Promise.resolve(setCurrentEvents(events))
    }
// handle the date select
    const handleDateSelect = (selectInfo) => {
        let title = prompt('Please enter a title for the event')
        let calendarApi = selectInfo.view.calendar;

        calendarApi.unselect();


        if (title) {
            calendarApi.addEvent({
                id: createEventId(),
                title,
                start: selectInfo.start,
                end: selectInfo.end,
                allDay: selectInfo.allDay
            })
        }
    }
// handle the event click
    const handleEventClick = (clickInfo) => {
        const confirmationBox = document.createElement('div');
        confirmationBox.classList.add('confirmation-box');
      
        const message = document.createElement('p');
        message.textContent = `Are you sure you want to delete the event '${clickInfo.event.title}' from ${clickInfo.event.startStr} to ${clickInfo.event.endStr}?`;
        message.classList.add('confirmation-message');
      
        const confirmBtn = document.createElement('button');
        confirmBtn.textContent = 'Confirm';
        confirmBtn.classList.add('confirm-btn');
      
        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = 'Cancel';
        cancelBtn.classList.add('cancel-btn');
      
        confirmationBox.appendChild(message);
        confirmationBox.appendChild(confirmBtn);
        confirmationBox.appendChild(cancelBtn);
      
        document.body.appendChild(confirmationBox);
      
        confirmBtn.addEventListener('click', () => {
          clickInfo.event.remove();
          document.body.removeChild(confirmationBox);
        });
      
        cancelBtn.addEventListener('click', () => {
          document.body.removeChild(confirmationBox);
        });
      }
      

    return (
        <div className="calendar-container">

            <div className='button left and right'>
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                    headerToolbar={{

                        left: 'prev,next today',
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay"

                    }}

                    allDaySlot={false}
                    initialView="timeGridWeek"
                    slotDuration={"01:00:00"}
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    weekends={true}
                    nowIndicator={true}
                    initialEvents={currentEvents}
                    eventsSet={handleEvents}
                    select={handleDateSelect}
                    eventClick={handleEventClick}
                />
            </div>
        </div>
    )
}

export default Calendar