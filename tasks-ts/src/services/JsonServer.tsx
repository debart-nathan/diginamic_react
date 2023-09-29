import TaskInterface from "../interfaces/TaskInterface";

export default class JsonServer {
    private static instance: JsonServer;
    private static isSingleton:boolean=false;
    private url :string;

    private constructor(url:string){
        this.url= url;
    }

    public static getInstance(url:string=""):JsonServer{
        if(JsonServer.isSingleton ){
            if( url !== ""){
                throw new Error("InvalidArgumentException");
            }
            JsonServer.instance = new JsonServer(url); 
            JsonServer.isSingleton = true;
        }
        if(url !== ""){
            JsonServer.instance.setUrl(url);
        }
        return JsonServer.instance;
    }

    public setUrl(url:string):void{
        this.url= url;
    }

    public async loadTasks(): Promise<TaskInterface[]> {
        return fetch(this.url)
            .then((response) => {
                console.log("statut de la réponse :", response.status);
                return response.json();
            })
            .then((tasks) => tasks);
    }

    public async deleteRemoteTask(task_id: number): Promise<void> {
        return fetch(`${this.url}/${task_id}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "DELETE",
        }).then((res) => {
            console.log(res);
        });
    }

    public async addRemoteTask(
        task: Omit<TaskInterface, "id">
    ): Promise<TaskInterface> {
        return fetch(`${this.url}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",

            body: JSON.stringify(task),
        })
            .then((res) => {
                console.log(res);
                return res.json();
            })
            .then((res) => {
                return res;
            });
    }

    public async patchRemoteTaskDone(
        task_id: number,
        done: boolean
    ): Promise<TaskInterface> {
        return fetch(`${this.url}/${task_id}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "PATCH",

            body: `{"done" : ${done}}`,
        })
            .then((res) => {
                console.log(res);
                return res.json();
            })
            .then((res) => {
                return res;
            });
    }
}
