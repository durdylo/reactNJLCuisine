import AsyncStorage from "@react-native-async-storage/async-storage";

export const userStorageKey = 'user';

export async function getUser() {
	try {
		const stringUser = await AsyncStorage.getItem('user');
		let user  = '';
		if (stringUser) {
			user = JSON.parse(stringUser);
		}
		return user;
	} catch (error) {
		console.log('error');
	}
	return '';
}