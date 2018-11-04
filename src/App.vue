<template> 
  <div class="center-horizontal">
    <RepositoryView />
    <IssueView />
  </div>
</template>

<script>
import RepositoryView from "./components/RepositoryView.vue";
import IssueView from "./components/IssueView.vue";
import queries from"./api/queries.js"
export default {
	name: "app",
	components: {
		RepositoryView,
		IssueView,
	},
	created(){
		queries.getRepos().then((res)=>{
			this.$store.commit('setRepos',res);
		})
	},
};
</script>
