import datepickerFactory from 'jquery-datepicker';
import toastr from 'toastr';
datepickerFactory($);

(function(){

    const MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const MIN_DATE = new Date();
    const MAX_DATE = new Date((new Date()).setMonth((new Date()).getMonth() + 1));
    const TIME_CONTAINER = document.querySelector('.form-date--time');
    const HOURS_ELEMENTS = document.querySelectorAll('.form--time-picker li');
    const BOOKING_FORM = document.getElementById('booking-form');

    const INPUT_DATE = document.getElementById('date');
    const INPUT_TIME = document.getElementById('time');
    const INPUT_SERVICES = document.getElementById('services');

    const ERR_MSG = {
        TIME: "Please select the time",
        DATE: "Please select a date",
        SERVICES: "Please select a service",
        defOpt: {
            "positionClass": "toast-bottom-center",
        }
    };

    /* Form selection buttons
    * Adds buttons h6 to an input hidden field to be submitted
    * */
    let buttons = document.querySelectorAll('.btn-appointment');
    let inputServ = document.getElementById('services');
    buttons.forEach((btn, i)=>{
        btn.addEventListener('click', function(e) {
            this.classList.toggle('active');
            if(this.classList.contains('active')) {
                let input = inputServ.value;
                if(input.length > 0) {
                    inputServ.value = `${input} , ${this.querySelector('h6').textContent}`;
                } else {
                    inputServ.value = this.querySelector('h6').textContent;
                }
            } else {
                let input = inputServ.value;
                if(input.indexOf(` , ${this.querySelector('h6').textContent}`) > -1) {
                    inputServ.value = input.replace(` , ${this.querySelector('h6').textContent}`, '');
                } else if(input.indexOf(`${this.querySelector('h6').textContent} ,`) > -1){
                    inputServ.value = input.replace(`${this.querySelector('h6').textContent} , `, '');
                } else {
                    inputServ.value = input.replace(`${this.querySelector('h6').textContent}`, '');
                }
            }
        });
    });

    /* Calendar and time picker
    * Adds date and time to an input field
    * */

    document.querySelector('.form-date--month').innerHTML = `${MONTH_NAMES[MIN_DATE.getMonth()]} ${MIN_DATE.getDate()}`;

    $( "#calendar" ).datepicker({
        beforeShowDay: $.datepicker.noWeekends,
        prevText: "<",
        nextText: ">",
        weekHeader: "",
        minDate: MIN_DATE,
        maxDate: MAX_DATE,
        onSelect: function() {
            let dateObject = $(this).datepicker('getDate');
            document.querySelector('.form-date--month').innerHTML = `${MONTH_NAMES[dateObject.getMonth()]} 
            ${dateObject.getDate()}`;
            INPUT_DATE.value = dateObject;
        }
    });

    // Time picker
    HOURS_ELEMENTS.forEach((elem, i)=>{
        elem.addEventListener('click', function(){
            HOURS_ELEMENTS.forEach((elem)=>{
                elem.classList.remove('active');
            });
            elem.classList.add('active');
            TIME_CONTAINER.innerHTML = `, ${elem.innerHTML}`;
            INPUT_TIME.value = elem.innerHTML;
        });
    });

    BOOKING_FORM.addEventListener('submit', function(e){
        let hasError = false;

        if(INPUT_DATE.value.length <= 0) {
            toastr.error(ERR_MSG.DATE);
            hasError = true;
        }
        if(INPUT_TIME.value.length <= 0) {
            toastr.error(ERR_MSG.TIME);
            hasError = true;
        }
        if(INPUT_SERVICES.value.length <= 0) {
            toastr.error(ERR_MSG.SERVICES);
            hasError = true;
        }

        if(hasError) {
            e.preventDefault();
            e.stopPropagation();
        }
    });

})();