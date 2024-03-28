$(function () {

    //CAPTURAR FORMULARIO Y ACTIVAR EVENTO SUBMIT

    $('#searchSuperHero').on('submit', function (event){
        event.preventDefault();
        const regexValidacion = /^([0-9])*$/;

        let id = $('#SuperHero').val();

        if (regexValidacion.test(id)) {
            //Si ID EXISTE 
            getSuperHero(id);
        } else {
            return alert('El número de Super Heroe no existe');
        }
    });

    function getSuperHero(id) {
        let urlBase = 'https://www.superheroapi.com/api.php/3525635500807579/' + id;
        $.ajax({
            method: 'GET',
            url: urlBase,
            dataType: 'json'
        }).done(function (response) {
            console.log(response)
        })
    }
});