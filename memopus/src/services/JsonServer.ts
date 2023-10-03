export default class JsonServer {
    private static instance: JsonServer;
    private url: string;

    private constructor(url: string) {
        this.url = url;
    }

    public static getInstance(url: string = ""): JsonServer {
        if (!JsonServer.instance) {
            JsonServer.instance = new JsonServer(url);
        } else if (url !== "") {
            JsonServer.instance.setUrl(url);
        }
        return JsonServer.instance;
    }

    public setUrl(url: string): void {
        this.url = url;
    }

    public async checkCredentials(
        username: string,
        password: string
    ): Promise<boolean> {
        const response = await fetch(
            `${this.url}/users?username=${username}&password=${password}`
        );
        const users = await response.json();
        return users.length > 0;
    }

    public async getData(endpoint: string): Promise<any> {
        const response = await fetch(`${this.url}/${endpoint}`);
        const data = await response.json();
        return data;
    }

    public async patchData(endpoint: string, id: number, data: any): Promise<any> {
        await fetch(`${this.url}/${endpoint}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    
        // After the PATCH request, make a GET request to retrieve the updated data
        const response = await fetch(`${this.url}/${endpoint}/${id}`);
        const updatedData = await response.json();
        return updatedData;
    }

    public async postData(endpoint: string, data: any): Promise<any> {
        await fetch(`${this.url}/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    
        // After the POST request, make a GET request to retrieve the list of all resources
        const allData = await this.getData(endpoint);
    
        // Find the resource with the highest ID
        const createdData = allData.reduce((prev:any, curr:any) => (prev.id > curr.id ? prev : curr));
    
        return createdData;
    }

    public async deleteData(endpoint: string, id: number): Promise<void> {
        return fetch(`${this.url}/${endpoint}/${id}`, {
            method: "DELETE",
        }).then((res) => {
            console.log(res);
        });
    }
}