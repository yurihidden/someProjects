import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		repos: [],
		issues:[],
		issueWindow:false,
		currentIssue:{},
	},
	mutations: {
		setRepos(state, repos) {
			state.repos = repos;
		},
		setIssues(state, issues){
			state.issues = issues;
		},
		setIssue(state, issue){
			state.currentIssue = issue;
			//Vue.set(state, "currentIssue", issue)
		},
		setIssueWindow(state, flag){
			state.issueWindow = flag;
		},
	},
	getters:{
		reposWithIssues(state){
			return state.repos.filter((rep)=>{
        		return rep.issues.totalCount>0
      		})
		},
	},
});