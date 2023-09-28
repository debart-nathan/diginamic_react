import TaskInterface from "../interfaces/TaskInterface";

export default class JsonServer {
    static url = "http://localhost:3001/tasks";

    static async loadTasks(): Promise<TaskInterface[]> {
        return fetch(JsonServer.url)
            .then((response) => {
                console.log("statut de la réponse :", response.status);
                return response.json();
            })
            .then((tasks) => tasks);
    }

    static async deleteRemoteTask(task_id: number): Promise<void> {
        return fetch(`${JsonServer.url}/${task_id}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "DELETE",
        }).then((res) => {
            console.log(res);
        });
    }

    static async addRemoteTask(
        task: Omit<TaskInterface, "id">
    ): Promise<TaskInterface> {
        return fetch(`${JsonServer.url}`, {
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

    static async patchRemoteTaskDone(
        task_id: number,
        done: boolean
    ): Promise<TaskInterface> {
        return fetch(`${JsonServer.url}/${task_id}`, {
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
