import api from './api';


class App {
    constructor() {
        this.repositories = [];

        this.formEl = document.getElementById('repo-form');
        this.inputEl = document.querySelector('input[name=repository]');
        this.listEl = document.getElementById('repo-list');

        this.registerHandlers();
    }

    registerHandlers() {
        this.formEl.onsubmit = event => this.addRepository(event);
    }


    setLoading(loading = true) {
        if(loading === true) {
            let loadingEl = document.createElement('span');
            loadingEl.appendChild(document.createTextNode('Carregando...'));
            loadingEl.setAttribute('id', 'loading');

            this.formEl.appendChild(loadingEl);
        } else {
            document.getElementById('loading').remove();
        }
    }


    async addRepository(event) {
        event.preventDefault();

        const repoInput = this.inputEl.value;

        if(repoInput.length === 0) {
            return;
        }

        this.setLoading();

        try{
            const response = await api.get(`/repos/${repoInput}`);

            const {name, html_url, owner: {avatar_url}} = response.data;

            this.repositories.push({
                name ,
                avatar_url,
                html_url,
            });

            this.inputEl.value = '';

            this.render();
        } catch (err) {
            alert('O repositório não existe');
            this.inputEl.value = '';
        }

        this.setLoading(false);
    }

    render() {
        this.listEl.innerHTML = '';

        this.repositories.forEach(repo => {
            let imgEl = document.createElement('img');
            imgEl.setAttribute('src', repo.avatar_url);

            let tittleEl = document.createElement('strong');
            tittleEl.appendChild(document.createTextNode(repo.name));

            let linkEl = document.createElement('a');
            linkEl.setAttribute('target', '_blank');
            linkEl.setAttribute('href', repo.html_url);
            linkEl.appendChild(document.createTextNode('Acessar'));

            let listItemEl = document.createElement('li');
            listItemEl.appendChild(imgEl);
            listItemEl.appendChild(tittleEl);
            listItemEl.appendChild(linkEl);

            this.listEl.appendChild(listItemEl);
        });
    }
}

new App();




























/**
 class List {
    constructor() {
        this.data = [];
    }

    add(data) {
        this.data.push(data);
        console.log(this.data);
    }
}


class TodoList extends List {
    constructor(){
        super();
    }
}

const minhaLista =  new TodoList();

document.getElementById('novotodo').onclick = function() {
    minhaLista.add('novo todo');
}



/////////////////////////////////////////////////

const minhaPromise = () => new Promise((resolve, reject) => {
    setTimeout(() => {resolve('OK')}, 2000);
});

async function executarPromise() {

    console.log(await minhaPromise());
    console.log(await minhaPromise());
    console.log(await minhaPromise());
    
}

executarPromise();



/////////////////////////////////////////////////////

import axios from 'axios';

class api {
    static async getUserInfo(username) {
        
        try {
            const response = await axios.get(`https://api.github.com/users/${username}`);
            console.log(response);
        } catch(err) {

            console.warn('Erro na API');
        }

        
    }
}

api.getUserInfo('IgorSilveira7');


 **/

