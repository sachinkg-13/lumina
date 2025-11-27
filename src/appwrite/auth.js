import { Account, Client, ID, Avatars, Databases, Query } from "appwrite";
import conf from "../conf/conf.js";

export class AuthService {
	client = new Client();
	account;

	constructor() {
		this.client
			.setEndpoint(conf.appwriteUrl)
			.setProject(conf.appwriteProjectId);
		this.account = new Account(this.client);
		this.avatars = new Avatars(this.client);
		this.databases = new Databases(this.client);
	}

	async createAccount({ email, password, name }) {
		try {
			const userAccount = await this.account.create(
				ID.unique(),
				email,
				password,
				name
			);
			if (userAccount) {
				// call another method
				const avatarURl = this.avatars.getInitials(name);
				await this.login({ email, password });

				const newUser = await this.saveUserToDB({
					accountId: userAccount.$id,
					name: userAccount.name,
					email: userAccount.email,
					imageURL: avatarURl,
				});
				return newUser;
			} else {
				return userAccount;
			}
		} catch (error) {
			throw error;
		}
	}

	async saveUserToDB({ accountId, name, email, imageURL }) {
		try {
			const newUser = await this.databases.createDocument(
				conf.appwriteDatabaseId,
				conf.appwriteUsersCollectionId,
				ID.unique(),
				{
					accountId,
					name,
					email,
					imageURL,
				}
			);
			return newUser;
		} catch (error) {
			console.log("Appwrite auth error in saveUserToDB:" + error);
		}
	}

	async login({ email, password }) {
		try {
			return await this.account.createEmailPasswordSession(email, password);
		} catch (error) {
			throw error;
		}
	}

	async getCurrentUser() {
		try {
			return await this.account.get();
		} catch (error) {
			console.log("Appwrite serive :: getCurrentUser :: error", error);
		}

		return null;
	}

	async getUserInfo(userId) {
		try {
			const userInfo = await this.databases.listDocuments(
				conf.appwriteDatabaseId,
				conf.appwriteUsersCollectionId,
				[Query.equal("accountId", userId)]
			);
			return userInfo.documents[0];
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	async logout() {
		try {
			await this.account.deleteSessions();
		} catch (error) {
			console.log("Appwrite serive :: logout :: error", error);
		}
	}
}

const authService = new AuthService();

export default authService;
