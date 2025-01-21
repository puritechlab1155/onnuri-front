document.addEventListener('DOMContentLoaded', function() {

    var header = document.querySelector('#header');

    if (header) {
        var mobileoffcanvas = header.querySelector('.mobile_display');
        var offcanvasOpen = header.querySelector('.offcanvas-open');
        var offcanvas = document.querySelector('.offcanvas');
        var headerLogoImg = header.querySelector('.logo-img');

        // 오프캔버스 토글 이벤트 추가
        offcanvasOpen.addEventListener('click', function() {
            offcanvasOpen.classList.toggle('active');
            offcanvas.classList.toggle('active'); // .offcanvas에 active 클래스 토글

            // offcanvas의 transform 속성 변경
            if (offcanvas.classList.contains('active')) {
                mobileoffcanvas.style.height = '100vh';
                offcanvas.style.transform = 'translateX(0%)'; // 메뉴 열기
                header.style.backgroundColor = '#fff';
                headerLogoImg.src = 'img/offcanvas-logo.png'; // 활성화 상태의 로고
                if(scrollY = 0) {
                    header.style.backgroundColor = 'transparent';
                }
            } else {
                mobileoffcanvas.style.height = 'auto';
                offcanvas.style.transform = 'translateX(100%)'; // 메뉴 닫기
                header.style.backgroundColor = '#fff';
                dropIconL.style.transform = 'rotate(-45deg)'; // 드롭 아이콘 원래대로
                dropIconR.style.transform = 'rotate(45deg)';
                gnbSub.style.display = 'none'; // 드롭다운 숨김
            }
        });

        // .gnb-training 클릭 시 .gnb-sub 드롭다운
        var gnbTraining = document.querySelector('.gnb-mobile .gnb-training');
        var gnbSub = document.querySelector('.gnb-mobile .gnb-sub');
        var dropIconL= document.querySelector('.drop-arrow .drop-left');
        var dropIconR= document.querySelector('.drop-arrow .drop-right');

        if (gnbTraining && gnbSub) {
            gnbTraining.addEventListener('click', function() {
                gnbSub.classList.toggle('active'); // active 클래스 토글
                
                // 드롭다운 효과를 위해 display 속성을 변경
                if (gnbSub.classList.contains('active')) {
                    gnbSub.style.display = 'block'; // 드롭다운 표시
                    dropIconL.style.transform = 'rotate(-45deg)';
                    dropIconR.style.transform = 'rotate(45deg)';
                } else {
                    dropIconL.style.transform = 'rotate(45deg)';
                    dropIconR.style.transform = 'rotate(-45deg)';
                    gnbSub.style.display = 'none'; // 드롭다운 숨김
                }
            });
        }
    }

    var home = document.querySelector('#home');
    if (home) {
        // section01 tab control
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
            /* '2024-10-29': ['11:30 시안채플'],
            '2024-12-25': ['11:30 시안채플', '11:30 시안채플'],
            '2024-12-27': ['11:30 시안채플'],
            '2024-12-31': ['11:30 시안채플'],
            '2025-01-01': ['11:30 시안채플'] */
        }; // { 'YYYY-MM-DD': ['11:30 시안채플', '시간 일정2', ...] }

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
                        
                        // 오늘 날짜와 비교하여 텍스트 추가
                        if (new Date(currentYear, currentMonth, date) >= today) {
                            const scheduleText = document.createElement('div'); // 스케줄 텍스트 박스 생성
                            scheduleText.textContent = '시안채플'; // 스케줄 텍스트 추가
                            scheduleText.classList.add('schedule-text'); // 클래스 추가

                            cell.appendChild(scheduleText); // 셀에 추가
                        }


                        if (currentYear === today.getFullYear() && currentMonth === today.getMonth() && date === today.getDate()) {
                            cell.classList.add('today');
                            cell.classList.add('focusDay');

                            // 오늘 날짜의 텍스트를 detail에 추가
                            const detailElements = document.querySelectorAll('.scheduleBox');
                            detailElements.forEach((box) => {
                                const detailElement = box.querySelector('li.detail');
                                detailElement.textContent = '시안채플'; // 오늘 날짜의 텍스트 추가
                            });
                        }

                        // focusDay에도 텍스트 추가
                        if (cell.classList.contains('focusDay')) {
                            const scheduleText = document.createElement('div'); // 스케줄 텍스트 박스 생성
                            scheduleText.textContent = '시안채플'; // 스케줄 텍스트 추가
                            scheduleText.classList.add('schedule-text'); // 클래스 추가

                            cell.appendChild(scheduleText); // 셀에 추가
                        }

                        // 날짜 클릭 이벤트 추가
                        cell.addEventListener('click', function() {
                            // 오늘 날짜의 focusDay 제거
                            const todayCell = document.querySelector('td.focusDay');
                            if (todayCell) {
                                todayCell.classList.remove('focusDay');
                            }

                            cell.classList.add('focusDay'); // 클릭한 날짜에 focusDay 추가

                            // 클릭한 날짜에 "시안채플" 추가
                            const newScheduleText = '시안채플'; // 스케줄 텍스트
                            const detailElements = document.querySelectorAll('ul.scheduleBox'); // 모든 scheduleBox 선택

                            // 클릭한 날짜의 detail에 텍스트 추가
                            detailElements.forEach((box, index) => {
                                const detailElement = box.querySelector('li.detail');
                                detailElement.textContent = newScheduleText; // 텍스트 추가
                            });
                        });
        
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

        //달력 이전, 다음 버튼
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

    // section04 tab control >> 디자인 변경으로 주석 처리
    // var reservTabs = home.querySelectorAll('.reserv-tabs .reserv-tab');
    // var reservInfoLists = home.querySelectorAll('.reserv-info .reserv-info-list');

    // reservTabs.forEach((tab, idx) => {
    //     tab.addEventListener('click', function() {
    //         reservTabs.forEach(t => t.classList.remove('active'));
    //         tab.classList.add('active');

    //         reservInfoLists.forEach(list => list.classList.remove('active'));
    //         reservInfoLists[idx].classList.add('active');
    //     });
    // });
});
