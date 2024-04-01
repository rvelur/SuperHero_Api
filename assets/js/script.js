$(function () {

    let currentSuperHero;


    //CAPTURAR FORMULARIO Y ACTIVAR EVENTO SUBMIT

    $('#searchSuperHero').on('submit', function (event){
        event.preventDefault();
        const regexValidacion = /^([0-9])*$/i;

        let idSuperHero = $('#SuperHero').val();

        if (regexValidacion.test(idSuperHero) && idSuperHero<732 && idSuperHero >0) {
            //Si ID EXISTE 
            getSuperHero(idSuperHero);
        } else {
            failRegex(idSuperHero)
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

        }).fail(function(){
            alert('Error al procesar al Super Heroe, por favor verifique el indice en la guía oficial');
        })
        console.log(alert)
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


        let chart = new CanvasJS.Chart("chartContainer", {
            theme: "light2", // "light1", "light2", "dark1", "dark2"
            exportEnabled: true,
            animationEnabled: true,
            title: {
                text: "Estadisticas de Poder para: " + superHero.name
            },
            data: [{
                type: "pie",
                startAngle: 25,
                toolTipContent: "<b>{label}</b>: {y}%",
                showInLegend: "true",
                legendText: "{label}",
                indexLabelFontSize: 16,
                indexLabel: "{label} - {y}%",
                dataPoints: dataPointsHero
            }]
        });
        return chart.render();

    }



        
    




});