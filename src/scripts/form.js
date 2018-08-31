import datepickerFactory from 'jquery-datepicker';

datepickerFactory($);

(function(){
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

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    $( "#calendar" ).datepicker({
        beforeShowDay: $.datepicker.noWeekends,
        "hideIfNoPrevNext": true,
        onSelect: function() {
            let dateObject = $(this).datepicker('getDate');
            console.log(dateObject);
            document.querySelector('.form-date--month').innerHTML = `${monthNames[dateObject.getMonth()]} 
            ${dateObject.getDate()}`;
        }
    });

    $(".ui-widget-header").css({
        display: 'none'
    });

})();