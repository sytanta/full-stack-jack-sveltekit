import type { Series, User, Video } from '@prisma/client';

export type Theme = 'light' | 'dark';

export type ErrorsOf<T> = T extends { errors: { [key: string]: { message: string } } }
	? T['errors']
	: null;

export type InputValidation = {
	key: string;
	isBlank: boolean;
	lenghtMin8: boolean;
	hasError: boolean;
	value: string;
	emailTaken?: boolean;
	usernameTaken?: boolean;
	errorMessage?: string;
};

export type FormValidation = {
	hasErrors: boolean;
	errors?: Map<string, { message: InputValidation }>;
	loggedIn?: boolean;
};

export type FormErrors = {
	field: string;
	message: InputValidation;
};

export type Answer = {
	text: string;
	authorId: number;
	authorName?: string;
};

export type AnswerPost = {
	text: string;
	questionId: number;
};

export interface Category {
	title: string;
	message?: string;
	image?: string;
	link?: string;
	lessonQuantity?: number;
	tags?: Tag[];
}

export type LoginErrors = {
	hasErrors?: string;
};

export type LoginResponse = {
	hasErrors: boolean;
	errors?: LoginErrors;
};

export type LoginRequest = {
	usernameOrEmail: string;
	password: string;
};

export type Question = {
	id: number;
	authorId: number;
	authName?: string;
	title: string;
	description: string;
	answers: Answer[];
};

export type QuestionWithAuthor = {
	id: number;
	authorId: number;
	authName?: string;
	title: string;
	description: string;
	answers: Answer[];
} & { authName: string };

export type QuestionPost = {
	id?: number;
	title: string;
	description: string;
};

export type RegistrationErrors = {
	hasErrors?: string;
};

export type RegistrationResponse = {
	hasErrors: boolean;
	errors?: RegistrationErrors;
};

export type RegistrationRequest = {
	name: string;
	username?: string;
	email?: string;
	password?: string;
};

export interface Session {
	user?: User;
	userId: number;
	authToken: string;
}

export type Subscription = {
	id?: number;
	userId: number;
	stripeId: string;
	stripeStatus: string | null;
	stripePriceId: string | null;
	quantity: number | null;
	trialEndsAt: number | null;
	endsAt: number | null;
	startDate: number;
	lastEventDate: number;
};

export interface Tag {
	title: string;
	link?: string;
}

export interface AppUserWoId {
	username?: string | null;
	name?: string | null;
	loginType?: string | null;
	password?: string | null;
	email?: string | null;
	// avatarUrl?: string;
	// subscription?: Subscription;
	stripeCustomerId?: string | null;
}

export type AppUser = AppUserWoId & { id: number };

export type AppUserFrontend = {
	name?: string | null;
	username?: string | null;
	email?: string | null;
} | null;

export type SubPostRes = {
	url: string;
	user: AppUser;
	shouldUpdateUser: boolean;
};

export type Topic = {
	name: string;
	displayName?: string;
	showName?: boolean;
	url: string;
	image?: string;
	accentColor?: string;
};

export type TopicData = {
	series: Series[];
	videos: Video[];
};

export type VideoData = {
	url: string;
	host_type: string;
	host_id: string;
	title: string;
	subtitle: string;
	description?: string;
	image?: string;
	topicId: number;
	seriesId?: number;
	seriesPosition?: number;
	accentColor?: string;
};
