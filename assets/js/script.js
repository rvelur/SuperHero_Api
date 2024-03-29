$(function () {

    let currentSuperHero;


    //CAPTURAR FORMULARIO Y ACTIVAR EVENTO SUBMIT

    $('#searchSuperHero').on('submit', function (event){
        event.preventDefault();
        const regexValidacion = /^([0-9])*$/;

        let idSuperHero = $('#SuperHero').val();

        if (regexValidacion.test(idSuperHero)) {
            //Si ID EXISTE 
            getSuperHero(idSuperHero);
        } else {
            return alert('El formato de busqueda no es válido, por favor ingrese solo números');
        }
    });

    function getSuperHero(idSuperHero) {
        let urlBase = 'https://www.superheroapi.com/api.php/3525635500807579/' + idSuperHero;
        $.ajax({
            method: 'GET',
            url: urlBase,
            dataType: 'json'
        }).done(function (response) {

            console.log(response); 

            let SuperHero = {
                name: response.name,
                image: response.image.url,
                connections: response.connections['group-affiliation'],
                published: response.biography['publisher'],
                occupation: response.work['occupation'],
                firstAppearance: response.biography['first-appearance'],
                Height: response.appearance['height'],
                Weight: response.appearance['weight'],
                alliances: response.connections['group-affiliation']
                };

            currentSuperHero = SuperHero;
            loadCardSuperHero(SuperHero);

        }).fail (function(){
            alert('Error al procesar al Super Heroe, por favor verifique el indice en la guía oficial')
        })
    };

    function loadCardSuperHero (superHero){
        currentSuperHero = superHero;
        $('#cardSuperHero-name').text(`Nombre: ${superHero.name}`);
        $('#cardSuperHero-image').attr('src', superHero.image);
        $('#cardSuperHero-Affiliation').text(superHero.connections);
        $('#cardSuperHero-publisher').text(superHero.published);
        $('#cardSuperHero-occupation').text(superHero.occupation);
        $('#cardSuperHero-firstAppearance').text(superHero.firstAppearance);
        $('#cardSuperHero-height').text(superHero.Height);
        $('#cardSuperHero-weight').text(superHero.Weight);
        $('#cardSuperHero-alliances').text(superHero.alliances);

    }
});