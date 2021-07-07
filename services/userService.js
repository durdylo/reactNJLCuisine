import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserStorageKey = 'user';

export async function getUser() {
    try{
        stringUser = await AsyncStorage.getItem(UserStorageKey);
        let user = '';
        if (stringUser) {
            user = JSON.parse(stringUser);
        }
        return user;
    }catch{
        console.log(error)
    }
    return '';
}