$(function () {

    let currentSuperHero;


    //CAPTURAR FORMULARIO Y ACTIVAR EVENTO SUBMIT

    $('#searchSuperHero').on('submit', function (event){
        event.preventDefault();
        const regexValidacion = /^([0-9])*$/i;

        let idSuperHero = $('#SuperHero').val();

        if (regexValidacion.test(idSuperHero) && idSuperHero<733 && idSuperHero>0) {
            //Si ID EXISTE 
            getSuperHero(idSuperHero);
        } else {
            return alert('El formato de busqueda no es válido, ingrese un número entre 1 y 732');
        }
    });

    function getSuperHero(idSuperHero) {
        let urlBase = 'https://www.superheroapi.com/api.php/3525635500807579/' + idSuperHero;
        $.ajax({
            method: 'GET',
            url: urlBase,
            dataType: 'json'
        }).done(function (response) {

            $('#SuperHero').val('')
            console.log(response); 

            let superHero = {
                name: response.name,
                image: response.image['url'],
                connections: response.connections['group-affiliation'],
                published: response.biography['publisher'],
                occupation: response.work['occupation'],
                firstAppearance: response.biography['first-appearance'],
                Height: response.appearance['height'],
                Weight: response.appearance['weight'],
                alliances: response.connections['group-affiliation'],
                powerstats: response.powerstats
                };

            currentSuperHero = superHero;
            loadCardSuperHero(superHero);

            loadHeroGraph(currentSuperHero);

            $('#cards').removeClass( "d-none" );

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

        const loadHeroGraph = (superHero) => {
            let {powerstats} = superHero
            console.log(powerstats);

        let dataPointsHero = []
        for (const key in powerstats) {
            dataPointsHero.push({label: key, y: Number(powerstats[key])})
        }
        console.log(dataPointsHero)



        CanvasJS.addColorSet("orangeYellow",
                [//colorSet Array

                "#F1C40F",
                "#F39C12",
                "#E67E22",
                "#D35400",
                "#F4D03F",
                "#DAF7A6"                
                ]);
        
        let chart = new CanvasJS.Chart("graphContainer", {
            animationEnabled: true,
            animationDuration: 5000,
            theme: "dark1", //"light1", "dark1", "dark2"
            colorSet: "orangeYellow",
            title: {
                text: `Estadisticas de Poder para ${superHero.name}`
            },
            data: [{
                type: "bar",
                dataPoints: dataPointsHero
            }]
        });
        return chart.render();

    }


});