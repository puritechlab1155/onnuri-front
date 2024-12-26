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
        
            // 이번 달의 첫째 날과 마지막 날 계산
            const firstDay = new Date(currentYear, currentMonth, 1);
            const lastDay = new Date(currentYear, currentMonth + 1, 0);
        
            // 첫째 날의 요일 (0: 일요일, 1: 월요일, ...)
            const firstWeekday = firstDay.getDay();
        
            // 마지막 날짜
            const lastDate = lastDay.getDate();
        
            // tbody 초기화
            calendarBody.innerHTML = '';
        
            let date = 1;
            let nextMonthDate = 1; // 다음 달의 날짜 시작
            let lastMonthDate = new Date(currentYear, currentMonth, 0).getDate(); // 이전 달 마지막 날짜
            let prevMonthStart = lastMonthDate - firstWeekday + 1; // 이전 달의 시작 날짜 계산
        
            for (let i = 0; i < 5; i++) { // 최대 6주
                const row = document.createElement('tr');
        
                for (let j = 0; j < 7; j++) {
                    const cell = document.createElement('td');
        
                    if (i === 0 && j < firstWeekday) {
                        // 이전 달 날짜 채우기
                        cell.textContent = prevMonthStart++;
                        cell.classList.add('prev-month'); // 이전 달 클래스
                    } else if (date > lastDate) {
                        // 다음 달 날짜 채우기
                        cell.textContent = nextMonthDate++;
                        cell.classList.add('next-month'); // 다음 달 클래스
                    } else {
                        // 이번 달 날짜 채우기
                        cell.textContent = date;
        
                        // 오늘 날짜에 클래스 추가
                        if (
                            currentYear === today.getFullYear() &&
                            currentMonth === today.getMonth() &&
                            date === today.getDate()
                        ) {
                            cell.classList.add('today');
                        }
        
                        date++;
                    }
        
                    // 일요일과 토요일에 클래스 추가
                    if (j === 0) {
                        cell.classList.add('sunday');
                    } else if (j === 6) {
                        cell.classList.add('saturday');
                    }
        
                    row.appendChild(cell);
                }
        
                calendarBody.appendChild(row);
        
                // 모든 날짜를 채운 경우 반복 종료
                if (date > lastDate && nextMonthDate > 7) break;
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