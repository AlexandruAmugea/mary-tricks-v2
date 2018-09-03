import datepickerFactory from 'jquery-datepicker';
datepickerFactory($);

(function(){

    const MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const MIN_DATE = new Date();
    const MAX_DATE = new Date((new Date()).setMonth((new Date()).getMonth() + 1));
    const TIME_CONTAINER = document.querySelector('.form-date--time');
    const HOURS_ELEMENTS = document.querySelectorAll('.form--time-picker li');

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
            $('.ui-datepicker-title').hide();
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
        });
    });

})();