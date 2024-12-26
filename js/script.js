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
    }

});