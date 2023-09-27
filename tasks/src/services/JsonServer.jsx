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

    static async deleteRemoteTask(task_id){
        return fetch(`${JsonServer.url}/${task_id}`,{
            headers:{
                'Accept':"application/json",
            'Content-Type': 'application/json'
            },
            method : "DELETE"
        })
        .then(function (res) {console.log(res);})
    }

    static async addRemoteTask(task){
        return fetch(`${JsonServer.url}`,{
            headers:{
                'Accept':"application/json",
            'Content-Type': 'application/json'
            },
            method : "POST",

            body: JSON.stringify(task)
        })
        .then(function (res) {console.log(res);})
    }
}