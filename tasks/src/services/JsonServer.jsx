export default class JsonServer {
    static url = "http://localhost:3001/tasks";

    static async loadCounters(){
        return fetch(JsonServer.url)
        .then( response => {
            console.log('statut de la réponse :',response.status);
            return response.json();
        })
        .then(tasks => tasks)
        .catch(error => {
            console.error("Erreur attrapé dans loadCounters"+error)
        }
        )
    }
}