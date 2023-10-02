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
}
