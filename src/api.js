import axios from "axios";

const searchImages = async (term) => {
    const response = await axios.get("https://api.unsplash.com/search/photos", {
        headers: {
            Authorization: "Client-ID " + process.env.REACT_APP_UNSPLASH_ACCESS_KEY

        },
        params: {
            query: term,
            per_page: 30,
        }
    });

    console.log(response.data.results);
    return response.data.results;
};

export default searchImages;