// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare global {
	namespace App {
		interface Locals {
			user: {
			  email: string
			}
		  }
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
