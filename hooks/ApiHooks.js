import { useState, useContext, useEffect } from 'react';

const apiUrl = 'http://media.mw.metropolia.fi/wbma/';

//get user token with async fetch
const fetchGetUrl = async (url) => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log('fetchGetUrl', url);
    const response = await fetch(url, {
        headers: {
            'x-acces-token': userToken,
        },
    });
    const json = await response.json();
    console.log('fetchUrl json', json);
    return json;
};

const fetchPostUrl = async (url, data) => {
    console.log('fetchPostUrl', url);
    console.log('fetchPostUrl data', data);
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content=Type': 'applications/json',
        },
        body: JSON.stringify(data),
    });
    const json = await response.json();
    console.log('fetchPostUrl json', json);
    return json;
};

// change userToken if not working
const fetchUploadUrl = async (url, data, userToken) => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log('fetchUploadUrl', url, data, userToken);
    const response = await fetch(apiUrl + url, {
        method: 'POST',
        headers: {
            'content-type': 'multipart/form-data',
            'x-access-token': userToken,
        },
        body: data,
    });
    let json = { error: 'oops, something went wrong' };
    if (response.ok) {
        json = await response.json();
        console.log('fetchUploadUrl json', json);
    }
    return json;
};

const fetchDeleteUrl = async (url, userToken = '') => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log('fetchDeleteUrl', url, userToken);
    const reponse = await fetch(apiUrl + url, {
        method: 'DELETE',
        headers: {
            'x-access-token': userToken,
        },
    });
    const json = await response.json();
    console.log('fetchDeleteUrl json', json);
    return json;
};

const mediaAPI = () => {
    const getAllMedia = () => {
        const { media, setMedia } = userContext(MediaContext);
        const [loading, setLoading] = useState(true);
        useEffect(() => {
            fetchGetUrl(apiUrl + 'media').then((json) => {
                setMedia(json);
                setLoading(false);
            });
        }, []);
        return [media, loading];
    };

    const reloadAllMedia = (setMedia, setMyMedia) => {
        fetchGetUrl(apiUrl + 'media').then((json) => {
            setMedia(json);
        });
        fetchGetUrl(apiUrl + 'media/user').then((json) => {
            setMyMedia(json);
        });
    };

    const getThumbnail = (url) => {
        const [thumbnails, setThumbnails] = useState({});
        useEffect(() => {
            fetchGetUrl(apiUrl + 'media/' + url).then((json) => {
                setThumbnails(json.thumbnails);
            });
        }, []);
        return thumbnails;
    };

    const signInAsync = async (inputs, props) => {
        const data = {
            'username': inputs.username,
            'password': inputs.password,
        };
        const json = await fetchPostUrl(apiUrl + 'login', data);
        await AsyncStorage.setItem('userToken', json.token);
        await AsyncStorage.setItem('user', JSON.stringify(json.user));
        props.navigation.navigate('App');
    };

    const reginsterAsync = async (inputs, props) => {
        const data = {
            'username': inputs.username,
            'password': inputs.password,
            'email': inputs.email,
            'full_name': inputs.full_name,
        };
        const json = await fetchPostUrl(apiUrl + 'users', data);
        if (!json.error) {
            signInAsync(inputs, props);
        } else (alert('something went wrong'));
    };

    const userToContext = async () => {
        const [user, setUser] = useContext(MediaContext);
        const getFromStorage = async () => {
            const storageUser = JSON.parse(await AsyncStorage.getItem('user'));
            console.log('storage', storageUser);
            setUser(storageUser);
        };
        useEffect(() => {
            getFromStorage();
        }, []);
        return [user];
    };

    const getAvatar = (user) => {
        const [avatar, setAvatar] = useState('');
        console.log('avatar', apiUrl + 'tags/avatar_' + user.user_id)
        useEffect(() => {
            fetchGetUrl(apiUrl + 'tags/avatar_' + user.user_id).then((json) => {
                console.log('avatarJson', json[0].filename);
                setAvatar(apiUrl + 'uploads/' + json[0].filename);
            });
        }, []);
        return avatar;
    };

    getUserInfo = (userId) => {
        const [userInfo, setUserInfo] = useState({});
        useEffect(() => {
            fetchGetUrl(apiUrl + 'users/' + userId).then((json) => {
                setUserInfo(json);
            }).catch((error) => {
                console.log(console.error);
            });
        }, []);
        return userInfo;
    };

    const checkAvailable = async (username) => {
        const json = await fetchGetUrl(apiUrl + 'users/username/' + username);
        if (!json.error) {
            if (json.available) {
                return 'Username ' + json.username + ' is available. ';
            } else {
                return 'Username ' + json.username + ' is not available. ';
            }
        } else {
            console.log(json.error);
        }
    };

    const uploadFile = async (formData) => {
        return fetchUploadUrl('media', formData).then((json) => {
            return json;
        });
    };

    // change myMedia to array if not working
    const getAllMyMedia = () => {
        const { myMedia, setMyMedia } = useContext(MediaContext);
        const [loading, setLoading] = useState(true);
        useEffect(() => {
            fetchGetUrl(apiUrl + 'media/user').then((json) => {
                setMyMedia(json);
                setLoading(false);
            });
        }, []);
        return [myMedia, loading];
    };

    const deleteMedia = async (file, setMyMedia, setMedia) => {
        return fetchDeleteUrl('media/' + file.file_id).then((json) => {
            console.log('delete', json);
            setMedia([]);
            setMyMedia([]);
            reloadAllMedia(setMedia, setMyMedia);
        });
    };

    return {
        getAllMedia,
        getAllMyMedia,
        signInAsync,
        reginsterAsync,
        userToContext,
        getAvatar,
        getUserInfo,
        checkAvailable,
        uploadFile,
        reloadAllMedia,
        deleteMedia
    };
};