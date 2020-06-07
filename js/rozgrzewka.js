$(() => {
    const zadRog1 = () => {
        $.ajax({
            url: "http://date.jsontest.com",
            contentType: "application/json",
            method: "GET"
        }).done((response) => {
            alert(response.date)
        })
    }

    const zadRozg2 = () => {
        $.ajax({
            url: "https://swapi.dev/api/people/1/",
            contentType: "application/json",
            method: "GET"
        }).done((response) => {
            alert(JSON.stringify(response))
        })
    }


    zadRog1();
    zadRozg2();
})
