export default class JsonServer {
    static url = "http://localhost:3004/tasks";

    static async loadTasks(){
        return fetch(JsonServer.url)
        .then( response => {
            console.log('statut de la réponse :',response.status);
            return response.json();
        })
        .then(tasks => tasks)
    }
}