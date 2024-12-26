document.addEventListener('DOMContentLoaded', function() {

    var home = document.querySelector('#home');
    if (home) {
        // tab control
        var tabs = home.querySelectorAll('.tabs .tab');
        var noticeAll = home.querySelectorAll('.tab-cont-list .tab-cont');

        tabs.forEach((tab, idx) => {
            tab.addEventListener('click', function() {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                noticeAll.forEach(notice => notice.classList.remove('active'));
                noticeAll[idx].classList.add('active');
            });
        });

        // calendar
        const lastMonthBtn = document.querySelector('.last-month-arrow');
        const nextMonthBtn = document.querySelector('.next-month-arrow');
        const currentMonthElement = document.querySelector('#current-month');
        const calendarBody = document.querySelector('.calendar-board tbody');

        const today = new Date();
        let currentMonth = today.getMonth();
        let currentYear = today.getFullYear();

        function renderCalendar() {
            currentMonthElement.textContent = `${currentYear}년 ${currentMonth + 1}월`;

            const firstDay = new Date(currentYear, currentMonth, 1);
            const lastDay = new Date(currentYear, currentMonth + 1, 0);

            const firstWeekDay = firstDay.getDay();

            const lastDate = lastDay.getDate();

            calendarBody.innerHTML = '';

            let date = 1;
            for (let i = 0; i < 6; i++) {
                const row = document.createElement('tr');

                for (let j = 0; j < 7; j++) {
                    const cell = document.createElement('td');

                    if (i === 0 && j < firstWeekDay) {
                        cell.textContent = '';
                    } else if (date > lastDate) {
                        cell.textContent = '';
                    } else {
                        cell.textContent = date;

                        if (
                            currentYear === today.getFullYear() &&
                            currentMonth === today.getMonth() &&
                            date === today.getDate()
                        ) {
                            cell.classList.add('today');
                        }
                        
                        date++;
                    }

                    if (j === 0) {
                        cell.classList.add('sunday');
                    } else if (j === 6) {
                        cell.classList.add('saturday');
                    }

                    row.appendChild(cell);
                }

                calendarBody.appendChild(row);

                if (date > lastDate) break;
            }
        }

        lastMonthBtn.addEventListener('click', () => {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }

            renderCalendar();
        });

        nextMonthBtn.addEventListener('click', () => {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }

            renderCalendar();
        });

        renderCalendar();
    }

});