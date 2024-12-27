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

        const scheduleData = {
            // 예시 일정
            '2024-10-29': ['11:30 시안채플'],
            '2024-12-25': ['11:30 시안채플', '11:30 시안채플'],
            '2024-12-27': ['11:30 시안채플'],
            '2024-12-31': ['11:30 시안채플'],
            '2025-01-01': ['11:30 시안채플']
        }; // { 'YYYY-MM-DD': ['시간 일정', '시간 일정2', ...] }

        const today = new Date();
        let currentMonth = today.getMonth();
        let currentYear = today.getFullYear();

        function renderCalendar() {
            currentMonthElement.textContent = `${currentYear}년 ${currentMonth + 1}월`;
        
            const firstDay = new Date(currentYear, currentMonth, 1);
            const lastDay = new Date(currentYear, currentMonth + 1, 0);
        
            const firstWeekday = firstDay.getDay();
            const lastDate = lastDay.getDate();
        
            calendarBody.innerHTML = '';
        
            let date = 1;
            let nextMonthDate = 1;
            let lastMonthDate = new Date(currentYear, currentMonth, 0).getDate();
            let prevMonthStart = lastMonthDate - firstWeekday + 1;
        
            for (let i = 0; i < 5; i++) {
                const row = document.createElement('tr');
        
                for (let j = 0; j < 7; j++) {
                    const cell = document.createElement('td');
        
                    if (i === 0 && j < firstWeekday) {
                        // 이전 달 날짜
                        const prevMonth = currentMonth - 1 < 0 ? 11 : currentMonth - 1;
                        const prevYear = currentMonth - 1 < 0 ? currentYear - 1 : currentYear;
                        const formattedDate = `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(prevMonthStart).padStart(2, '0')}`;
                        
                        cell.textContent = prevMonthStart++;
                        cell.classList.add('prev-month');
                        renderSchedules(cell, formattedDate);
                    } else if (date > lastDate) {
                        // 다음 달 날짜
                        const nextMonth = currentMonth + 1 > 11 ? 0 : currentMonth + 1;
                        const nextYear = currentMonth + 1 > 11 ? currentYear + 1 : currentYear;
                        const formattedDate = `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(nextMonthDate).padStart(2, '0')}`;
                        
                        cell.textContent = nextMonthDate++;
                        cell.classList.add('next-month');
                        renderSchedules(cell, formattedDate);
                    } else {
                        // 이번 달 날짜
                        const formattedDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
                        cell.textContent = date;
        
                        if (currentYear === today.getFullYear() && currentMonth === today.getMonth() && date === today.getDate()) {
                            cell.classList.add('today');
                        }
        
                        renderSchedules(cell, formattedDate);
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
        
                if (date > lastDate && nextMonthDate > 7) break;
            }
        }
        
        // 일정 렌더링 함수
        function renderSchedules(cell, formattedDate) {
            if (scheduleData[formattedDate]) {
                const scheduleList = document.createElement('ul');
                scheduleData[formattedDate].forEach(schedule => {
                    const scheduleItem = document.createElement('li');
                    scheduleItem.textContent = schedule;
                    scheduleList.appendChild(scheduleItem);
                });
                cell.appendChild(scheduleList);
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