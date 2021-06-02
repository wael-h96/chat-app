const PREFIX = "http://localhost:3001/api"

export const post = async (url, data) => {

    try {

        const serverResponse = await fetch(PREFIX + url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        return serverResponse

    } catch (error) {
        console.log(error)
    }
}

export const get = async (url) => {

    try {
        const serverResponse = await fetch(PREFIX + url)
        return serverResponse

    } catch (error) {
        console.log(error)
    }
}