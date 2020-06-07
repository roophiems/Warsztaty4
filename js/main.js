$(() => {

    //functions
    const createBook = (id, title) => {
        const $newBook = $(`    
        <div class="card" id="${'bookCard' + id}">
            <div class="card-header" id="${'bookHeading' + id}">
                <h2 class="mb-0">
                    <button class="btn btn-link btn-lg btn-block text-left"
                        type="button" data-toggle="collapse" data-target="${'#book' + id}"
                        aria-expanded="false"
                        data-id="${id}"
                        aria-controls="${'book' + id}">
                        ${title}
                    </button>
                </h2>
            </div>
        </div>`);
        $('#booksAccordion').append($newBook);
    }

    const createBookDetails = (book) => {

        const $bookDetails = $(
            `
            <div id="${'book' + book.id}" 
                class="collapse" 
                aria-labelledby="${'bookHeading' + book.id}"
                data-parent="#booksAccordion">
                <div class="card-body" >
                    <p>Title: ${book.title}</p>
                    <p>Author: ${book.author}</p>
                    <p>Publisher: ${book.publisher}</p>
                    <p>Type: ${book.type}</p>
                    <p>ISBN: ${book.isbn}</p>
                </div>
            </div>
            `);

        $(`${'#bookHeading' + book.id}`).after($bookDetails);
    }

    const getBooks = () => {
        $('#booksAccordion').empty();
        $.ajax({
            url: 'http://localhost:8282/books/',
            method: 'GET',
            dataType: 'json',
        }).done((response) => {
            response.forEach(el => { createBook(el.id, el.title)})
        })
    }

    const createBookButtonEvent = () =>{
        $('#booksAccordion').on('click', 'button', (e) => {
            e.stopImmediatePropagation();
            const $this = $(e.currentTarget);
            const $divToShow = $this.closest('.card').find($this.attr('data-target'))
            if ($divToShow.length === 0) {
                $.ajax({
                    url: 'http://localhost:8282/books/' + $this.data('id'),
                    method: 'GET',
                    dataType: 'json'
                }).done((response) => {
                    createBookDetails(response);
                    $this.closest('.card').find($this.attr('data-target')).collapse('show')
                })
            } else {
                $divToShow.collapse('toggle')
            }
        })
    }

    const formSubmitButton = () => {
        const $button = $('#saveBook');
        const $isbn = $('#isbn')
        const $title = $('#title')
        const $author = $('#author')
        const $publisher = $('#publisher')
        const $type = $('#type')



        $button.on('click', (e) => {
            e.preventDefault();
            const newBook = {
                isbn: $isbn.val(),
                title: $title.val(),
                author: $author.val(),
                publisher: $publisher.val(),
                type: $type.val()
            };
            $.ajax({
                url: 'http://localhost:8282/books/',
                method: 'POST',
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(newBook)
            }).done(() => getBooks())
        })
    }





    //wykonanie
    getBooks();
    createBookButtonEvent();
    formSubmitButton();
})
