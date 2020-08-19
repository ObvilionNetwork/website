
const getJSONFromURL = async (url, callback) => {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);
    xhr.setRequestHeader("secret-key", "$2b$10$JTkMR/Fia4PWJb70VkXKaO4Sl.shWhQkHQpChLqYpj/vlS27y4iHC");
    xhr.responseType = 'json';

    xhr.onload = () => {
      callback(xhr.status, xhr.response);
    };

    xhr.send();
};

export default getJSONFromURL;