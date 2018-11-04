import axios from "axios";

const ENDPOINT = "https://api.github.com/graphql?access_token=3824452bdd38b8605966df9261bb8eeed70ac2a9"
const FIND_REPOS = `query {repositoryOwner(login:"octocat"){
					repositories(first:100) {
						nodes {
							id
							name
                      		nameWithOwner
							owner {
								login
							}
	                      	issues(first:1){
	                        	totalCount
	                      	}
						}
					}
					}}`
function findIssues(repositoryOwner,repositoryName){
	return `query {
	  repository(owner:"${repositoryOwner}", name:"${repositoryName}") {
	    issues(first:100) {
	       nodes{
	        	number
	        	title
	        	bodyText
	        	state
	        }
	      }
	  }
	}`
}

function findIssue(repositoryOwner,repositoryName,number){
	return `query {
	  repository(owner:"${repositoryOwner}", name:"${repositoryName}") {
	    issue(number:${number}) {
	    	title
	        bodyText
	        state
	        comments(first:100){
	       		totalCount
        		nodes{
		          	id
		        	author{
	              		login
		            }
		            bodyText
		            publishedAt
	           	}
	        }
	      }
	  }
	}`
}


export default {
	getRepos(){
		return axios.post(ENDPOINT, {
				query:FIND_REPOS, 
			}).then(({data:{data:{repositoryOwner:{repositories:{nodes}}}}})=>{
				return nodes
			})
	},
	getIssues(repositoryOwner, repositoryName){
		return axios.post(ENDPOINT, {
				query:findIssues(repositoryOwner,repositoryName), 
			}).then(({data:{data:{repository:{issues:{nodes}}}}})=>{
				return nodes
			})
	},
	getIssue(repositoryOwner,repositoryName,number){
		return axios.post(ENDPOINT, {
			query:findIssue(repositoryOwner,repositoryName,number), 
		}).then(({data:{data:{repository:{issue}}}})=>{
			return issue
		})
	},
}						    