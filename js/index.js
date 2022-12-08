let form = document.getElementById('github-form');

let nameSearch = document.getElementById('search'); //actual search value

let ulUserResult = document.getElementById('user-list'); // ul for username results

let ulRepoResults = document.getElementById('repos-list'); // ul for repo results



form.addEventListener('submit',(e) => {
    e.preventDefault();

    ulRepoResults.innerHTML=''
    ulUserResult.innerHTML=''
    fetch(`https://api.github.com/search/users?q=${nameSearch.value}`)
    .then(resp => resp.json())
    .then(data  => {
        
        if(data.total_count === 0){
            alert(`No users named : ${nameSearch.value}, Try Again`)
        }
        (data.items).forEach(user => {



            let li = document.createElement('li')



            li.classList.add('userName')

            let button = document.createElement('button');

            button.innerText = `Repository`

            li.innerHTML = `
                <h2>${user.login}</h2>
                <img src="${user.avatar_url}" class="sizeImg"></img>
                <p><b>link to page:</b> <a href="${user.html_url}" target="_blank">${user.html_url}</a></p>
            `

            li.appendChild(button)

                button.addEventListener('click',() => { 

                    ulRepoResults.innerHTML=''
    fetch(`https://api.github.com/users/${user.login}/repos`)
    .then(response => response.json())
    .then(dataz => {
        dataz.forEach(repo => {

            let liRepo = document.createElement('li')



            liRepo.innerHTML = `
                                <h3>Repository Name: ${repo.name}</h3>
                                <p>Repository details: ${repo.description}</p>
                                <p>Click to open Repository<a href=${repo.html_url}>${repo.html_url}</a></p>`

            ulRepoResults.append(liRepo)

})
        })

})





            ulUserResult.appendChild(li) 

            
        })



        

    })
    .catch(error =>{
    alert(error.message)
    })


})
