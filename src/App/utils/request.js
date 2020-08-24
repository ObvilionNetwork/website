
const getJSONFromURL = async (url, callback) => {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);
    xhr.responseType = 'json';

    xhr.onload = () => {
      callback(xhr.status, xhr.response);
    };

    xhr.send();
};

export default getJSONFromURL;