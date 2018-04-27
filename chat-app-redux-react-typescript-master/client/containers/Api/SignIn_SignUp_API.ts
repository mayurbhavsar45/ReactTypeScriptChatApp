const uri: string = "http://localhost:8081";
 // tslint:disable:no-trailing-whitespace
// tslint:disable:typedef

export function SignUp(userName: string, password:string,confirmPassword:string) {
	var url = uri + "/SignUp";
	if(password===confirmPassword) {
		var data = JSON.stringify({
			username: userName,
			password: password
		});
		// confirmPassword: confirmPassword,
		return fetch(url,
			{
				method:"POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				},
				body: data,
			})
			.then(response => {
				return response.json();
			});
	}
}

export function SignIn(userName: string, password:string) {
	var url = uri + "/SignIn/"+userName+"/"+password;
    // var data = JSON.stringify({
	// 	username: userName,
	// 	password: password
    // });
	return fetch(url,
		{
			method:"GET"
		})
		.then(response => {
	        return response.json();
	    });
}
